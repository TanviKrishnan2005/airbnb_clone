from .database import SessionLocal, engine, Base
from .models import User, Listing

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Don't add data again if it already exists
if db.query(User).count() == 0:

    host = User(
        name="Tanvi",
        email="host@example.com",
        role="host"
    )

    guest = User(
        name="Guest",
        email="guest@example.com",
        role="guest"
    )

    db.add(host)
    db.add(guest)
    db.commit()

    db.refresh(host)

    listings = [

        Listing(
            title="Modern Apartment",
            description="Beautiful apartment in the city center.",
            location="Delhi",
            price=3200,
            rating=4.8,
            image="https://picsum.photos/600/400?random=1",
            amenities="Wifi, Kitchen, AC",
            property_type="Apartment",
            host_id=host.id
        ),

        Listing(
            title="Beach House",
            description="Relax near the beach with amazing views.",
            location="Goa",
            price=5200,
            rating=4.9,
            image="https://picsum.photos/600/400?random=2",
            amenities="Pool, Wifi, Parking",
            property_type="House",
            host_id=host.id
        ),

        Listing(
            title="Mountain Cabin",
            description="Peaceful cabin surrounded by nature.",
            location="Manali",
            price=2800,
            rating=4.7,
            image="https://picsum.photos/600/400?random=3",
            amenities="Fireplace, Wifi",
            property_type="Cabin",
            host_id=host.id
        )

    ]

    db.add_all(listings)
    db.commit()

print("Database seeded successfully!")

db.close()