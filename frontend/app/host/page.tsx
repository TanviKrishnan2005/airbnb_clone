"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
};
type Booking = {
  id: number;
  listing_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
};

export default function HostPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadListings() {
    const res = await fetch("http://127.0.0.1:8000/listings");
    const data = await res.json();
    setListings(data);
  }

  useEffect(() => {
    loadListings();

    fetch("http://127.0.0.1:8000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  async function saveListing() {
    if (!title || !location || !price) {
      toast.error("Please fill all fields.");
      return;
    }

    const listing = {
      title,
      description: "New Listing",
      location,
      price: Number(price),
      rating: 5,
      image: "https://picsum.photos/800/600",
      amenities: "Wifi",
      property_type: "House",
      host_id: 1,
    };

    let url = "http://127.0.0.1:8000/listings";
    let method = "POST";

    if (editingId !== null) {
      url = `http://127.0.0.1:8000/listings/${editingId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });

    if (res.ok) {
      toast.success(
        editingId !== null
          ? "Listing updated successfully!"
          : "Listing added successfully!"
      );

      setTitle("");
      setLocation("");
      setPrice("");
      setEditingId(null);

      loadListings();
    }
  }

  async function deleteListing(id: number) {
    const res = await fetch(
      `http://127.0.0.1:8000/listings/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Listing deleted successfully!");
      loadListings();
    }
  }
  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          Host Dashboard
        </h1>

        {/* Add / Edit Listing */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">

          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            {editingId !== null ? "Edit Listing" : "Add New Listing"}
          </h2>

          <input
            placeholder="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <input
            type="number"
            placeholder="Price per Night"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <button
            onClick={saveListing}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl transition"
          >
            {editingId !== null ? "Update Listing" : "Add Listing"}
          </button>

        </div>

        {/* Listings */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {listings.map((listing) => (

            <div
              key={listing.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                      {listing.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      📍 {listing.location}
                    </p>

                  </div>

                  <div className="font-semibold text-gray-900">
                    ⭐ {listing.rating}
                  </div>

                </div>

                <p className="mt-5 text-2xl font-bold text-gray-900">
                  ₹{listing.price}
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    / night
                  </span>
                </p>

                <hr className="my-6" />

                <h3 className="font-semibold text-gray-900 mb-3">
                  Bookings
                </h3>

                <div className="space-y-3">

                  {bookings
                    .filter(
                      (booking) =>
                        booking.listing_id === listing.id
                    )
                    .map((booking) => (

                      <div
                        key={booking.id}
                        className="bg-gray-50 rounded-xl p-3"
                      >

                        <p className="text-sm font-medium">
                          📅 {booking.check_in} → {booking.check_out}
                        </p>

                        <p className="text-sm text-gray-500">
                          Guests: {booking.guests}
                        </p>

                        <p className="text-sm font-semibold text-rose-500">
                          ₹{booking.total_price}
                        </p>

                      </div>

                    ))}

                  {bookings.filter(
                    (booking) =>
                      booking.listing_id === listing.id
                  ).length === 0 && (

                      <p className="text-gray-400 text-sm">
                        No bookings yet.
                      </p>

                    )}

                </div>

                <div className="flex gap-3 mt-8">

                  <button
                    onClick={() => {
                      setEditingId(listing.id);
                      setTitle(listing.title);
                      setLocation(listing.location);
                      setPrice(String(listing.price));

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}