#!/bin/bash

echo "Starting dev.sh"

echo "Setting env vars"
export SQL_DB_HOST=localhost
export SQL_DB_PORT=5432
export SQL_DB_USER=username
export SQL_DB_PASSWORD=password
export SQL_DB_DATABASE=redisetlaunch
echo "Env vars set!"

cleanup() {
  if [[ -n $SUB_PID ]]; then
    kill "$SUB_PID"
  fi
}

trap cleanup EXIT

docker-compose up -d

check_db_health() {
  docker-compose ps db | grep healthy
}

echo "Waiting for database to become healthy..."

while true; do
  if check_db_health; then
    echo "Database healthy!"
    break
  else
    sleep 5
  fi
done

echo "Pushing schema to local db..."
pnpm run db:push
echo "Pushed schema!"

echo "Starting db studio on port 3001..."
pnpm run db:ui &
echo "Db studio live!"

SUB_PID=$!

echo "Starting next app..."
pnpm run dev

echo "Gracefully shutting down..."
docker-compose down
echo "Graceful shutdown AF!"
