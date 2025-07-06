# 💻 Prueba Técnica SYSMAN - Frontend Angular

Este proyecto es la interfaz de usuario de la Prueba Técnica Sysman, desarrollada con **Angular 16** y **Angular Material**. Consume los servicios de una API RESTful con autenticación JWT y permite gestionar materiales registrados en diferentes ciudades y departamentos de Colombia.

---

## 🚀 Tecnologías utilizadas

- Angular 16
- Angular Material
- Reactive Forms
- SweetAlert2
- TypeScript
- JWT (manejo local)
- Git y Git Flow

---

## ✅ Funcionalidades implementadas

- Registro e inicio de sesión de usuarios
- Gestión de materiales (listar, crear, editar y eliminar)
- Filtros por tipo, ciudad y fecha de compra
- Modal reutilizable para registrar y editar materiales
- Control de acceso por roles (`ROLE_ADMIN`, `ROLE_USER`)
- Protecciones de rutas con Guards
- Interfaz moderna, accesible y responsive con Angular Material
- Navegación y redirecciones seguras ante expiración de sesión
- Navbar y Footer fijos con información del usuario

---

## 🔐 Roles y permisos

| Rol         | Permisos                                                         |
|-------------|------------------------------------------------------------------|
| `ADMIN`     | Crear, editar, eliminar y consultar materiales                   |
| `USER`      | Solo puede consultar y filtrar materiales                        |

---

## 📁 Estructura del proyecto

```bash
├── src
│   ├── app
│   │   ├── core              # Servicios, guards, interceptores, modelos
│   │   ├── shared            # Componentes reutilizables, pipes, utilidades
│   │   ├── modules
│   │   │   ├── auth          # Login y registro
│   │   │   ├── materials     # Gestión de materiales
│   │   ├── material-ui       # Módulo central de Angular Material
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── environments          # Variables por entorno
│   └── assets                # Recursos estáticos
```

---

## ▶️ Cómo ejecutar el proyecto

### 🔧 Requisitos

- Node.js 18+
- Angular CLI 16+
- Backend disponible en `http://localhost:8080`

### 🔥 Instrucciones

1. Clona el repositorio:

```bash
git clone https://github.com/ROGUEANOVI/prueba-tecnica-sysman-frontend.git
cd prueba-tecnica-sysman-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el proyecto:

```bash
ng serve
```

Accede a la aplicación en `http://localhost:4200`

---

## 🌐 Configuración de entornos

El archivo `src/environments/environment.ts` contiene la URL base del backend:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

---

## 🧪 Credenciales de prueba

```text
ADMIN
Email: admin@example.com
Contraseña: Pa55wordX

USUARIO
Email: juan@example.com
Contraseña: Xyz123AB
```

---


## 📬 Contacto

**Ovidio Romero**  
Desarrollador FullStack - Especialista en Desarrollo de Software

📧 ovidioromero66@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ovidio-romero/)  
🔗 [GitHub](https://github.com/ROGUEANOVI)

---
