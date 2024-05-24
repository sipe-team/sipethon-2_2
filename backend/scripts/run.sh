#!/bin/bash
cd "$(dirname "$0")/.."

if [ -f .env ]; then
    export $(cat .env | xargs)
fi

uvicorn app.main:app --reload --host $HOST --port $PORT
