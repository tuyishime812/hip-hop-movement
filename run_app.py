import uvicorn
from database.init_db import init_db


if __name__ == "__main__":
    # Initialize database with tables and sample data
    init_db()

    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True  # Enable auto-reload during development
    )