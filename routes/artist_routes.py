from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.database import Artist
from models.schemas import ArtistCreate, ArtistUpdate, Artist
from database.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Artist])
def get_artists(
    skip: int = 0,
    limit: int = 100,
    is_featured: bool = None,
    db: Session = Depends(get_db)
):
    """Get a list of artists"""
    query = db.query(Artist)
    if is_featured is not None:
        query = query.filter(Artist.is_featured == is_featured)
    
    artists = query.offset(skip).limit(limit).all()
    return artists


@router.get("/{artist_id}", response_model=Artist)
def get_artist(artist_id: int, db: Session = Depends(get_db)):
    """Get a specific artist by ID"""
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist


@router.post("/", response_model=Artist)
def create_artist(artist_data: ArtistCreate, db: Session = Depends(get_db)):
    """Create a new artist"""
    db_artist = Artist(**artist_data.dict())
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist


@router.put("/{artist_id}", response_model=Artist)
def update_artist(artist_id: int, artist_data: ArtistUpdate, db: Session = Depends(get_db)):
    """Update an existing artist"""
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    
    update_data = artist_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(artist, field, value)
    
    db.commit()
    db.refresh(artist)
    return artist


@router.delete("/{artist_id}")
def delete_artist(artist_id: int, db: Session = Depends(get_db)):
    """Delete an artist"""
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    
    db.delete(artist)
    db.commit()
    return {"message": "Artist deleted successfully"}