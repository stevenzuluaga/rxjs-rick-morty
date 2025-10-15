# 🚀 RxJS Rick & Morty API

<div align="center">
  <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" width="300" alt="Rick and Morty Logo" />
  
  <p>Una API RESTful construida con <strong>NestJS</strong> y <strong>RxJS</strong> que consume la <a href="https://rickandmortyapi.com/">Rick and Morty API</a></p>
  
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
  <img src="https://img.shields.io/badge/Rick%20and%20Morty-97CE4C?style=for-the-badge&logo=adultswim&logoColor=white" alt="Rick and Morty" />
</div>

## 📖 Descripción

Este proyecto es una API REST desarrollada con **NestJS** y **TypeScript** que utiliza **RxJS** para manejar operaciones reactivas. La aplicación consume la API pública de Rick and Morty para proporcionar información sobre los personajes de la serie.

### ✨ Características

- 🔄 **Programación Reactiva** con RxJS
- 🛡️ **Manejo de Errores** robusto con reintentos automáticos
- ⏱️ **Timeout** configurado para las peticiones HTTP
- 📊 **Paginación** y filtrado de personajes
- 🧪 **Testing** completo con Jest
- 📝 **Validación** de datos con class-validator
- 🔍 **Logging** detallado para debugging

## 🛠️ Stack Tecnológico

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Programación Reactiva**: RxJS
- **HTTP Client**: Axios
- **Validación**: class-validator & class-transformer
- **Linting**: ESLint

## 📋 Prerequisitos

- **Node.js** >= 18
- **npm** >= 8

## ⚙️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd rxjs-rick-morty
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

## 🚀 Cómo ejecutar el proyecto

### Modo Desarrollo
```bash
# Inicia el servidor en modo desarrollo con hot reload
npm run start:dev
```

### Modo Producción
```bash
# Construye el proyecto
npm run build

# Inicia el servidor en modo producción
npm run start:prod
```

### Otros comandos útiles
```bash
# Inicia el servidor sin hot reload
npm run start

# Modo debug
npm run start:debug
```

El servidor estará disponible en: **http://localhost:3000**

## 📚 API Endpoints

### Obtener Personajes

```http
GET /characters
```

#### Parámetros de consulta (opcionales):

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `page` | number | Número de página | `?page=1` |
| `name` | string | Filtrar por nombre | `?name=rick` |
| `status` | string | Filtrar por estado | `?status=alive` |
| `species` | string | Filtrar por especie | `?species=human` |
| `gender` | string | Filtrar por género | `?gender=male` |

#### Ejemplos de uso:

```bash
# Obtener todos los personajes (primera página)
curl http://localhost:3000/characters

# Buscar personajes por nombre
curl http://localhost:3000/characters?name=rick

# Filtrar por estado y especie
curl http://localhost:3000/characters?status=alive&species=human

# Obtener página específica
curl http://localhost:3000/characters?page=2
```

## 🎯 Funcionalidades de RxJS implementadas

- **retry()**: Reintentos automáticos en caso de fallo
- **timeout()**: Timeout configurable para las peticiones
- **catchError()**: Manejo centralizado de errores
- **map()**: Transformación de datos
- **shareReplay()**: Cache de respuestas
- **tap()**: Logging y efectos secundarios

## 📁 Estructura del Proyecto

```
src/
├── characters/           # Módulo de personajes
│   ├── dto/             # Data Transfer Objects
│   ├── characters.controller.ts
│   ├── characters.service.ts
│   └── characters.module.ts
├── interfaces/          # Interfaces TypeScript
├── utils/              # Utilidades
└── main.ts            # Punto de entrada
```

## 🚧 Solución de Problemas

### Error: "Cannot GET /"
El endpoint raíz no está implementado. Usa `/characters` para acceder a la API.

### Error de conexión a la API
Verifica tu conexión a internet ya que la aplicación consume la API externa de Rick and Morty.


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

- GitHub: [@stevenzuluaga](https://github.com/stevenzuluaga)

## 🙏 Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) por proporcionar la API gratuita
- [NestJS](https://nestjs.com/) por el excelente framework
- [RxJS](https://rxjs.dev/) por la programación reactiva

---

<div align="center">
  <p>Hecho con ❤️ y ☕ para la comunidad de desarrolladores</p>
</div>
