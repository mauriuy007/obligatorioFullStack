# FullStack - Obligatorio

## Project Overview

This project is a backend API developed with **Node.js** and **Express**. Its main goal is to support a platform centered on **books, users, and reviews**.

The idea behind the project is to build a system where:

- books can be listed and managed;
- users can interact with the platform through reviews;
- different user roles or user types can be represented;
- external services can be integrated to enrich the application, such as AI-powered review improvement or book data retrieval.

At the current stage, the repository provides the **initial backend foundation** and a modular structure prepared for future growth.

## Main Technologies

- **Node.js** for the runtime environment
- **Express** for the REST API
- **Joi** for request and data validation
- **Mongoose** for the future database layer with MongoDB
- **Google GenAI SDK** for AI-related features

## Architecture

The project follows a **layered architecture**. This approach was chosen to keep responsibilities separated and make the code easier to understand, maintain, and extend.

### Routers

Routers define the available endpoints and connect them to the corresponding controller functions.

Current router files:

- `server/src/routers/bookRouter.js`
- `server/src/routers/reviewRouter.js`

### Controllers

Controllers handle incoming HTTP requests and generate the API responses.

Current controller files:

- `server/src/controllers/bookController.js`
- `server/src/controllers/reviewController.js`
- `server/src/controllers/userController.js`

### Models

Models represent the main entities of the system and help define the domain structure of the application.

Current models include:

- `Book`
- `Review`
- `User`
- `PremiumUser`

### Validators and Middleware

Validation logic is separated from controller logic in order to keep the request flow cleaner.

- Validators are responsible for checking input data.
- Middleware functions can intercept requests before they reach the controller.

Current examples:

- `server/src/validators/userValidator.js`
- `server/src/middleware/validateUserMiddleware.js`

### Services

The services layer is used for external integrations or helper logic that should remain independent from the controllers.

The current structure already includes:

- a Gemini-based review improvement service;
- a Google Books service placeholder.

### Repositories

The repository layer is intended to isolate data access and persistence logic from the rest of the application.

This part of the architecture is present in the structure, although it is still under development.

## Application Flow

The server starts from `server/src/index.js`.

Its current behavior is:

- create the Express application;
- enable JSON request parsing with `express.json()`;
- register the routers under the `/api/v1` prefix;
- start the server on `http://localhost:3000`.

This versioned route structure helps keep the API organized and ready to evolve over time.

## Documented Endpoints

This README includes **only the endpoints that are currently connected and exposed through the server**. Endpoints created only for testing purposes, or functions that are not properly routed yet, are intentionally excluded.

### `GET /api/v1/books`

This endpoint provides the current base response for the books module.

Current response:

```json
{
  "message": "Get all books"
}
```

### `GET /api/v1/reviews`

This endpoint provides the current base response for the reviews module.

Current response:

```json
{
  "message": "Get all reviews"
}
```

## Endpoints Not Included

There are additional controllers, services, and planned modules in the project, but they are not documented here because:

- they are not currently exposed through a router;
- they were created as tests or temporary experiments;
- or they are still incomplete.

The purpose of this README is to describe the **actual current state of the project**, not the planned or unfinished parts.

## How to Run the Project

### From the project root

```bash
npm install
npm run dev
```

### From the `server` folder

```bash
cd server
npm install
npm run dev
```

The server runs at:

```bash
http://localhost:3000
```

## Project Structure

```text
.
├── README.md
├── package.json
└── server
    ├── package.json
    └── src
        ├── index.js
        ├── config
        ├── controllers
        ├── errors
        ├── middleware
        ├── models
        ├── repositories
        ├── routers
        ├── services.js
        └── validators
```

## Current Status

The project already has a clear backend foundation in Node.js, with a structure designed for scalability and maintainability. The current implementation exposes the books and reviews routes, while the rest of the architecture is already prepared for future development involving users, persistence, validation, and external integrations.
