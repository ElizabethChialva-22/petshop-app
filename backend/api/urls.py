from django.urls import path
from .views import (home, login, UsuarioViewSet, MascotaViewSet, MascotaDetailViewSet, TurnoViewSet,
                    VacunacionViewSet, VacunaViewSet, CategoriaViewSet, ProductoViewSet, ProductoDetailViewSet,
                    VacunacionesPorMascotaView, TurnosPorMascotaView)
urlpatterns = [
    path('', home),
    path('login/', login),
    path('usuarios/', UsuarioViewSet.as_view()),
    path('mascotas/', MascotaViewSet.as_view()),
    path('mascota/<int:pk>/', MascotaDetailViewSet.as_view()),
    path('mascotas/<int:pk>/vacunaciones/', VacunacionesPorMascotaView.as_view()),
    path('mascotas/<int:pk>/turnos/', TurnosPorMascotaView.as_view()),
    path('turnos/', TurnoViewSet.as_view()),
    path('vacunas/', VacunaViewSet.as_view()),
    path('categorias/', CategoriaViewSet.as_view()),
    path('productos/', ProductoViewSet.as_view()),
    path('productos/<int:pk>/', ProductoDetailViewSet.as_view()),
]