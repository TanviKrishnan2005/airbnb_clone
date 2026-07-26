from pydantic import BaseModel
from datetime import date


class ListingBase(BaseModel):
    title: str
    description: str
    location: str
    price: float
    rating: float
    image: str
    amenities: str
    property_type: str
    host_id: int


class ListingCreate(ListingBase):
    pass


class Listing(ListingBase):
    id: int

    class Config:
        from_attributes = True


# ---------------- BOOKINGS ----------------

class BookingBase(BaseModel):
    listing_id: int
    guest_id: int
    check_in: date
    check_out: date
    guests: int
    total_price: float


class BookingCreate(BookingBase):
    pass


class BookingResponse(BookingBase):
    id: int

    class Config:
        from_attributes = True