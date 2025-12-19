from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None


class User(UserBase):
    id: int
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Event Schemas
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: Optional[str] = None
    image_url: Optional[str] = None
    registration_required: Optional[bool] = False
    max_attendees: Optional[int] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    registration_required: Optional[bool] = None
    max_attendees: Optional[int] = None
    is_active: Optional[bool] = None


class Event(EventBase):
    id: int
    attendees_count: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Artist Schemas
class ArtistBase(BaseModel):
    name: str
    bio: Optional[str] = None
    genre: Optional[str] = None
    image_url: Optional[str] = None
    social_links: Optional[str] = None  # JSON string
    is_featured: Optional[bool] = False


class ArtistCreate(ArtistBase):
    pass


class ArtistUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    genre: Optional[str] = None
    image_url: Optional[str] = None
    social_links: Optional[str] = None
    is_featured: Optional[bool] = None


class Artist(ArtistBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Donation Schemas
class DonationBase(BaseModel):
    amount: float
    currency: Optional[str] = "USD"
    donor_name: str
    donor_email: EmailStr
    message: Optional[str] = None


class DonationCreate(DonationBase):
    pass


class DonationUpdate(BaseModel):
    status: Optional[str] = None


class Donation(DonationBase):
    id: int
    donor_id: Optional[int] = None
    transaction_id: Optional[str] = None
    payment_method: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Contact Message Schemas
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    phone: Optional[str] = None


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageUpdate(BaseModel):
    is_read: Optional[bool] = None


class ContactMessage(ContactMessageBase):
    id: int
    sender_id: Optional[int] = None
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# Login Request Schema
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Merchandise Item Schemas
class MerchandiseItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    stock_quantity: Optional[int] = 0
    category: Optional[str] = None
    is_available: Optional[bool] = True


class MerchandiseItemCreate(MerchandiseItemBase):
    pass


class MerchandiseItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    stock_quantity: Optional[int] = None
    category: Optional[str] = None
    is_available: Optional[bool] = None


class MerchandiseItem(MerchandiseItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True