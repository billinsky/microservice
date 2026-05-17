# Microservices Application with Spring Boot and Angular

This project is a complete microservices-based application featuring a Spring Boot backend and an Angular frontend.

## Architecture

- **Config Server**: Centralized configuration management.
- **Discovery Server**: Eureka server for service registration and discovery.
- **API Gateway**: Spring Cloud Gateway for routing and JWT-based authentication.
- **Client Service**: Manages client data using MongoDB. Includes a gRPC server for inter-service communication.
- **Order Service**: Manages order data using MongoDB. Uses a gRPC client to fetch client details from the Client Service.
- **Angular Frontend**: A responsive admin dashboard for managing clients and orders.

## Technologies Used

- **Backend**: Spring Boot 3, Spring Cloud, MongoDB, gRPC, MapStruct, Lombok, JWT.
- **Frontend**: Angular 18+, SCSS, RxJS.
- **Infrastructure**: Docker, Docker Compose.

## How to Run

### Local Development

1. **Prerequisites**: JDK 21, Node.js 22, Maven, MongoDB.
2. **Backend**:
   - Run `mvn clean install` from the root.
   - Start each service in order: Config Server (8888), Discovery Server (8761), API Gateway (8080), Client Service (8081), Order Service (8082).
3. **Frontend**:
   - Navigate to `frontend/`.
   - Run `npm install` and then `npm start`.
   - Access the dashboard at `http://localhost:4200`.

### Docker Compose

Run the entire stack with:
```bash
docker-compose up --build
```

## Features

- **Authentication**: JWT-based security implemented at the Gateway level.
- **CRUD Operations**: Complete management for Clients and Orders.
- **Inter-service Communication**: Efficient gRPC communication between Order and Client services.
- **Responsive UI**: Admin dashboard optimized for different screen sizes.
- **Validation & Exception Handling**: Robust server-side validation and global error handling.
