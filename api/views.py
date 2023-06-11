from rembg import remove
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

# Processing

import cv2
import numpy as np


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


def remove_background(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Create a mask initialized with zeros
    mask = np.zeros(image.shape[:2], np.uint8)

    # Define the background and foreground models
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    # Define the rectangle that contains the apparel
    h, w = image.shape[:2]
    rect = (10, 10, w-20, h-20)

    # Run GrabCut algorithm to refine the segmentation
    cv2.grabCut(image, mask, rect, bgdModel,
                fgdModel, 5, cv2.GC_INIT_WITH_RECT)

    # Create a mask for the foreground
    mask = np.where((mask == cv2.GC_FGD) | (
        mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

    # Apply the mask to the original image to remove the background
    result = cv2.bitwise_and(image, image, mask=mask)

    # Create a transparent background
    alpha = np.zeros(result.shape[:2], dtype=np.uint8)
    alpha[mask == 255] = 255
    result = cv2.merge((result, alpha))

    return crop_image(result)


def crop_image(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Find the contours of the non-zero regions in the alpha channel
    contours, hierarchy = cv2.findContours(
        image[:, :, 3], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Find the contour with the largest area
    max_area = 0
    max_contour = None
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > max_area:
            max_area = area
            max_contour = contour

    # Find the bounding box of the contour
    x, y, w, h = cv2.boundingRect(max_contour)

    # Crop the image using the bounding box coordinates
    cropped_image = image[y:y+h, x:x+w]

    return add_outline(cropped_image)


def add_outline(image, thickness=10):
    # Create a copy of the original image
    image_with_outline = image.copy()

    # Convert the image to grayscale
    gray = cv2.cvtColor(image_with_outline, cv2.COLOR_BGR2GRAY)

    # Find the contours of the non-zero regions in the alpha channel
    contours, hierarchy = cv2.findContours(
        gray, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Draw white outlines around the contours
    cv2.drawContours(image_with_outline, contours, -
                     1, (255, 255, 255), thickness)

    return image_with_outline


# import cv2

# input_path = 'input.png'
# output_path = 'output.png'

# input = cv2.imread(input_path)
# output = remove(input)
# cv2.imwrite(output_path, output)


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def image_processing(request, pk=None):
    if request.method == "POST":
        file_obj = request.FILES.get('file')
        if not file_obj:
            return JsonResponse({
                "message": "No file found in request"
            }, safe=False)

        # Read the image from the file object
        image_array = np.frombuffer(file_obj.read(), np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        # Remove the background
        # result = remove_background(image)
        result = remove(image)
        result = crop_image(result)
        result = add_outline(result)

        # Convert the result to bytes
        _, buffer = cv2.imencode('.png', result)
        result_bytes = buffer.tobytes()

        # Return the result as a response
        return HttpResponse(result_bytes, content_type='image/png')

    return JsonResponse({'message': 'Unsupported method'})


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def category(request, pk=None):
    if request.method == "GET":
        # GET CATEGORIES BY USER ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Category.objects.filter(user__id=pk).order_by("id")
        object = serializers.ViewCategorySerializer(
            query, many=True)
        return JsonResponse(object.data, safe=False)
    if request.method == "POST":
        # ADD A CATEGORY
        data = JSONParser().parse(request)
        serializer = serializers.CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({
            "message": "System error. Please try again."
        },  status=status.HTTP_200_OK)
    if request.method == "DELETE":
        # DELETE A CATEGORY
        if pk is None:
            return JsonResponse({"message": "No category id given"}, safe=False)
        instance = models.Category.objects.get(pk=int(pk))
        instance.delete()
        return JsonResponse({},  status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def brand(request, pk=None):
    if request.method == "GET":
        # GET BRANDS BY USER ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Brand.objects.filter(user__id=pk).order_by("-id")
        object = serializers.ViewBrandSerializer(
            query, many=True)
        return JsonResponse(object.data, safe=False)
    if request.method == "POST":
        # ADD A BRAND
        data = JSONParser().parse(request)
        serializer = serializers.BrandSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({
            "message": "System error. Please try again."
        },  status=status.HTTP_200_OK)
    if request.method == "DELETE":
        # DELETE A BRAND
        if pk is None:
            return JsonResponse({"message": "No brand id given"}, safe=False)
        instance = models.Brand.objects.get(pk=int(pk))
        instance.delete()
        return JsonResponse({},  status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def color(request, pk=None):
    if request.method == "GET":
        # GET COLORS BY USER ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Color.objects.filter(user__id=pk).order_by("-id")
        object = serializers.ViewColorSerializer(
            query, many=True)
        return JsonResponse(object.data, safe=False)
    if request.method == "POST":
        # ADD A COLOR
        data = JSONParser().parse(request)
        serializer = serializers.ColorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({
            "message": "System error. Please try again."
        },  status=status.HTTP_200_OK)
    if request.method == "DELETE":
        # DELETE A COLOR
        if pk is None:
            return JsonResponse({"message": "No color id given"}, safe=False)
        instance = models.Color.objects.get(pk=int(pk))
        instance.delete()
        return JsonResponse({},  status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def apparel(request, pk=None):
    if request.method == "GET":
        # GET APPAREL BY USER ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Apparel.objects.filter(user__id=pk).order_by("-id")
        object = serializers.ViewApparelSerializer(
            query, many=True)
        final = []
        for one in object.data:
            additional = json.loads(one["additional"])
            brand = ""
            color = ""
            if "brand" in additional:
                brand = serializers.ViewBrandSerializer(
                    models.Brand.objects.get(pk=int(additional["brand"]))).data
            if "color" in additional:
                color = serializers.ViewColorSerializer(
                    models.Color.objects.get(pk=int(additional["color"]))).data
            final.append({
                **one,
                "processed": json.loads(one["processed"]),
                "additional": {
                    **additional,
                    "brand": brand,
                    "color": color
                },
            })
        return JsonResponse(final, safe=False)
    if request.method == "POST":
        # ADD A APPAREL
        data = JSONParser().parse(request)
        errors = ""
        final = {
            **data,
            "processed": json.dumps(data["processed"]),
            "additional": json.dumps(data["additional"]),
        }
        try:
            serializer = serializers.ApparelSerializer(data=final)
            if serializer.is_valid():
                serializer.save()
        except:
            errors += str(serializer.errors)
        if errors != "":
            return JsonResponse({"message": errors}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({}, status=status.HTTP_200_OK)
    if request.method == "DELETE":
        # DELETE A APPAREL
        if pk is None:
            return JsonResponse({"message": "No apparel id given"}, safe=False)
        instance = models.Apparel.objects.get(pk=int(pk))
        instance.delete()
        return JsonResponse({},  status=status.HTTP_200_OK)


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def review(request, pk=None):
    if request.method == "GET":
        # GET REVIEW OF BRUTEFORCE OUTFITS BY USER ID
        # template_of_outfit = {
        #     "top": {
        #         "id": "",
        #         "preview": "",
        #         "hex": "",
        #         "color": "",
        #         "category": ""
        #     }, "bottom": {
        #         "id": "",
        #         "preview": "",
        #         "hex": "",
        #         "color": "",
        #         "category": ""
        #     }, "foot": {
        #         "id": "",
        #         "preview": "",
        #         "hex": "",
        #         "color": "",
        #         "category": ""
        #     },
        # }
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Apparel.objects.filter(user__id=pk).order_by("id")
        object = serializers.ViewApparelSerializer(
            query, many=True)
        __TEMPLATE__ = {
            "id": None,
            "processed": None,
            "hex": None,
            "color": None,
            "category": None
        }

        outfits = {
            "top": [],
            "bottom": [],
            "foot": [],
        }

        for one in object.data:
            # additional = json.loads(one["additional"])
            # color = {
            #     "title": ""
            # }
            # if "color" in additional:
            #     color = serializers.ViewColorSerializer(
            #         models.Color.objects.get(pk=int(additional["color"]))).data
            if one["category"]["super"] in ["top", "bottom", "foot"]:
                # outfits[one["category"]["super"]].append({
                #     **__TEMPLATE__,
                #     "id": one["id"],
                #     "processed": json.loads(one["processed"]),
                #     "hex": additional["hex"],
                #     "color": color["title"],
                #     "category": one["category"]["title"]
                # })
                outfits[one["category"]["super"]].append(one["id"])
        return JsonResponse(create_unique_combinations(outfits), safe=False)


def create_unique_combinations(data):
    outfits = []
    for top in data['top']:
        for bottom in data['bottom']:
            for foot in data['foot']:
                outfit = {'top': top, 'bottom': bottom, 'foot': foot}
                if not models.Outfit.objects.filter(top__id=top, bottom__id=bottom, foot__id=foot).exists():
                    outfits.append(outfit)

    return outfits


@api_view(['POST', 'PUT', 'GET', 'DELETE'])
def outfit(request, pk=None):
    if request.method == "GET":
        # GET OUTFITS BY USER ID
        if pk is None:
            return JsonResponse({"message": "No user id given"}, safe=False)
        query = models.Outfit.objects.filter(top__user__id=pk).order_by("id")
        object = serializers.OutfitSerializer(
            query, many=True)
        return JsonResponse(object.data, safe=False)
    if request.method == "POST":
        # # ADD A OUTFIT
        # data = JSONParser().parse(request)
        # serializer = serializers.OutfitSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        # return JsonResponse({
        #     "message": "System error. Please try again."
        # },  status=status.HTTP_200_OK)
        # ADD A OUTFIT
        data = JSONParser().parse(request)
        top_id = data.get('top')
        bottom_id = data.get('bottom')
        foot_id = data.get('foot')

        # Check if the outfit already exists
        if models.Outfit.objects.filter(top__id=top_id, bottom__id=bottom_id, foot__id=foot_id).exists():
            return JsonResponse({
                "message": "This outfit already exists."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create a new outfit
        serializer = serializers.OutfitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({
            "message": "System error. Please try again."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "PUT":
        # UPDATE OUTFIT
        if pk is None:
            return JsonResponse({"message": "No outfit id given"}, safe=False)
        try:
            outfit = models.Outfit.objects.get(pk=int(pk))
        except models.Outfit.DoesNotExist:
            return JsonResponse({"message": "Outfit not found"}, status=status.HTTP_404_NOT_FOUND)

        data = JSONParser().parse(request)
        mode = data.get("mode", None)
        if mode not in ("approve", "disapprove"):
            return JsonResponse({"message": "Invalid mode"}, status=status.HTTP_400_BAD_REQUEST)
        if mode == "approve":
            outfit.isApproved = True
        else:
            outfit.isApproved = False

        outfit.save()
        serializer = serializers.OutfitSerializer(outfit)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
