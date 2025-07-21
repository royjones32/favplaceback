# FavPlace Project Documentation

This document provides a detailed explanation of how Docker, RabbitMQ, and Redis are used in this project, as well as a review of the project requirements.

## Project Requirements Review

Based on the project description, here is a review of the completed and remaining steps:

-   **[Done] Step 1: Backend:** The backend is set up with Next.js and includes server-side actions in `lib/actions.ts`.
-   **[Done] Step 2: REST API:** The application uses Next.js Server Actions, which act as a REST API.
-   **[In Progress] Step 3: CI/CD:** This step has not been started yet.
-   **[Done] Step 4: Docker:** The application is containerized with Docker.
-   **[Done] Step 5: RabbitMQ:** RabbitMQ is integrated for asynchronous messaging.
-   **[Done] Step 6: Redis:** Redis is integrated for caching.
-   **[Not Started] Step 7: Domain/Telefon:** The application has not been deployed to a domain yet.

## Detailed Explanation of Implemented Steps

### Step 4: Docker

Docker is used to containerize the application, making it portable and easy to run in any environment.

-   **Why we use it:** Docker ensures that the application runs the same way on any machine, which simplifies development and deployment.
-   **How it's used:**
    -   The **`Dockerfile`** contains the instructions to build a Docker image of the application. It installs dependencies, builds the application, and sets the command to run it.
    -   The **`docker-compose.yml`** file defines the services that make up the application: the app itself, RabbitMQ, and Redis. It allows us to run all the services with a single command.
-   **When it happens:** The Docker containers are built and started when you run `docker-compose up --build`.

### Step 5: RabbitMQ

RabbitMQ is a message broker used for asynchronous communication.

-   **Why we use it:** It allows us to offload long-running tasks to the background, so the user doesn't have to wait. For example, when a new event is created, we can send a message to a queue to be processed later, without blocking the user's request.
-   **How it's used:**
    -   The **`lib/rabbitmq.ts`** file contains the `sendToQueue` function, which connects to the RabbitMQ container and sends a message to a specified queue.
    -   In **`lib/actions.ts`**, the `addEvent`, `createOrder`, and `createNewPost` functions use `sendToQueue` to send a message to a queue when a new event, order, or post is created.
-   **Example Usage:**
    -   When a user creates a new event on the `/panel/etkinlikler/ekle` page, the `addEvent` function in `lib/actions.ts` is called. This function sends a message to the `event_created` queue in RabbitMQ. A separate service could then listen to this queue to perform actions like sending notifications to users.

### Step 6: Redis

Redis is an in-memory data store used for caching.

-   **Why we use it:** Caching frequently accessed data in Redis improves the application's performance by reducing the need to query the database every time.
-   **How it's used:**
    -   The **`lib/redis.ts`** file contains the `setCache` and `getCache` functions for interacting with the Redis cache. It connects to the Redis container using the `REDIS_URL` environment variable.
-   **Example Usage:**
    -   When a user visits the `/mekanlar` page, the application can first check if the list of venues is in the Redis cache. If it is, the data is returned from Redis. If not, the data is fetched from the database, stored in the Redis cache for future requests, and then returned to the user.

## How to Run the Application

To run the application, you need to have Docker and Docker Compose installed. Then, you can run the following command in your terminal:

```bash
docker-compose up --build
```

This will build the Docker images and start all the containers. The application will be available at `http://localhost:3000`.








docker compose down -v

docker compose up --build -d