![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Pokemon

<img height="150" src="./pokemon.png" />

## Descripcion

Esta es una aplicacion web que permite a los usuarios visualizar datos, crear, modificar y borrar pokemons,teniendo otras funciones como busqueda por nombre, filtrado y ordenamiento de los registros que se encuentran almacenados en la aplicacion.

## Instalacion

1. Clonar el repositorio.
2. Instalar las dependencias ejecutando `npm run install`
3. configurar variables de entorno para backend en la carpeta api, abrir el archivo ".env" para la conexion con la base de datos postgres suministrar los valores de las variables de entorno que son las siguientes
PGHOST : lugar donde estara instalada la base de datos (en caso de ser local puede dejarse localhost)
PGDATABASE : nombre de la base de datos (se debe crear una base de datos para la aplicacion y poner el nombre de esta)
PGUSER : usuario con acceso a la base de datos (debe tener permisos para crear,editar tablas dentro de la base de datos)
PGPASSWORD : clave de acceso a la base de datos
PGPORT : numero de puerto de acceso a la base de datos (es opcional si no es suministrado el valor default es 5432)
4. configurar almacenamiento en la nube de las imagenes en el proveedor de firebase por lo que se debe abrir una cuenta en el sitio 
web firebase.google.com:
- crear un proyecto nuevo
- ir al menu de configuraciones o settings
- en el apartado de tus apps se observara la configuracion necesaria para conectar el proyecto
- copiar la informacion y reemplazar el archivo "firebase.ts" en la carpeta client/src o crear un archivo .env con las variables del archivo .env.example en la carpeta client con la informacion vista en el paso anterior en el orden que estan en el archivo "firebase.ts" en la carpeta client/src

## Uso

Para usar la aplicacion, abre tu navegador e ingresa a la url `http://localhost:3000`.
Desde aqui se pueden crear nuevos pokemons, consultar su informacion, editarlos y borrarlos.

## Arquitectura

La aplicacion es estructurada en la arquitectura cliente/servidor, con a frontend en React y un backend en Node.js. El frontend se comunica con el backend usando REST APIs.

## Tecnologias

Las tecnologias usadas in esta aplicacion son:

- React
- Node.js
- Express
- Posgtgres
- TypeORM
- Typescript
- React-redux
- Redux-persist
- Firebase
- Recharts.js