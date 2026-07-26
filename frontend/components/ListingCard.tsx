"use client";

import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorite(favorites.includes(listing.id));
  }, [listing.id]);

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();

    let favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (favorites.includes(listing.id)) {
      favorites = favorites.filter((id: number) => id !== listing.id);
      setFavorite(false);
    } else {
      favorites.push(listing.id);
      setFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="group cursor-pointer">

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl">

          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-64 object-cover transition duration-500 group-hover:scale-105 rounded-3xl"
          />

          {/* Guest Favourite */}
          <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            Guest favourite
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4"
          >
            <FaHeart
              size={24}
              className={
                favorite
                  ? "text-red-500"
                  : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              }
            />
          </button>

        </div>

        {/* Details */}

        <div className="mt-4">

          <div className="flex justify-between items-start">

            <div>

              <h3 className="font-semibold text-lg text-gray-900">
                {listing.location}
              </h3>

              <p className="text-gray-600 text-base mt-1">
                {listing.title}
              </p>

            </div>

            <div className="flex items-center gap-1">

              <FaStar
                size={14}
                className="text-black"
              />

              <span className="text-base font-medium text-black">
                {listing.rating}
              </span>

            </div>

          </div>

          <p className="mt-3 text-lg">

            <span className="font-bold text-black">
              ₹{listing.price}
            </span>

            <span className="text-gray-700 font-medium">
              {" "} / night
            </span>

          </p>
          

        </div>

      </div>
      
      
    </Link>
  );
}