init: init-db
    cd frontend && npm install

init-db:
    docker cp backend/sample_db/assistant_db_setup.sql postgres_db:/assistant_db_setup.sql 
    docker exec postgres_db psql -U postgres -d ai_assistant -f assistant_db_setup.sql

run-frontend:
    cd frontend && npm run dev

run-backend: 
    fastapi dev backend/src/main.py