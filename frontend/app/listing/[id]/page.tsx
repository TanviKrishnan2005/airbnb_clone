"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaStar,
  FaShareAlt,
  FaHeart,
  FaWifi,
  FaSnowflake,
  FaHome,
  FaUtensils,
} from "react-icons/fa";
import { toast } from "react-toastify";

type Listing = {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string;
};

export default function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [listing, setListing] = useState<Listing | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  const nights =
    checkIn && checkOut
      ? Math.max(
        0,
        Math.ceil(
          (new Date(checkOut).getTime() -
            new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
        )
      )
      : 0;

  useEffect(() => {
    fetch(`https://airbnb-clone-backend-8f5q.onrender.com/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
      });
  }, [id]);

  useEffect(() => {
    if (!listing || !checkIn || !checkOut) {
      setTotalPrice(0);
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    if (difference > 0) {
      setTotalPrice(difference * listing.price);
    } else {
      setTotalPrice(0);
    }
  }, [listing, checkIn, checkOut]);

  function handleBooking() {
  if (!listing) return;

  if (!checkIn || !checkOut) {
    toast.error("Please select check-in and check-out dates.");
    return;
  }

  router.push(
    `/checkout?listingId=${listing.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&total=${totalPrice + 800}`
  );
}

  if (!listing) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading...
      </h2>
    );
  }
  return (
    <main className="max-w-7xl mx-auto px-8 py-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-4xl font-bold">
            {listing.title}
          </h1>

          <div className="flex items-center gap-3 mt-2 text-gray-600">

            <span className="flex items-center gap-1">
              <FaStar className="text-black" />
              {listing.rating}
            </span>

            <span>·</span>

            <span className="underline cursor-pointer">
              24 Reviews
            </span>

            <span>·</span>

            <span className="underline cursor-pointer">
              {listing.location}
            </span>

          </div>

        </div>

        <div className="flex gap-6">

          <button className="flex items-center gap-2 hover:underline">

            <FaShareAlt />

            Share

          </button>

          <button className="flex items-center gap-2 hover:underline">

            <FaHeart />

            Save

          </button>

        </div>

      </div>

      {/* Gallery */}

      <div className="grid grid-cols-4 gap-2 rounded-3xl overflow-hidden">

        <img
          src={listing.image}
          alt={listing.title}
          className="col-span-2 row-span-2 h-[520px] w-full object-cover"
        />

        <img
          src={listing.image}
          alt=""
          className="h-[255px] w-full object-cover"
        />

        <img
          src={listing.image}
          alt=""
          className="h-[255px] w-full object-cover"
        />

        <img
          src={listing.image}
          alt=""
          className="h-[255px] w-full object-cover"
        />

        <img
          src={listing.image}
          alt=""
          className="h-[255px] w-full object-cover"
        />

      </div>

      {/* Content */}

      <div className="grid grid-cols-3 gap-16 mt-10">

        {/* Left */}

        <div className="col-span-2">

          <h2 className="text-3xl font-semibold">
            Entire home in {listing.location}
          </h2>

          <p className="text-gray-500 mt-2">
            4 guests · 2 bedrooms · 2 beds · 2 bathrooms
          </p>

          {/* Host */}

          <div className="border-b py-8">

            <h3 className="text-2xl font-semibold">
              Hosted by Tanvi
            </h3>

            <p className="text-gray-500 mt-2">
              ⭐ Superhost · 3 years hosting
            </p>

          </div>

          {/* Features */}

          <div className="border-b py-8 space-y-8">

            <div className="flex gap-5">

              <FaHome
                size={22}
                className="mt-1"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  Entire home
                </h3>

                <p className="text-gray-500">
                  You'll have the entire place to yourself.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <FaStar
                size={22}
                className="mt-1"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  Guest favourite
                </h3>

                <p className="text-gray-500">
                  One of the highest-rated homes.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <FaHeart
                size={22}
                className="mt-1"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  Great location
                </h3>

                <p className="text-gray-500">
                  Guests consistently rated the location highly.
                </p>

              </div>

            </div>

          </div>

          {/* Description */}

          <div className="border-b py-8">

            <p className="leading-8 text-gray-700">
              {listing.description}
            </p>

          </div>

          {/* Amenities */}

          <div className="py-8">

            <h2 className="text-3xl font-semibold mb-8">
              What this place offers
            </h2>

            <div className="grid grid-cols-2 gap-8">

              <div className="flex items-center gap-4">

                <FaWifi />

                Wifi

              </div>

              <div className="flex items-center gap-4">

                <FaUtensils />

                Kitchen

              </div>

              <div className="flex items-center gap-4">

                <FaSnowflake />

                Air Conditioning

              </div>

              <div className="flex items-center gap-4">

                <FaHome />

                Entire Home

              </div>

            </div>

          </div>

        </div>

        {/* Right Booking Card */}

        <div>

          <div className="sticky top-28 border rounded-3xl shadow-xl p-6">

            <h2 className="text-3xl font-bold">
              ₹{listing.price}
              <span className="text-lg font-normal"> / night</span>
            </h2>

            {/* Check In */}

            <div className="mt-6">

              <label className="block text-sm font-medium">
                Check In
              </label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            {/* Check Out */}

            <div className="mt-4">

              <label className="block text-sm font-medium">
                Check Out
              </label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            {/* Guests */}

            <div className="mt-4">

              <label className="block text-sm font-medium">
                Guests
              </label>

              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) =>
                  setGuests(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            {/* Price Breakdown */}

            <div className="mt-8 border-t pt-6 space-y-3">

              <div className="flex justify-between">

                <span>
                  ₹{listing.price} × {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Cleaning Fee</span>

                <span>₹500</span>

              </div>

              <div className="flex justify-between">

                <span>Service Fee</span>

                <span>₹300</span>

              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">

                <span>Total</span>

                <span>
                  ₹{totalPrice + 800}
                </span>

              </div>

            </div>

            <button
              onClick={handleBooking}
              className="bg-rose-500 hover:bg-rose-600 text-white w-full py-4 rounded-xl mt-8 font-semibold"
            >
              Reserve
            </button>

          </div>

        </div>

      </div>

      {/* Reviews */}

      <section className="mt-20 border-t pt-12">

        <h2 className="text-3xl font-semibold mb-8">
          ★ {listing.rating} · Guest Reviews
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div>

            <h3 className="font-semibold">
              Aarav
            </h3>

            <p className="text-gray-500 mb-2">
              ★★★★★
            </p>

            <p>
              Amazing stay! Beautiful interiors and a very
              comfortable place.
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Priya
            </h3>

            <p className="text-gray-500 mb-2">
              ★★★★★
            </p>

            <p>
              Great location and exactly like the photos.
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Rahul
            </h3>

            <p className="text-gray-500 mb-2">
              ★★★★★
            </p>

            <p>
              Would definitely book again.
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Emily
            </h3>

            <p className="text-gray-500 mb-2">
              ★★★★★
            </p>

            <p>
              One of the nicest Airbnb stays I've had.
            </p>

          </div>

        </div>

      </section>

      {/* Map Placeholder */}

      <section className="mt-20 border-t pt-12">

        <h2 className="text-3xl font-semibold mb-6">
          Where you'll be
        </h2>

        <div className="bg-gray-100 rounded-3xl h-80 flex items-center justify-center">

          <p className="text-gray-500 text-xl">
            📍 {listing.location}
          </p>

        </div>

      </section>

    </main>
  );
}