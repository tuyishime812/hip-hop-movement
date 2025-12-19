from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routers - using relative imports since they're in the same package
from routes.event_routes import router as event_router
from routes.artist_routes import router as artist_router
from routes.donation_routes import router as donation_router
from routes.contact_routes import router as contact_router
from routes.auth_routes import router as auth_router
from routes.admin_routes import router as admin_router
from routes.news_routes import router as news_router
from routes.merchandise_routes import router as merchandise_router

app = FastAPI(
    title="Hip-Hop Foundation API",
    description="API for the Hip-Hop Foundation website",
    version="1.0.0"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allow_headers=["*"],
)

# Include routers
app.include_router(event_router, prefix="/api/events", tags=["events"])
app.include_router(artist_router, prefix="/api/artists", tags=["artists"])
app.include_router(donation_router, prefix="/api/donations", tags=["donations"])
app.include_router(contact_router, prefix="/api/contact", tags=["contact"])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(admin_router, prefix="/api/admin", tags=["admin"])
app.include_router(news_router, prefix="/api/news", tags=["news"])
app.include_router(merchandise_router, prefix="/api/merchandise", tags=["merchandise"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Hip-Hop Foundation API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}