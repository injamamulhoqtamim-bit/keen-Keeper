import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaArchive,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import NotFound from "./NotFound";

const getStatusStyle = (status) => {
  if (status === "overdue") return "bg-red-100 text-red-600";
  if (status === "almost due") return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-700";
};

export default function FriendDetails() {
  const { id } = useParams();

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === Number(id));
        setFriend(found);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load data");
        setLoading(false);
      });
  }, [id]);

  // ✅ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-[#1f4d3a] rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!friend) {
    return <NotFound />;
  }

  const addToTimeline = (type) => {
    const newEntry = {
      id: Date.now(),
      type,
      name: friend.name,
      date: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("timeline")) || [];
    localStorage.setItem("timeline", JSON.stringify([newEntry, ...existing]));

    toast.success(`${type} with ${friend.name}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 sm:pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="space-y-4">

            <div className="bg-white rounded-xl border p-5 text-center shadow-sm">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 object-cover"
              />

              <h2 className="font-semibold text-gray-800 text-lg">
                {friend.name}
              </h2>

              <span className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${getStatusStyle(friend.status)}`}>
                {friend.status}
              </span>

              <div className="flex justify-center gap-2 flex-wrap mt-3">
                {friend.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-green-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">
                "{friend.bio}"
              </p>

              <p className="text-xs text-gray-400 mt-1 break-all">
                {friend.email}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-white border rounded-xl py-3 text-sm hover:bg-gray-50">
                <FaBell /> Snooze
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-white border rounded-xl py-3 text-sm hover:bg-gray-50">
                <FaArchive /> Archive
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-white border rounded-xl py-3 text-sm text-red-500 hover:bg-red-50">
                <FaTrash /> Delete
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-white p-4 rounded-xl border text-center">
                <h2 className="text-2xl font-bold text-[#1f4d3a]">
                  {friend.days_since_contact}
                </h2>
                <p className="text-xs text-gray-500">Days Since</p>
              </div>

              <div className="bg-white p-4 rounded-xl border text-center">
                <h2 className="text-2xl font-bold text-[#1f4d3a]">
                  {friend.goal}
                </h2>
                <p className="text-xs text-gray-500">Goal</p>
              </div>

              <div className="bg-white p-4 rounded-xl border text-center">
                <h2 className="text-lg font-bold text-[#1f4d3a]">
                  {friend.next_due_date}
                </h2>
                <p className="text-xs text-gray-500">Next Due</p>
              </div>

            </div>

            {/* QUICK ACTION */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="mb-4 font-semibold text-gray-800">
                Quick Check-In
              </h3>

              <div className="grid grid-cols-3 gap-3">

                {["Call", "Text", "Video"].map((type) => (
                  <div
                    key={type}
                    onClick={() => addToTimeline(type)}
                    className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 cursor-pointer transition"
                  >
                    <p className="text-sm text-gray-700">{type}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}