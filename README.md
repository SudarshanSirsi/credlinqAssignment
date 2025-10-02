# CrediLinq SME HealthCheck Application

This is a full-stack application that allows Small and Medium-sized Enterprises (SMEs) to submit their company information and bank statements for a "HealthCheck". The application consists of a Next.js frontend, a NestJS backend, and a PostgreSQL database.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Material-UI, Tailwind CSS
- **Backend:** NestJS, TypeScript, Sequelize
- **Database:** PostgreSQL
- **Containerization:** Docker

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Setup and Running the Application

These instructions will guide you through running the PostgreSQL database using Docker and then running the backend and frontend services locally on your machine.

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone <your-repository-url>
cd credlinqAssignment
```

### Step 2: Start the Database with Docker

The project includes a `docker-compose.yml` file configured to run the PostgreSQL database.

From the root directory of the project (`D:\credlinqAssignment`), run the following command:

```bash
docker-compose up -d
```

This command will start the PostgreSQL database in a detached mode. The database will be accessible on `localhost:5432`.

### Step 3: Set Up and Run the Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd credilinq-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run database migrations:**
    The backend uses Sequelize for database migrations. Run the following command to set up the necessary tables in the database you just started with Docker.
    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Start the backend server:**
    ```bash
    npm run start:dev
    ```
    The backend server will start and listen on `http://localhost:3001`. It is pre-configured to connect to the Dockerized PostgreSQL database.

### Step 4: Set Up and Run the Frontend

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will start and be accessible at `http://localhost:3000`.

## Accessing the Application

-   **Frontend Application:** [http://localhost:3000](http://localhost:3000)
-   **Backend API:** [http://localhost:3001](http://localhost:3001)
-   **Submissions Page:** [http://localhost:3000/submissions](http://localhost:3000/submissions)

To stop the database container, run `docker-compose down` from the root directory.
