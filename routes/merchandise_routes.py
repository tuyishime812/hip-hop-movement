from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.database import MerchandiseItem
from models.schemas import MerchandiseItemCreate, MerchandiseItemUpdate, MerchandiseItem
from database.database import get_db

router = APIRouter()


@router.get("/", response_model=List[MerchandiseItem])
def get_merchandise(
    skip: int = 0,
    limit: int = 100,
    is_available: bool = True,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get a list of merchandise items"""
    query = db.query(MerchandiseItem).filter(MerchandiseItem.is_available == is_available)
    
    if category:
        query = query.filter(MerchandiseItem.category == category)
    
    items = query.offset(skip).limit(limit).all()
    return items


@router.get("/{item_id}", response_model=MerchandiseItem)
def get_merchandise_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific merchandise item by ID"""
    item = db.query(MerchandiseItem).filter(MerchandiseItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Merchandise item not found")
    return item


@router.post("/", response_model=MerchandiseItem)
def create_merchandise_item(item_data: MerchandiseItemCreate, db: Session = Depends(get_db)):
    """Create a new merchandise item"""
    db_item = MerchandiseItem(**item_data.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put("/{item_id}", response_model=MerchandiseItem)
def update_merchandise_item(item_id: int, item_data: MerchandiseItemUpdate, db: Session = Depends(get_db)):
    """Update an existing merchandise item"""
    item = db.query(MerchandiseItem).filter(MerchandiseItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Merchandise item not found")

    update_data = item_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_merchandise_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a merchandise item"""
    item = db.query(MerchandiseItem).filter(MerchandiseItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Merchandise item not found")

    db.delete(item)
    db.commit()
    return {"message": "Merchandise item deleted successfully"}