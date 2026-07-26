from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    role = Column(String)   # host or guest

    listings = relationship("Listing", back_populates="host")
    bookings = relationship("Booking", back_populates="guest")


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    description = Column(String)

    location = Column(String)

    price = Column(Float)

    rating = Column(Float)

    image = Column(String(500))

    amenities = Column(String)

    property_type = Column(String)

    host_id = Column(Integer, ForeignKey("users.id"))

    host = relationship("User", back_populates="listings")
    bookings = relationship("Booking", back_populates="listing")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    check_in = Column(Date)
    check_out = Column(Date)

    guests = Column(Integer)

    total_price = Column(Float)

    listing_id = Column(Integer, ForeignKey("listings.id"))
    guest_id = Column(Integer, ForeignKey("users.id"))

    listing = relationship("Listing", back_populates="bookings")
    guest = relationship("User", back_populates="bookings")


class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    listing_id = Column(Integer, ForeignKey("listings.id"))


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    rating = Column(Integer)

    comment = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    listing_id = Column(Integer, ForeignKey("listings.id"))