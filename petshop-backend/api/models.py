from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=15,
        choices=[
            ('admin', 'administrador'),
            ('cliente', 'Cliente'),
        ],
        default='cliente'
    )
    def __str__(self):
        return self.name