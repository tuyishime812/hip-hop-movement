from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.database import User, Event, Artist, Donation, ContactMessage
from models.schemas import User, Event, Artist, Donation, ContactMessage
from database.database import get_db
from utils.auth import oauth2_scheme, verify_token
from config import settings

router = APIRouter()


async def get_current_admin_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get the current admin user from the token"""
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.email == email).first()
    if user is None or not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized as admin",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user


@router.get("/stats")
def get_site_stats(db: Session = Depends(get_db)):
    """Get site statistics for admin dashboard"""
    total_users = db.query(User).count()
    total_events = db.query(Event).count()
    total_artists = db.query(Artist).count()
    total_donations = db.query(Donation).count()
    total_messages = db.query(ContactMessage).count()
    
    # Total donation amount
    total_donated = db.query(Donation).filter(Donation.status == "completed").with_entities(Donation.amount).all()
    total_amount = sum([d.amount for d in total_donated])
    
    # Unread messages count
    unread_messages = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    
    return {
        "total_users": total_users,
        "total_events": total_events,
        "total_artists": total_artists,
        "total_donations": total_donations,
        "total_donated": total_amount,
        "total_messages": total_messages,
        "unread_messages": unread_messages
    }


@router.get("/users", response_model=List[User])
def get_all_users(db: Session = Depends(get_db)):
    """Get all users (admin only)"""
    users = db.query(User).all()
    return users


@router.patch("/users/{user_id}/toggle-admin")
def toggle_user_admin_status(user_id: int, db: Session = Depends(get_db)):
    """Toggle admin status for a user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = not user.is_admin
    db.commit()
    return {"message": f"Admin status updated for user {user.email}"}


@router.get("/donations/pending", response_model=List[Donation])
def get_pending_donations(db: Session = Depends(get_db)):
    """Get all pending donations"""
    donations = db.query(Donation).filter(Donation.status == "pending").all()
    return donations