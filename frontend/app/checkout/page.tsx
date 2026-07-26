"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listingId = searchParams.get("listingId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const total = searchParams.get("total");

  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    if (!listingId) return;

    fetch(
      `https://airbnb-clone-backend-8f5q.onrender.com/listings/${listingId}`
    )
      .then((res) => res.json())
      .then((data) => setListing(data));
  }, [listingId]);

  async function confirmBooking() {
    if (!listing) return;

    const booking = {
      listing_id: listing.id,
      guest_id: 2,
      check_in: checkIn,
      check_out: checkOut,
      guests: Number(guests),
      total_price: Number(total),
    };

    const response = await fetch(
      "https://airbnb-clone-backend-8f5q.onrender.com/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    );

    if (response.ok) {
      toast.success("Booking Confirmed!");

      setTimeout(() => {
        router.push("/my-trips");
      }, 1500);
    } else {
      const error = await response.json();
      toast.error(error.detail);
    }
  }

  if (!listing) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-6">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">

            <h2 className="text-3xl font-bold">
              {listing.title}
            </h2>

            <p className="text-gray-500 mt-2">
              📍 {listing.location}
            </p>

            <hr className="my-8" />

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">
                <span>Check In</span>
                <span>{checkIn}</span>
              </div>

              <div className="flex justify-between">
                <span>Check Out</span>
                <span>{checkOut}</span>
              </div>

              <div className="flex justify-between">
                <span>Guests</span>
                <span>{guests}</span>
              </div>

              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-bold text-2xl">
                  ₹{total}
                </span>
              </div>

            </div>

            <button
              onClick={confirmBooking}
              className="w-full mt-10 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              Confirm Booking
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Loading...
          </h2>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}