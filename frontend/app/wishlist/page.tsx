"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
};

export default function WishlistPage() {
  const [favorites, setFavorites] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const ids: number[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      const listings: Listing[] = [];

      for (const id of ids) {
        const res = await fetch(
          `http://127.0.0.1:8000/listings/${id}`
        );

        if (res.ok) {
          listings.push(await res.json());
        }
      }

      setFavorites(listings);
    }

    loadFavorites();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          Wishlist
        </h1>

        {favorites.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Save your favourite homes by clicking the ❤️ icon.
            </p>

            <Link
              href="/"
              className="inline-block mt-8 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl"
            >
              Explore Homes
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {favorites.map((listing) => (

              <Link
                href={`/listing/${listing.id}`}
                key={listing.id}
              >

                <div className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition">

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-5">

                    <div className="flex justify-between">

                      <h2 className="font-semibold text-lg text-gray-900">
                        {listing.location}
                      </h2>

                      <p>
                        ⭐ {listing.rating}
                      </p>

                    </div>

                    <p className="text-gray-500 mt-2">
                      {listing.title}
                    </p>

                    <p className="mt-4 font-bold text-xl">
                      ₹{listing.price}
                      <span className="font-normal text-gray-500 text-base">
                        {" "}
                        / night
                      </span>
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

      <Footer />

    </main>
  );
}