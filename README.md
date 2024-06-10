
# Vopper Take Home Backend

Este proyecto es el backend para la gestión de entrenadores de Pokemon, implementado utilizando Node.js, Express y MongoDB. Proporciona una API para la creación, lectura, actualización y eliminación de entrenadores de Pokemon, así como la integración con la PokeAPI para listar y buscar Pokemons, asi como la generacion de un PDF básico mostrando información de un Pokemon.

## Requisitos

- Node.js (versión 14 o superior)
- MongoDB (versión 4 o superior)
- npm (versión 6 o superior)

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/jesus-her/vopper-take-home-backend.git
   cd vopper-take-home-backend
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   MONGO_URL=<tu-url-de-mongo-en-railway>
   PORT=3000
   NODE_ENV=development
   ```

4. **Ejemplo de archivo `.env`:**

   Este es un ejemplo con una URL real de mi base de datos MongoDB en Railway. La base de datos está configurada en el plan gratuito (FREE), por lo que funciona para fines prácticos y de prueba.

   ```text
   MONGO_URL='mongodb://mongo:GYSuTexkyCvbXlszAyzMJoumfS1djhlR@roundhouse.proxy.rlwy.net:14458'
   PORT=8080
   NODE_ENV=development


## Scripts

- **Iniciar el servidor en desarrollo:**
  ```sh
  npm run dev
  ```

- **Construir el proyecto:**
  ```sh
  npm run build
  ```

- **Iniciar el servidor en producción:**
  ```sh
  npm start
  ```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
  - **controller/**: Define los controladores para las rutas.
    - `pokemon.controller.ts`: Controlador para la PokeAPI.
    - `trainer.controller.ts`: Controlador para la gestión de entrenadores.
  - **middleware/**: Contiene los middlewares del proyecto.
  - **models/**: Define los modelos de datos.
    - `trainer.model.ts`: Modelo de datos para los entrenadores.
  - **routes/**: Define las rutas del API.
  - **service/**: Contiene la lógica de negocio.
    - `pokemon.service.ts`: Servicio para interactuar con la PokeAPI.
    - `trainer.service.ts`: Servicio para gestionar los entrenadores.
  - **utils/**: Contiene utilidades y funciones auxiliares.
    - `connect.ts`: Conexión a la base de datos MongoDB.
    - `errorFormatter.ts`: Formateador de errores.
    - `pdfGenerators.ts`: Generador de PDFs.
  - `index.ts`: Punto de entrada principal de la aplicación.

## Endpoints

### Pokémon

```typescript
import { Express } from 'express'
import {
  getPokemonsHandler,
  generatePDFHandler
} from './controller/pokemon.controller'

function routes(app: Express) {
  app.get('/api/pokemons', getPokemonsHandler)
  app.get('/api/pokemons/:name/pdf', generatePDFHandler)
}
```

- **GET /api/pokemons**: Lista todos los Pokémon, soporta paginación y búsqueda.
  - Parámetros:
    - `limit`: Número de Pokémon por página.
    - `page`: Número de página.
    - `search`: Búsqueda por nombre.

- **GET /api/pokemons/:name/pdf**: Genera un PDF con la información del Pokémon.

### Entrenadores

```typescript
import { Express } from 'express'
import {
  createTrainerHandler,
  getTrainerHandler,
  updateTrainerHandler,
  deleteTrainerHandler,
  getAllTrainersHandler
} from './controller/trainer.controller'
import {
  createTrainerSchema,
  deleteTrainerSchema,
  getTrainerSchema,
  updateTrainerSchema
} from './schema/trainer.schema'
import validateResource from './middleware/validateResource'

function routes(app: Express) {
  app.post(
    '/api/trainers',
    [validateResource(createTrainerSchema)],
    createTrainerHandler
  )
  app.put(
    '/api/trainers/:trainerId',
    [validateResource(updateTrainerSchema)],
    updateTrainerHandler
  )

  app.get('/api/trainers', getAllTrainersHandler)

  app.get(
    '/api/trainers/:trainerId',
    validateResource(getTrainerSchema),
    getTrainerHandler
  )

  app.delete(
    '/api/trainers/:trainerId',
    [validateResource(deleteTrainerSchema)],
    deleteTrainerHandler
  )
}
```

- **GET /api/trainers**: Lista todos los entrenadores.
- **POST /api/trainers**: Crea un nuevo entrenador.
- **PUT /api/trainers/:trainerId**: Actualiza un entrenador existente.
- **DELETE /api/trainers/:trainerId**: Elimina un entrenador.
- **GET /api/trainers/:trainerId**: Obtiene un entrenador por su ID.


## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para cualquier mejora o corrección.


