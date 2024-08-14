
# Proyecto Fibonacci y Envío de Correos

Este proyecto implementa una aplicación que genera una serie de Fibonacci basada en la hora del día y envía el resultado a una dirección de correo electrónico. Utiliza `nodemailer` para el envío de correos y `listenclean` para la verificación de direcciones de correo electrónico.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación


1. **Instala las dependencias:**

    ```bash
    npm install
    ```

2. **Configura las variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

    ```dotenv
    PORT=4000
    CORREO_SECRET=passphg@gmail.com
    GOOGLE_SECRET=kufo kxns vriq gsos
    KEY_ACCESS_TOKEN_EMAIL=NDRiMjAzZTE2OS0xNzIzNjQ2OTY4
    ```

    - `PORT`: El puerto en el que la aplicación escuchará las solicitudes HTTP.
    - `CORREO_SECRET`: La dirección de correo electrónico desde la que se enviarán los correos.
    - `GOOGLE_SECRET`: Claves o secretos relacionados con Google, si se requieren (ajustar según el uso real).
    - `KEY_ACCESS_TOKEN_EMAIL`: Token de acceso para la API de verificación de correos electrónicos (listenclean).

3. **Ejecuta la aplicación:**

    ```bash
    npm start
    ```

## Endpoints

### POST /clock

Genera una serie de Fibonacci basada en la hora del día y envía el resultado al correo electrónico especificado.

**Cuerpo de la solicitud:**

```json
{
  "time": "15:49:08",
  "email": "example@example.com"
}
