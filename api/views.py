import dialogflow
from google.api_core.exceptions import InvalidArgument
from rest_framework.response import Response
import json
from rest_framework import status
from . import serializers
from . import models
from django.http.response import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password, check_password


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


add_admin()


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
            "message": "Username or email already exists."
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

        # print("Fulfillment text:", bot_response)
        # print("Detected intent:", intent)

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
                category = "migraine with aura"

        if token == " end_token":
            chat_ended = True
        elif token == "result_token":
            bot_response = f"Based on your responses, it appears that you have a {category}. We recommend waiting for the doctor's response on our portal, where they will provide you with further guidance and appropriate management of your condition. They will review your responses in detail and offer personalized advice and treatment options based on your specific needs."

        with open('static/Buttons.json') as json_file:
            data = json.load(json_file)

        button = []
        button_type = []

        for i in range(len(data)):
            if token != "":
                if token.strip() == data[i]["token"]:
                    button = data[i]["button"]
                    button_type = data[i]["button_type"]

        # TEMP CORRECTION
        if len(button_type) == 0:
            button_type = "open"

        return JsonResponse({
            "english": bot_response,
            "button": button,
            "button_type": button_type,
            "chat_ended": chat_ended,
        }, status=status.HTTP_200_OK)
