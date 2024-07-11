#!/bin/bash

echo "starting migrations..."

npm run migrations & PID=$!

wait $PID

echo "starting dev server..."

npm run dev:watch & PID=$!

wait $PID