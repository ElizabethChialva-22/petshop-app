import secrets
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Usuario, Mascota, Turno, Vacunacion, Vacuna, Categoria, Producto
from .serializers import (UsuarioSerializer, MascotaSerializer, TurnoSerializer,
                          VacunacionSerializer, VacunaSerializer, CategoriaSerializer, ProductoSerializer)
from rest_framework import generics
from .models import Contacto
from .serializers import ContactoSerializer                          

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = Usuario.objects.get(email=email)
    except Usuario.DoesNotExist:
        return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, user.password):
        return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.token:
        user.token = secrets.token_hex(32)
        user.save(update_fields=['token'])

    return Response({'token': user.token, 'user': UsuarioSerializer(user).data})

def home(request):
    return JsonResponse({'message': 'Bienvenido a la petshop.'})

class UsuarioViewSet(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        usuarios = Usuario.objects.all()
        return Response(UsuarioSerializer(usuarios, many=True).data)

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class MascotaViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(MascotaSerializer(Mascota.objects.all(), many=True).data)

    def post(self, request):
        serializer = MascotaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class MascotaDetailViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            mascota = Mascota.objects.get(pk=pk)
        except Mascota.DoesNotExist:
            return Response({'error': 'No encontrada.'}, status=404)
        return Response(MascotaSerializer(mascota).data)

    def put(self, request, pk):
        try:
            mascota = Mascota.objects.get(pk=pk)
        except Mascota.DoesNotExist:
            return Response({'error': 'No encontrada.'}, status=404)
        serializer = MascotaSerializer(mascota, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            mascota = Mascota.objects.get(pk=pk)
        except Mascota.DoesNotExist:
            return Response({'error': 'No encontrada.'}, status=404)
        mascota.delete()
        return Response(status=204)

class TurnoViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(TurnoSerializer(Turno.objects.all(), many=True).data)

    def post(self, request):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class VacunaViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(VacunaSerializer(Vacuna.objects.all(), many=True).data)

    def post(self, request):
        serializer = VacunaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class VacunacionViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(VacunacionSerializer(Vacunacion.objects.all(), many=True).data)

    def post(self, request):
        serializer = VacunacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class CategoriaViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(CategoriaSerializer(Categoria.objects.all(), many=True).data)

    def post(self, request):
        serializer = CategoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ProductoViewSet(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        return Response(ProductoSerializer(Producto.objects.all(), many=True).data)

    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ProductoDetailViewSet(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'No encontrado.'}, status=404)
        return Response(ProductoSerializer(producto).data)

    def put(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'No encontrado.'}, status=404)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'No encontrado.'}, status=404)
        producto.delete()
        return Response(status=204)
    
class VacunacionesPorMascotaView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        vacunaciones = Vacunacion.objects.filter(id_mascota=pk)
        return Response(VacunacionSerializer(vacunaciones, many=True).data)

    def post(self, request, pk):
        data = request.data.copy()
        data['id_mascota'] = pk
        if not data.get('proxima_dosis'):
            data['proxima_dosis'] = None
        serializer = VacunacionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class TurnosPorMascotaView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        turnos = Turno.objects.filter(id_mascota=pk)
        return Response(TurnoSerializer(turnos, many=True).data)

    def post(self, request, pk):
        data = request.data.copy()
        data['id_mascota'] = pk
        serializer = TurnoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
class ContactoCreateView(generics.CreateAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer        