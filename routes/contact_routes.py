from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.database import ContactMessage
from models.schemas import ContactMessageCreate, ContactMessageUpdate, ContactMessage
from database.database import get_db

router = APIRouter()


@router.get("/", response_model=List[ContactMessage])
def get_contact_messages(
    skip: int = 0,
    limit: int = 100,
    is_read: bool = None,
    db: Session = Depends(get_db)
):
    """Get a list of contact messages"""
    query = db.query(ContactMessage)
    if is_read is not None:
        query = query.filter(ContactMessage.is_read == is_read)
    
    messages = query.order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()
    return messages


@router.get("/{message_id}", response_model=ContactMessage)
def get_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Get a specific contact message by ID"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.post("/", response_model=ContactMessage)
def create_contact_message(message_data: ContactMessageCreate, db: Session = Depends(get_db)):
    """Create a new contact message"""
    db_message = ContactMessage(**message_data.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


@router.put("/{message_id}", response_model=ContactMessage)
def update_contact_message(message_id: int, message_data: ContactMessageUpdate, db: Session = Depends(get_db)):
    """Update an existing contact message"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    update_data = message_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(message, field, value)
    
    db.commit()
    db.refresh(message)
    return message


@router.delete("/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Delete a contact message"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return {"message": "Message deleted successfully"}