from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.database import Donation
from models.schemas import DonationCreate, DonationUpdate, Donation
from database.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Donation])
def get_donations(
    skip: int = 0,
    limit: int = 100,
    status_filter: str = None,
    db: Session = Depends(get_db)
):
    """Get a list of donations"""
    query = db.query(Donation)
    if status_filter:
        query = query.filter(Donation.status == status_filter)
    
    donations = query.order_by(Donation.created_at.desc()).offset(skip).limit(limit).all()
    return donations


@router.get("/{donation_id}", response_model=Donation)
def get_donation(donation_id: int, db: Session = Depends(get_db)):
    """Get a specific donation by ID"""
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation


@router.post("/", response_model=Donation)
def create_donation(donation_data: DonationCreate, db: Session = Depends(get_db)):
    """Create a new donation"""
    db_donation = Donation(**donation_data.dict())
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation


@router.put("/{donation_id}", response_model=Donation)
def update_donation(donation_id: int, donation_data: DonationUpdate, db: Session = Depends(get_db)):
    """Update an existing donation"""
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    update_data = donation_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(donation, field, value)
    
    db.commit()
    db.refresh(donation)
    return donation


@router.delete("/{donation_id}")
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    """Delete a donation"""
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    db.delete(donation)
    db.commit()
    return {"message": "Donation deleted successfully"}