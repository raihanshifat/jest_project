from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class SignUp(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        user_data=request.data
        print(user_data)
        if User.objects.filter(username=user_data["username"]).exists():
            print("exist")
            return Response({"message":"This user already exists"},status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.create_user(user_data["username"],user_data["email"],user_data["password"])
            user.firstname=user_data["firstName"]
            user.lastname=user_data["lastName"]
            user.save()
            return Response({"message":"Succesfully Created"},status.HTTP_200_OK)
        except Exception:
            print(str(Exception))
            return Response({"message":"An error occurred"},status.HTTP_400_BAD_REQUEST)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



