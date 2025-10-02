#!/bin/bash

echo "Starting CrediLinq Application Setup..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Start PostgreSQL with Docker
echo "Starting PostgreSQL with Docker..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until docker exec credlinqassignment-postgres-1 pg_isready -U postgres > /dev/null 2>&1; do
    echo "PostgreSQL is not ready yet. Waiting..."
    sleep 2
done

echo "PostgreSQL is ready!"

# Setup Backend
echo "Setting up backend..."
cd credilinq-backend

echo "Installing backend dependencies..."
if npm install; then
    echo "Backend dependencies installed successfully"
else
    echo "Error: Failed to install backend dependencies"
    exit 1
fi

echo "Running database migrations..."
if npx sequelize-cli db:create; then
    echo "Database created successfully"
else
    echo "Database might already exist, continuing..."
fi

if npx sequelize-cli db:migrate; then
    echo "Database migrations completed successfully"
else
    echo "Error: Failed to run database migrations"
    exit 1
fi

echo "Starting backend server..."
npm run start:dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 5

# Setup Frontend
echo "Setting up frontend..."
cd ../frontend

echo "Installing frontend dependencies..."
if npm install; then
    echo "Frontend dependencies installed successfully"
else
    echo "Error: Failed to install frontend dependencies"
    exit 1
fi

echo "Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $FRONTEND_PID 2>/dev/null
    kill $BACKEND_PID 2>/dev/null
    docker-compose down
    echo "All services stopped"
    exit 0
}

# Set trap to handle Ctrl+C
trap cleanup INT

echo ""
echo "=========================================="
echo "          APPLICATION IS RUNNING"
echo "=========================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001" 
echo "PostgreSQL: localhost:5432"
echo "Container: credlinqassignment-postgres-1"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user input to stop
wait
