from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, default='')
    token = models.CharField(max_length=64, blank=True, null=True, unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(
        max_length=15,
        choices=[
            ('admin', 'Administrador'),
            ('cliente', 'Cliente'),
            ('veterinario', 'Veterinario'),
        ],
        default='cliente'
    )

    @property
    def is_authenticated(self):
        return True
    
    def __str__(self):
        return self.name

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    peso = models.IntegerField()
    fecha_nacimiento = models.DateField()
    id_dueno = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mascotas')

class Turno(models.Model):
    id_turno = models.AutoField(primary_key=True)
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='turnos')
    fecha = models.DateField()
    motivo = models.CharField(max_length=200)
    estado = models.CharField(
        max_length=15,
        choices=[
            ('pendiente', 'Pendiente'),
            ('confirmado', 'Confirmado'),
            ('cancelado', 'Cancelado'),
        ],
    )
    observaciones = models.TextField(blank=True, null=True)

class Vacuna(models.Model):
    id_vacuna = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    frecuencia = models.CharField(max_length=50)

class Vacunacion(models.Model):
    id_vacunacion = models.AutoField(primary_key=True)
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='vacunaciones')
    nombre_vacuna = models.CharField(max_length=100)
    fecha_aplicacion = models.DateField()
    proxima_dosis = models.DateField(blank=True, null=True)
    veterinario = models.CharField(max_length=100)

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    imagen = models.URLField(blank=True, null=True)

class Contacto(models.Model):
    id_contacto = models.AutoField(primary_key=True)
    email = models.EmailField()
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email