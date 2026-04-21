from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from api.models import User

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
        return Response(data)
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        user = User.objects.create(name=name, email=email)
        return Response({'id': user.id, 'name': user.name, 'email': user.email}, status=201)
def home(request):
    return JsonResponse({"message": "Bienvenido a la petshop, consultar /users para ver los usuarios"})