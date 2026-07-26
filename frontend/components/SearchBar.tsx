"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;

  propertyType: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;

  amenity: string;
  setAmenity: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  search,
  setSearch,
  maxPrice,
  setMaxPrice,
  propertyType,
  setPropertyType,
  amenity,
  setAmenity,
}: Props) {
  const [date, setDate] = useState("");

  return (
    <div className="bg-white border-b border-gray-200 pb-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-full shadow-xl border border-gray-200 flex items-center overflow-hidden">

          {/* WHERE */}

          <div className="flex-1 px-8 py-4 hover:bg-gray-100 rounded-l-full transition">

            <p className="text-xs font-bold text-gray-900">
              Where
            </p>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations"
              className="w-full bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
            />

          </div>

          <div className="h-10 w-px bg-gray-300"></div>

          {/* MAX PRICE */}

          <div className="flex-1 px-8 py-4 hover:bg-gray-100 transition">

            <p className="text-xs font-bold">
              Max Price
            </p>

            <input
              type="number"
              placeholder="₹5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
            />

          </div>

          <div className="h-10 w-px bg-gray-300"></div>

          {/* PROPERTY TYPE */}

          <div className="flex-1 px-8 py-4 hover:bg-gray-100 transition">

            <p className="text-xs font-bold">
              Property
            </p>

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-600 bg-transparent"
            >
              <option value="">All</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>

          </div>
          {/* Amenities */}

          <div className="mt-4 flex justify-center">

            <select
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">All Amenities</option>
              <option value="Wifi">Wifi</option>
              <option value="Pool">Pool</option>
              <option value="Parking">Parking</option>
              <option value="Fireplace">Fireplace</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Air Conditioning">Air Conditioning</option>
            </select>

          </div>

          {/* SEARCH BUTTON */}

          <button className="bg-rose-500 hover:bg-rose-600 transition text-white rounded-full p-5 mr-3">

            <FaSearch size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}