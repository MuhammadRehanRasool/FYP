import dialogflow
from google.api_core.exceptions import InvalidArgument
from rest_framework.response import Response
import json
from rest_framework import status
from . import serializers
from django.conf import settings
from . import models
from django.http.response import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import F, Min, Q, Value, BooleanField
from django.db.models.functions import Concat
from django.db.models import F, Min, OuterRef, Value, Case, When, Subquery
import pickle
from pathlib import Path
import os
from .utils import keyword_extraction_pipeline

BASE_DIR = settings.BASE_DIR


def add_admin():
    try:
        models.CustomUser.objects.get(username="admin")
    except Exception as e:
        user = models.CustomUser()
        user.password = make_password("admin")
        user.username = "admin"
        user.email = "admin@gmail.com"
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("ADMIN ADDED")


# add_admin()


@api_view(['POST'])
def validate(request):
    if request.method == "POST":
        # VALIDATE A USER
        data = JSONParser().parse(request)
        Users = models.CustomUser.objects.all()
        username = data["username"]
        password = data["password"]
        if username and password is not None:
            count = Users.filter(username=username).count()
            if count != 0:
                data = Users.filter(username=username).values(
                    'password').first()
                if check_password(password, data["password"]) or password == data["password"]:
                    userData = Users.filter(username=username).first()
                    SerializedData = serializers.ViewUsersSerializer(
                        userData, many=False)
                    return JsonResponse(SerializedData.data, safe=False)
                else:
                    return JsonResponse({'message': 'Incorrect password'}, safe=False)
            else:
                return JsonResponse({'message': 'No account associated with this email'}, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'empty'}, status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET'])
def user(request, pk=None):
    if request.method == "GET":
        # GET A USER BY ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        instance = models.CustomUser.objects.get(pk=int(pk))
        object = serializers.ViewUsersSerializer(instance, many=False)
        return JsonResponse(object.data, safe=False)
    if request.method == "POST":
        # ADD A USER
        data = JSONParser().parse(request)
        serializer = serializers.UsersSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            instance = models.CustomUser.objects.get(username=data['username'])
            SerializedData = serializers.ViewUsersSerializer(
                instance, many=False)
            return JsonResponse(SerializedData.data, status=status.HTTP_200_OK)
        return JsonResponse({
            "message": "Username or email already exists"
        },  status=status.HTTP_200_OK)
    if request.method == "PUT":
        # UPDATE A USER
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        data = JSONParser().parse(request)
        instance = models.CustomUser.objects.get(pk=int(pk))
        object = serializers.ViewUsersSerializer(instance, data=data)
        if object.is_valid():
            object.save()
            return JsonResponse(object.data, status=status.HTTP_200_OK)
        print(object.errors)
        return JsonResponse({
            "message": "Username/Email already exists"
        },  status=status.HTTP_200_OK)


DIALOGFLOW_PROJECT_ID = 'migrane-rkss'
DIALOGFLOW_LANGUAGE_CODE = 'en-US'


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def get_bot_response(request, pk=None):
    if request.method == "POST":
        data = request.data
        user_input = data["user_input"]
        session_id = data["session_id"]

        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(
            DIALOGFLOW_PROJECT_ID, session_id)
        text_input = dialogflow.types.TextInput(
            text=user_input, language_code=DIALOGFLOW_LANGUAGE_CODE)
        query_input = dialogflow.types.QueryInput(text=text_input)

        try:
            response = session_client.detect_intent(
                session=session, query_input=query_input)
        except InvalidArgument:
            return JsonResponse({
                "message": "System error. Please try again."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        bot_response = str(response.query_result.fulfillment_text)
        intent = str(response.query_result.intent.display_name)

        bot_response = bot_response.split('%')

        if len(bot_response) > 1:
            token = bot_response[1]
        else:
            token = ""

        bot_response = bot_response[0]

        chat_ended = False
        category = ""

        if intent == "headache - env - yes" or intent == "headache - daily":
            if str(user_input).lower() == "yes":
                category = "migraine with aura"
            elif str(user_input).lower() == "no":
                category = "migraine without aura"

        if token == " end_token":
            chat_ended = True
        elif token == "result_token":
            bot_response = f"Based on your responses, it appears that you have a {category}. We recommend waiting for the doctor's response on our portal, where they will provide you with further guidance and appropriate management of your condition. They will review your responses in detail and offer personalized advice and treatment options based on your specific needs."
            chat_ended = True

        with open(os.path.join(BASE_DIR, 'static', 'buttons.json')) as json_file:
            data = json.load(json_file)

        button = []
        button_type = []

        for i in range(len(data)):
            if token != "":
                if token.strip() == data[i]["token"]:
                    button = data[i]["button"]
                    button_type = data[i]["button_type"]
                    # break

        if intent == "headache - intensity":
            question_tag = "Intensity"
        elif intent == "headache - duration":
            question_tag = "Duration"
        elif intent == "headache - patterns":
            question_tag = "Patterns"
        elif intent == "headache - factors":
            question_tag = "Factors"
        elif intent == "trigger":
            question_tag = "Trigger"
        elif intent == "symptoms":
            question_tag = "Symptoms"
        elif intent == "daily":
            question_tag = "Daily Occurrence"
        elif intent == "time":
            question_tag = "Time"
        elif intent == "headache-med":
            question_tag = "Medication"
        elif intent == "headache-change":
            question_tag = "Changes in Symptoms"
        elif intent == "headache-health":
            question_tag = "Health Condition"
        elif intent == "headache-family":
            question_tag = "Family History"
        elif intent == "headache-during":
            question_tag = "During Headaches"
        else:
            question_tag = None

        print(intent)

    return JsonResponse({
        "type": "open" if token == "" else "close",
        "message": bot_response,
        "button": button,
        "button_type": button_type,
        "is_last": chat_ended,
        "question_tag": question_tag,
    }, status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET'])
def conversation(request, pk=None):
    if request.method == "POST":
        # ADD A MESSAGE
        data = JSONParser().parse(request)
        serializer = serializers.ConversationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return JsonResponse({
            "message": "Something went wrong..."
        },  status=status.HTTP_200_OK)
    if request.method == "PUT":
        # GET THINGS
        data = JSONParser().parse(request)
        type = data["type"]
        user_id = data["user_id"]
        if type == "sessions":
            mode = data["mode"]
            if mode == "patient":
                prescription_subquery = models.Prescription.objects.filter(
                    sessionId=OuterRef('sessionId')
                ).values('sessionId')
                query = models.Conversation.objects.filter(
                    Q(user__id=int(user_id)) & ~Q(sessionId='')
                ).values('sessionId').annotate(
                    first_timestamp=Min('timestamp'),
                    user_fullname=Concat(
                        'user__firstName', Value(' '), 'user__lastName'),
                    is_prescribed=Case(
                        When(sessionId__in=Subquery(
                            prescription_subquery), then=Value(True)),
                        default=Value(False),
                        output_field=BooleanField()
                    )
                ).order_by('-first_timestamp')
            elif mode == "doctor":
                prescription_subquery = models.Prescription.objects.filter(
                    sessionId=OuterRef('sessionId')
                ).values('sessionId')
                query = models.Conversation.objects.filter(
                ).values('sessionId').annotate(
                    first_timestamp=Min('timestamp'),
                    user_fullname=Concat(
                        'user__firstName', Value(' '), 'user__lastName'),
                    is_prescribed=Case(
                        When(sessionId__in=Subquery(
                            prescription_subquery), then=Value(True)),
                        default=Value(False),
                        output_field=BooleanField()
                    )
                ).order_by('-first_timestamp')
            session_ids = list(query)
            return JsonResponse(session_ids, safe=False)
        elif type == "chats":
            session_id = data["session_id"]
            query = models.Conversation.objects.filter(
                Q(sessionId=session_id)
            ).order_by('id')
        serializer = serializers.ViewConversationSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'PUT', 'GET'])
def prescription(request, pk=None):
    if request.method == "POST":
        # ADD A prescription
        data = JSONParser().parse(request)
        # Check if the prescription already exists for the sessionId and doctor
        sessionId = data.get('sessionId')
        prescription_exists = models.Prescription.objects.filter(
            sessionId=sessionId
        ).exists()
        if prescription_exists:
            return JsonResponse({
                "message": "Prescription already exists for this session."
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = serializers.PrescriptionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        # GET prescriptions
        data = JSONParser().parse(request)
        sessionId = data["sessionId"]
        query = models.Prescription.objects.filter(sessionId=sessionId).first()
        serializer = serializers.ViewPrescriptionSerializer(query)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'PUT', 'GET'])
def keyword(request, pk=None):
    if request.method == "POST":
        # ADD A keyword
        data = JSONParser().parse(request)
        convo = data["convo"]
        keywords = []
        open_messages = []

        for i in range(1, len(convo)):
            current_obj = convo[i]
            if current_obj.get("type") == "close" and current_obj.get("question_tag"):
                try:
                    next_obj = convo[i + 1]
                    for button in current_obj.get("button", []):
                        if button.get("text") == next_obj.get("message"):
                            keywords.append({
                                "keyword": next_obj.get("message") if current_obj.get("question_tag") in ["Factors", "Symptoms"] else current_obj.get("question_tag"),
                                "color": button.get("color"),
                                "type": "close"
                            })
                            break
                except:
                    pass
            elif current_obj.get("type") == "open":
                try:
                    next_obj = convo[i + 1]
                    open_messages.append({
                        "keyword": next_obj.get("message"),
                        "color": "gray",
                        "type": "open"
                    })
                except:
                    pass

        try:
            new_keywords = keyword_extraction_pipeline([item['keyword'] for item in open_messages])
            for i in range(len(open_messages)):
                open_messages[i]['keyword'] = new_keywords[i]
        except:
            pass

        # Merge keywords and open_messages
        merged_data = keywords + open_messages

        # Convert merged_data to JSON format
        merged_data_json = json.dumps(merged_data)

        # Create a new Keyword entry
        try:
            keyword_entry = models.Keyword.objects.create(
                sessionId=data["sessionId"],
                keywords=merged_data_json
            )
        except:
            pass
        return JsonResponse("done", safe=False)
    if request.method == "PUT":
        # GET keyword
        data = JSONParser().parse(request)
        sessionId = data["sessionId"]
        query = models.Keyword.objects.filter(sessionId=sessionId).first()
        serializer = serializers.ViewKeywordSerializer(query)
        return JsonResponse(serializer.data, safe=False)
