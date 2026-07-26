"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  property_type: string;
  amenities: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [amenity, setAmenity] = useState("");
  const [visibleListings, setVisibleListings] = useState(4);

  // Fetch Listings
  useEffect(() => {
    fetch("https://airbnb-clone-backend-8f5q.onrender.com/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      });
  }, []);

  // Reset pagination whenever filters change
  useEffect(() => {
  setVisibleListings(4);
}, [search, maxPrice, propertyType, amenity]);

  // Apply filters
  const filteredListings = listings.filter((listing) => {
    const matchesLocation =
      listing.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPrice =
      maxPrice === "" ||
      listing.price <= Number(maxPrice);

    const matchesProperty =
      propertyType === "" ||
      listing.property_type === propertyType;

    const matchesAmenity =
    amenity === "" ||
    listing.amenities
      .toLowerCase()
      .includes(amenity.toLowerCase());

    return (
      matchesLocation &&
      matchesPrice &&
      matchesProperty &&
      matchesAmenity
    );
  });

  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <SearchBar
        search={search}
        setSearch={setSearch}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        amenity={amenity}
        setAmenity={setAmenity}
      />

      <div className="max-w-[1450px] mx-auto px-10 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredListings
            .slice(0, visibleListings)
            .map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))}

        </div>

        {visibleListings < filteredListings.length && (

          <div className="flex justify-center mt-12">

            <button
              onClick={() =>
                setVisibleListings((prev) => prev + 4)
              }
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl transition"
            >
              Load More
            </button>

          </div>

        )}

      </div>

      <Footer />

    </main>
  );
}