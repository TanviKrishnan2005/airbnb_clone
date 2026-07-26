from fastapi import FastAPI, Depends ,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from .database import Base, engine, SessionLocal
from . import models,schemas

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Welcome to Airbnb Clone API"}


@app.get("/health")
def health():
    return {"status": "Backend is running"}


@app.get("/listings")
def get_all_listings(db: Session = Depends(get_db)):
    listings = db.query(models.Listing).all()
    return listings




@app.get("/listings/{listing_id}")
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = (
        db.query(models.Listing)
        .filter(models.Listing.id == listing_id)
        .first()
    )

    if listing is None:
        raise HTTPException(status_code=404, detail="Listing not found")

    return listing

@app.post("/bookings")
def create_booking(
    booking: schemas.BookingCreate,
    db: Session = Depends(get_db)
):
    # Check if this listing is already booked for overlapping dates
    existing_booking = (
        db.query(models.Booking)
        .filter(
            models.Booking.listing_id == booking.listing_id,
            models.Booking.check_in < booking.check_out,
            models.Booking.check_out > booking.check_in
        )
        .first()
    )

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="Selected dates are not available."
        )

    new_booking = models.Booking(
        listing_id=booking.listing_id,
        guest_id=booking.guest_id,
        check_in=booking.check_in,
        check_out=booking.check_out,
        guests=booking.guests,
        total_price=booking.total_price
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return new_booking

@app.get("/bookings")
def get_bookings(db: Session = Depends(get_db)):
    return db.query(models.Booking).all()

@app.post("/listings")
def create_listing(
    listing: schemas.ListingCreate,
    db: Session = Depends(get_db)
):
    new_listing = models.Listing(
        title=listing.title,
        description=listing.description,
        location=listing.location,
        price=listing.price,
        rating=listing.rating,
        image=listing.image,
        amenities=listing.amenities,
        property_type=listing.property_type,
        host_id=listing.host_id
    )

    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    return new_listing

@app.delete("/listings/{listing_id}")
def delete_listing(
    listing_id: int,
    db: Session = Depends(get_db)
):
    listing = (
        db.query(models.Listing)
        .filter(models.Listing.id == listing_id)
        .first()
    )

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    db.delete(listing)
    db.commit()

    return {"message": "Listing deleted successfully"}

@app.put("/listings/{listing_id}")
def update_listing(
    listing_id: int,
    updated_listing: schemas.ListingCreate,
    db: Session = Depends(get_db)
):
    listing = (
        db.query(models.Listing)
        .filter(models.Listing.id == listing_id)
        .first()
    )

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    listing.title = updated_listing.title
    listing.description = updated_listing.description
    listing.location = updated_listing.location
    listing.price = updated_listing.price
    listing.rating = updated_listing.rating
    listing.image = updated_listing.image
    listing.amenities = updated_listing.amenities
    listing.property_type = updated_listing.property_type
    listing.host_id = updated_listing.host_id

    db.commit()
    db.refresh(listing)

    return listing