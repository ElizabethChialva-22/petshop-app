# 🐾 Programador web - Sistema de Gestión - PetShop App
Proyecto grupal para el módulo "programador web" de la tecnicatura en desarrollo web y aplicaciones digitales del ISPC . Está compuesto por tres espacios curriculares: Introducción a la Programación Web II, Programación II y Desarrollo de Software.

## 👥 Equipo de Desarrollo
* LAUTARO NAHUEL ANCILLOTTI   | http://github.com/lnancillotti
* CLAUDIO NICOLAS AUDICIO  | http://github.com/NicolasAudicio
* ELIZABETH NORMA J. CHIALVA  | http://github.com/ElizabethChialva-22
* LAURA MOLINA  | http://github.com/lauritam7
* ADRIAN NICOLAS TELLO  | http://github.com/ANIKO4
* MATIAS IBARRA  | http://github.com/MatiasRaulIbarra
* FRANCISCO JUNCO  | http://github.com/FranJL075

## 💻 Descripción del proyecto
Muchos dueños de mascotas enfrentan dificultades para organizar las vacunas, turnos y compras de sus animales. Por otro lado, las veterinarias pequeñas suelen llevar sus registros en papel, lo que genera pérdida de datos. Esta aplicación busca centralizar la gestión de mascotas y productos en una sola plataforma web.

## 🚀 Tecnologías Utilizadas
* **Frontend:** Angular 17/18
* **Backend:** Django Rest Framework (Python 3.13)
* **Base de Datos:** MySQL / MariaDB (vía XAMPP)
* **Gestión de Entorno:** Python-dotenv para seguridad de credenciales.

## 📋 Requerimientos (Evidencia 1)

### Requerimientos Funcionales
1. **Gestión de Mascotas:** Registro, edición y consulta de mascotas.
2. **Catálogo de Productos:** Visualización de productos disponibles.
3. **Registro de Usuarios:** Sistema de alta para nuevos clientes.
4. **Contacto:** Formulario para consultas directas.
5. **Quiénes Somos:** Sección informativa sobre la misión de la Pet Shop.

### Requerimientos No Funcionales
1. **Seguridad:** Uso de archivos `.env` para proteger claves de base de datos.
2. **Arquitectura:** Separación clara entre Frontend (Angular) y Backend (Django).
3. **Persistencia:** Uso obligatorio de motor de base de datos relacional (MySQL).

## 🛠️ Instalación y Configuración

### Backend
1. Navegar a la carpeta `backend`.
2. Instalar dependencias: `pip install -r requirements.txt` (o manualmente las librerías mencionadas).
3. Crear un archivo `.env` basado en el `.env_modelo`.
4. Ejecutar migraciones: `python manage.py migrate`.

### Frontend
1. Navegar a la carpeta `frontend`.
2. Instalar dependencias: `npm install`.
3. Ejecutar servidor: `ng serve -o`.

