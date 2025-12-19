from database.database import engine
from models.database import Base, Artist, Event, Donation, ContactMessage, User
from utils.auth import get_password_hash
from config import settings
from sqlalchemy.orm import sessionmaker
from datetime import datetime

def init_db():
    """Initialize the database tables"""
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

    # Create initial sample data and admin user
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    try:
        # Check if admin user already exists
        admin_user = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin_user:
            # Create admin user
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                full_name="Admin User",
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True
            )
            db.add(admin_user)
            print(f"Created admin user: {settings.ADMIN_EMAIL}")

        # Check if any artists exist
        if db.query(Artist).count() == 0:
            # Add sample artists
            sample_artists = [
                Artist(
                    name="DJ Khaled",
                    bio="Legendary hip-hop producer and DJ",
                    genre="Hip-Hop",
                    image_url="https://example.com/dj-khaled.jpg",
                    is_featured=True
                ),
                Artist(
                    name="Eminem",
                    bio="Pulitzer Prize-winning rapper",
                    genre="Rap",
                    image_url="https://example.com/eminem.jpg",
                    is_featured=True
                ),
                Artist(
                    name="Kendrick Lamar",
                    bio="Influential rapper and songwriter",
                    genre="Hip-Hop",
                    image_url="https://example.com/kendrick.jpg",
                    is_featured=True
                ),
            ]
            for artist in sample_artists:
                db.add(artist)

            print("Added sample artists")

        # Check if any events exist
        if db.query(Event).count() == 0:
            # Add sample events
            sample_events = [
                Event(
                    title="Hip-Hop for Humanity Festival",
                    description="Annual charity event bringing together artists and community",
                    date=datetime(2025, 3, 15, 18, 0),
                    location="Community Center, Local City",
                    image_url="https://example.com/event1.jpg",
                    registration_required=True,
                    max_attendees=500
                ),
                Event(
                    title="Youth Hip-Hop Workshop",
                    description="Educational workshop for young artists",
                    date=datetime(2025, 2, 20, 14, 0),
                    location="Youth Center, Local City",
                    image_url="https://example.com/event2.jpg"
                )
            ]
            for event in sample_events:
                db.add(event)

            print("Added sample events")

        # Commit all changes
        db.commit()
        print("Database initialization complete!")

    except Exception as e:
        print(f"Error during database initialization: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()