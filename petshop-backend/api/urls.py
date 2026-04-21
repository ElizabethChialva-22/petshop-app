from django.urls import path
from api.views import UserList,home

urlpatterns = [
    path("",home),
    path('users/', UserList.as_view(), name='user-list'),
    ]