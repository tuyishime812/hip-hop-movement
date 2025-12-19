from sqlalchemy.orm import Session
from models.database import User, Event, Artist, Donation, ContactMessage
from utils.auth import get_password_hash
from config import settings


def create_initial_admin_user(db: Session):
    """Create an initial admin user if none exists"""
    # Check if admin user already exists
    admin_user = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    
    if not admin_user:
        # Create admin user
        try:
            hashed = get_password_hash(settings.ADMIN_PASSWORD)
        except Exception as e:
            # Surface helpful error if password hashing fails (e.g. bcrypt length limit)
            print(f"Error hashing ADMIN_PASSWORD: {e}")
            print("Make sure ADMIN_PASSWORD is 72 bytes or shorter, or switch to bcrypt_sha256/argon2.")
            return

        admin_user = User(
            email=settings.ADMIN_EMAIL,
            full_name="Admin User",
            hashed_password=hashed,
            is_admin=True
        )
        db.add(admin_user)
        db.commit()
        print(f"Initial admin user created: {settings.ADMIN_EMAIL}")
    else:
        print(f"Admin user already exists: {settings.ADMIN_EMAIL}")