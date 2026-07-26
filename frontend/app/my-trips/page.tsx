"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

type Booking = {
  id: number;
  listing_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
};

type Listing = {
  id: number;
  title: string;
  location: string;
  image: string;
  price: number;
};

export default function MyTrips() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [listingMap, setListingMap] = useState<Record<number, Listing>>({});

  useEffect(() => {
    async function loadTrips() {
      const bookingRes = await fetch("https://airbnb-clone-backend-8f5q.onrender.com/bookings");
      const bookingData = await bookingRes.json();

      setBookings(bookingData);

      const listings: Record<number, Listing> = {};

      for (const booking of bookingData) {
        if (!listings[booking.listing_id]) {
          const res = await fetch(
            `https://airbnb-clone-backend-8f5q.onrender.com/listings/${booking.listing_id}`
          );

          const listing = await res.json();
          listings[listing.id] = listing;
        }
      }

      setListingMap(listings);
    }

    loadTrips();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-10">
          My Trips
        </h1>

        {bookings.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold">
              No trips yet
            </h2>

            <p className="text-gray-500 mt-2">
              Book your first Airbnb stay!
            </p>

            <Link
              href="/"
              className="inline-block mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl"
            >
              Explore Homes
            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {bookings.map((booking) => {
              const listing = listingMap[booking.listing_id];

              if (!listing) return null;

              return (

                <div
                  key={booking.id}
                  className="bg-white rounded-3xl shadow hover:shadow-lg transition overflow-hidden flex flex-col md:flex-row"
                >

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full md:w-80 h-64 object-cover"
                  />

                  <div className="flex-1 p-8 flex flex-col justify-between">

                    <div>

                      <h2 className="text-3xl font-semibold">
                        {listing.title}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        📍 {listing.location}
                      </p>

                      <div className="mt-6 space-y-2">

                        <p>
                          📅 <strong>Check-in:</strong> {booking.check_in}
                        </p>

                        <p>
                          📅 <strong>Check-out:</strong> {booking.check_out}
                        </p>

                        <p>
                          👥 <strong>Guests:</strong> {booking.guests}
                        </p>

                      </div>

                    </div>

                    <div className="flex justify-between items-center mt-8">

                      <p className="text-2xl font-bold">
                        ₹{booking.total_price}
                      </p>

                      <Link
                        href={`/listing/${listing.id}`}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
                      >
                        View Property
                      </Link>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

      <Footer />

    </main>
  );
}