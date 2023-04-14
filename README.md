# Social Wires Backend

Red social en la cual las personas publican mensajes y las demas personas podran reaccionar a estos, asi como tambien podran comentar a estas publicaciones.

## **Como Instalar**


**Clona este repositorio en tu computadora:** `git clone https://github.com/angela226/SocialWires.git`

Para usarlo hay que empezar instalando todas las dependencias
`npm i`



## Empezar el proyecto
1. Inicia la aplicación: `npm run dev`
2. Abre tu navegador web y visita la dirección http://localhost:3000 (o la dirección que hayas especificado en la configuración)


## Rutas

### Auth


**Signin** ->  `/wires/api/v1/login`   
Inicio sesión del usuario

**Signup** ->  `/wires/api/v1/registerUser`\
Registrar el usuario (POST request)

**User** ->   `/wires/api/v1/users/user`\
Se creo el usuario (POST request)

**Messages** ->  `/wires/api/v1/messages/createMessage`\
Se crea mensajes, recibo los mensajes, recibo mis mensajes, recibo solo mensajes por id y borrar mensajes (GET request)

**Reactions** ->  `/wires/api/v1/messages/reactions/22`\
Se crea reacciones de la aplicación (POST request)

**Comments** ->  `/wires/api/v1/messages/comment/22`\
Se crea los comentarios (POST request)


## Plus
Se puso funcionalidad para que al registrar un usuario revisa una foto o un gif de perfil
- **RegistrarUsuario** ->  `/wires/api/v1/users/user `
Metodo para registrar el usuario (POST request)

## Docker
**Aquí se descargan los contenedores**
`docker pull angelamariag/socialwiresbackend-app:latest`


## Login 

- **login** -> `/login` Inicia sesión del usuario (GET request)

Para probar el login usar la herramienta postman colocar 
email: pep123@gmail.com
password": Pep123456.

## DB

- Ejecutar el script wires 
- Puerto para el proyecto 3000
- Puerto para el Docker 5000 
- En la raiz del proyecto esta el archivo de configuración de Docker. 
(docker-compose.yml)


## .env 
Configurar el usuario para la base de datos.

## Librerias 
- `@babel/core": "^7.20.5"`\
El uso de las librerias fue: por el interprete del lenguaje.

- `@babel/preset-env": "^7.20.2"`\
Permite escribir código moderno de JavaScript sin preocuparse por la compatibilidad con los navegadores o entornos de ejecución más antiguos mediante la identificación automática de las características que no son compatibles y la transpilación de esas características a un código compatible.

- `bcryptjs": "^2.4.3"`\
Estatregias de seguridad en la encriptación.

- `body-parser": "^1.20.1"`\
Manera más sencilla del body. 


- `cors": "^2.8.5"`\
Estrategia del header de las requisiciones. 


- `express-jwt": "^8.2.1"`\
Token. 


- `express-session": "^1.17.3"`\
Datos del usuario, logueado. 

- `express-validator": "^6.14.3"`\
Validaciones de los campos. 


- `helmet": "^6.0.1"`\
Implementar codigo dentro del lenguaje. 


- `iconv-lite": "^0.6.3"`\
Iconos. 

- `express": "^4.18.2"`\
Por defecto del Express.js

- `multer": "^1.4.5-lts.1"`\
Graba archivo de la base de datos. 

- `mysql": "^2.18.1"`\
Conexión a la base de datos. 

- `mysql-server": "^1.0.5"`\
Iniciar la conexión a la base de datos. 

- `passport": "^0.6.0"`\
Estrategia para el login. 

- `sharp": "^0.31.3"`\
Estrategia en el Express.js 

- `passport-local: "^1.0.0"`\
Es una dependencia que permite utilizar la estrategia de autenticación local de Passport en un proyecto de Node.js.

- `@prisma/client": "^4.7.1"`\
<<<<<<< HEAD
Permite interactuar con una base de datos de manera fácil y segura utilizando el ORM de bases de datos Prisma en un proyecto de Node.js.
=======
Permite interactuar con una base de datos de manera fácil y segura utilizando el ORM de bases de datos Prisma en un proyecto de Node.js.
>>>>>>> 47bb86553d31f1e0f61d444f04c4dbd2ae495428
