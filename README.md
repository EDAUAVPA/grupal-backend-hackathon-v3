# Hackathon V3: Modalidad Backend

Participante: **Eduardo Augusto Avalos Palacios**

Contacto: eduardoavalospalacios@gmail.com

## Objetivos de la Prueba:

- Levantar un server en el puerto 3000 ✔️.
- Crear una base de datos en MongoDB Atlas y conectarse utilizando el string de conexión ✔️.
- Crear un modelo de usuario y aplicar las condiciones que sean necesarias para que el username y el email sean únicos: ✔️

```js
{
    username:{type:String},
    password:{type:String},
    email:{type:String},
    repos:{type:Number}
}
```

- Cread un modelo de repositorio para poder almacenar las difererentes datos de los repositorios: ✔️

```js
{
    name:{type:String},
    url:{type:String},
    description:{type:String},
    stack:[]
}
```

- Cread un método para proteger las contraseñas guardadas por el usuarios ✔️.
- Cread el CRUD de ambos modelos ✔️.
- Conectaros a la API de github y encontar el ID del proyecto HTSV2 de gagocarrilloedgar y utilizadlo para para desbloquear los siguientes pasos ✔️.
- Proteger las diferentes rutas creadas ✔️.
- Crear pruebas de integración de tu API ❌.
- Finalmente hacer deploy con alguno de los providers gratuitos que más os guste: ✔️
  - Heroku
  - AWS
  - Azure
  - Digital Ocean
  - ...
- Refactorizar el códido si fuera necesario ✔️.
- Documentar el proceso de creación del proyecto ✔️.

## Instalación

Use el sistema de gestión de paquetes [npm](https://www.npmjs.com/) para instalar las dependencias del proyecto.

```bash
npm install
```

## Ejecución

Se puede ejecutar el proyecto con el siguiente comando en la terminal:

```bash
npm start
```

## Descripción del Proyecto

Para poder iniciar este proyecto, se consiguió la contraseña resolviendo una serie de pistas para un problema, cuyo repositorio con la solución puede ser encontrado [aquí](https://github.com/EDAUAVPA/hackathon-scaperoom).

La API REST se encuentra desplegada en [Heroku](https://www.heroku.com/), se puede encontrar en el siguiente enlace: [https://grupal-github-repo-hackathon.herokuapp.com/](https://grupal-github-repo-hackathon.herokuapp.com/)

Se siguieron las instrucciones dadas para el desarrollo de los modelos para la base de datos en MongoDB.

Se utilizaron las siguientes rutas para realizar el CRUD (create, read, update & delete) de los modelos:

> _Nota: La ruta raiz puede ser https://grupal-github-repo-hackathon.herokuapp.com/ (desplegada en heroku) o http://localhost:3000/ (si se despliega en un entorno local)_

**1. Rutas del Usuario:**

- **POST** /api/user/login 🠮 Autentica un usuario en base a su correo y contraseña y devuelve un token \*.

- **POST** /api/user/ 🠮 Crea un nuevo usuario y lo devuelve como respuesta\*.

- **GET** /api/user/ 🠮 Obtiene todos los usuarios como respuesta.\*\*

- **GET** /api/user/:userId 🠮 Obtiene un usuario en específico.\*\*

- **PUT** /api/user/ 🠮 Actualiza los datos de un usuario y lo devuelve como respuesta.\*\*

- **DELETE** /api/user/ 🠮 Elimina el usuario especificado y sus repositorios.\*\*

**2. Rutas del Repositorio:**

- **POST** /api/repository/ 🠮 Crea un repositorio y lo devuelve como respuesta.\*\*

- **GET** /api/repository/ 🠮 Devuelve todos los repositorios registrados como respuesta.

- **GET** /api/repository/getRepoByUser 🠮 Devuelve todos los repositorios registrados para un mismo usuario.\*\*

- **GET** /api/repository/getRepo/:repoId 🠮 Devuelve el repositorio especificado.\*\*

- **PUT** /api/repository/:repoId 🠮 Actualiza la información del repositorio especificado.\*\*

- **DELETE** /api/repository/:repoId 🠮 Elimina el repositorio especificado.\*\*

**3. Rutas del Equipo:**

- **POST** /api/equipo/ 🠮 Crea un equipo y lo devuelve como respuesta.\*\*

- **GET** /api/equipo/ 🠮 Devuelve todos los equipos registrados como respuesta.

- **GET** /api/equipo/:equipoId 🠮 Devuelve el equipo especificado.\*\*

- **PUT** /api/equipo/:equipoId 🠮 Actualiza la información del equipo especificado.\*\*

- **PUT** /api/equipo/addMember/:equipoId 🠮 Añade uno o más miembros al equipo especificado.\*\*

- **PUT** /api/equipo/removeMember/:equipoId 🠮 Remueve un miembro del equipo especificado.\*\*

- **DELETE** /api/equipo/:equipoId 🠮 Elimina el equipo especificado.\*\*

**4. Rutas de la Tarjeta:**

- **POST** /api/card/ 🠮 Crea una tarjeta y lo devuelve como respuesta.\*\*

- **GET** /api/card/ 🠮 Devuelve la tarjeta asociada al usuario como respuesta.

- **PUT** /api/card/:cardId 🠮 Actualiza la información de la tarjeta especificada.\*\*

- **PUT** /api/card/addCredits/:cardId 🠮 Añade créditos a la tarjeta especificada.\*\*

- **PUT** /api/card/pay/:cardId 🠮 Disminuye créditos de la tarjeta especificada.\*\*

- **DELETE** /api/card/:cardId 🠮 Elimina la tarjeta especificada.\*\*

**5. Ruta para encontrar la contraseña de la segunda parte:**

- **GET** /api/github/:username 🠮 Devuelve todos los repositorios de github del usuario como respuesta, si el usuario es **"gagocarrilloedgar"**, devolverá un mensaje adicional con la contraseña para la segunda fase del reto.

> Todas las rutas /api/user/ devolverán siempre usuarios **sin** la contraseña.

> \*: Ruta que devuelve un token como respuesta adicional.

> **: Rutas que necesitan un **req.headers.autorization\*\* tipo Bearer token para ser autenticados.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
