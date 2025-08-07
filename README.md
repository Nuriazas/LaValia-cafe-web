# La Valia Café - Backend

Proyecto backend y frontend para la página web de La Valia Cafés, construido con Node.js, Express.js y MySQL. Proporciona autenticación, gestión de productos, pedidos, blog, contacto, newsletter y más.

> ⚠️ **Este proyecto está en desarrollo activo.** Se irán agregando nuevas funcionalidades y mejoras progresivamente.

## Tecnologías usadas

- Node.js
- Express.js
- MySQL
- JWT para autenticación
- bcrypt para hash de contraseñas
- dotenv para variables de entorno
- express-fileupload para manejo de archivos
- Brevo (Sendinblue) para envío de emails

## Endpoints principales

### Autenticación

| Método | Ruta             | Descripción                    |
|--------|------------------|-------------------------------|
| POST   | `/api/auth/register` | Registro de usuario           |
| POST   | `/api/auth/login`    | Login y obtención de token JWT|

### Productos (CRUD)

| Método | Ruta                | Descripción                         | Acceso   |
|--------|---------------------|------------------------------------|----------|
| GET    | `/api/products`     | Listar todos los productos          | Público  |
| GET    | `/api/products/:id` | Ver producto específico             | Público  |
| POST   | `/api/products`     | Crear producto                     | Admin    |
| PUT    | `/api/products/:id` | Editar producto                    | Admin    |
| DELETE | `/api/products/:id` | Eliminar producto                  | Admin    |

### Pedidos y Carrito

| Método | Ruta                    | Descripción                         | Acceso   |
|--------|-------------------------|------------------------------------|----------|
| POST   | `/api/orders`           | Crear nuevo pedido                  | Cliente  |
| GET    | `/api/orders`           | Ver todos los pedidos               | Admin    |
| GET    | `/api/orders/user/:id`  | Ver pedidos por usuario             | Cliente  |
| PUT    | `/api/orders/:id`       | Actualizar estado de pedido         | Admin    |

### Formulario de Contacto

| Método | Ruta              | Descripción                      | Acceso   |
|--------|-------------------|---------------------------------|----------|
| POST   | `/api/contact`    | Enviar mensaje de contacto       | Público  |
| GET    | `/api/contact`    | Ver mensajes recibidos            | Admin    |

### Blog

| Método | Ruta              | Descripción                      | Acceso   |
|--------|-------------------|---------------------------------|----------|
| GET    | `/api/blog`       | Ver todos los posts              | Público  |
| GET    | `/api/blog/:id`   | Ver post individual              | Público  |
| POST   | `/api/blog`       | Crear post                      | Admin    |
| PUT    | `/api/blog/:id`   | Editar post                    | Admin    |
| DELETE | `/api/blog/:id`   | Eliminar post                  | Admin    |

### Nosotros

| Método | Ruta              | Descripción                      | Acceso   |
|--------|-------------------|---------------------------------|----------|
| GET    | `/api/about`      | Obtener contenido                | Público  |
| PUT    | `/api/about`      | Editar contenido                | Admin    |

### Newsletter

| Método | Ruta              | Descripción                      | Acceso   |
|--------|-------------------|---------------------------------|----------|
| POST   | `/api/newsletter` | Añadir email a la lista          | Público  |
| GET    | `/api/newsletter` | Ver suscriptores                 | Admin    |

## Middleware de seguridad

- `verifyToken`: valida token JWT.
- `isAdmin`: protege rutas para solo admin.
- `isClient`: protege rutas para solo clientes.

## Variables de entorno (.env)

```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=tu_password
MYSQL_NAME=lavalia

JWT_SECRET=tu_jwt_secret

SMTP_API_KEY=tu_api_key_brevo
SMTP_USER=tu_email_brevo
ADMIN_EMAIL=tu_email_admin

UPLOAD_DIR=./uploads

VITE_URL_API=http://localhost:3000