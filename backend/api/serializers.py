from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario, Mascota, Turno, Vacunacion, Vacuna, Categoria, Producto
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id_usuario', 'name', 'email', 'role', 'telefono', 'direccion', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email ya registrado")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = ['id', 'nombre', 'especie', 'raza', 'fecha_nacimiento', 'id_dueno','peso']

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = ['id_turno', 'id_mascota', 'fecha', 'motivo', 'estado', 'observaciones']

class VacunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacuna
        fields = ['id_vacuna', 'nombre', 'descripcion', 'frecuencia']

class VacunacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacunacion
        fields = ['id_vacunacion', 'id_mascota', 'nombre_vacuna', 'fecha_aplicacion', 'proxima_dosis', 'veterinario']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='id_categoria.nombre', read_only=True)

    class Meta:
        model  = Producto
        fields = ['id_producto', 'nombre', 'descripcion', 'precio', 'stock', 'id_categoria', 'categoria_nombre']
