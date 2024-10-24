from django.shortcuts import render
import jwt
import traceback
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from .serializers import UserSerializer
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login ,logout


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            user = User.objects.filter(email=email).first()
            user = authenticate(request, email=email, password=password)
            if user is None:
                raise AuthenticationFailed('User not found!')
            if not user.check_password(password):
                raise AuthenticationFailed('Incorrect password!')

            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')

            response = Response()
            response.set_cookie(key='jwt', value=token, httponly=True)
            
            csrf_token = get_token(request)
            response.set_cookie('csrftoken', csrf_token)
            
            response.data = {'jwt': token}
            login(request, user) 
            return response

        except Exception as e:
            print(f"Error: {str(e)}")
            print(traceback.format_exc())
            return Response({'error': 'An error occurred during login.'}, status=500)

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        except Exception as e:
            print(f"JWT decode error: {str(e)}")
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('User not found!')        
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.delete_cookie('csrftoken')
        response.data = {'message': 'success'}
        logout(request) 
        return response