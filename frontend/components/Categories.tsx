"use client";

import {
  FaGlobeAsia,
  FaHome,
  FaUmbrellaBeach,
  FaConciergeBell,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaGlobeAsia size={28} />,
    title: "All",
  },
  {
    icon: <FaHome size={28} />,
    title: "Homes",
  },
  {
    icon: <FaUmbrellaBeach size={28} />,
    title: "Experiences",
  },
  {
    icon: <FaConciergeBell size={28} />,
    title: "Services",
  },
];

export default function Categories() {
  return (
    <div className="border-b bg-white">

      <div className="max-w-7xl mx-auto flex justify-center gap-16 py-5">

        {categories.map((item) => (

          <div
            key={item.title}
            className={`flex flex-col items-center cursor-pointer transition
            ${
              item.title === "All"
                ? "text-black border-b-2 border-black pb-2"
                : "text-gray-500 hover:text-black"
            }`}
          >

            {item.icon}

            <p className="text-sm mt-2 font-medium">
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}