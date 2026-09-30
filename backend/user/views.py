import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Checkout


from .serializers import (
    UserRegistrationSerializer,
    EmailRecognitionSerializer,
    CodeVerificationSerializer,
    CheckoutSerializer,     
)


class RegisterView(APIView):

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "message": "Registration failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]

        if User.objects.filter(email=email).exists():
            return Response(
                {
                    "message": "A user with this email already exists."
                },
                status=status.HTTP_409_CONFLICT,
            )

        login_code = f"{random.randint(0, 999999):06d}"

        user = User.objects.create(
            email=email,
            first_name=serializer.validated_data["first_name"],
            last_name=serializer.validated_data["last_name"],
            login_code=login_code,
        )

        return Response(
            {
                "message": "Registration successful",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "login_code": login_code,
            },
            status=status.HTTP_201_CREATED,
        )

class RecognizeUserView(APIView):

    def post(self, request):
        serializer = EmailRecognitionSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "message": "Invalid email address.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "recognized": False,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "recognized": True,
                "user": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            },
            status=status.HTTP_200_OK,
        )
class VerifyCodeView(APIView):
    def post(self, request):
        serializer = CodeVerificationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "message": "Invalid email or code.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "verified": False,
                    "message": "User not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if user.login_code != code:
            return Response(
                {
                    "verified": False,
                    "message": "Incorrect login code.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "verified": True,
                "message": "Login successful.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            },
            status=status.HTTP_200_OK,
        )
class CheckoutView(APIView):
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "message": "Checkout failed.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]

        user = User.objects.filter(email=email).first()

        checkout = Checkout.objects.create(
            user=user,
            email=email,
            phone=serializer.validated_data["phone"],
            shipping_address=serializer.validated_data["shipping_address"],
        )

        return Response(
            {
                "message": "Checkout information saved successfully.",
                "checkout": {
                    "id": checkout.id,
                    "email": checkout.email,
                    "phone": checkout.phone,
                    "shipping_address": checkout.shipping_address,
                    "user_id": checkout.user_id,
                },
            },
            status=status.HTTP_201_CREATED,
        )