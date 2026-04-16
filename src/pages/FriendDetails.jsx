import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaArchive,
  FaTrash,
  FaPhoneAlt,
  FaCommentDots,
  FaVideo,
} from "react-icons/fa";
import toast from "react-hot-toast";

const getStatusStyle = (status) => {
  if (status === "overdue") return "bg-red-100 text-red-600";
  if (status === "almost due") return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-700";
};

export default function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === Number(id));
        setFriend(found);
      })
      .catch(() => toast.error("Failed to load data"));
  }, [id]);

  const addToTimeline = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type,
      name: friend.name,
      date: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("timeline")) || [];
    const updated = [newEntry, ...existing];

    localStorage.setItem("timeline", JSON.stringify(updated));

    // ✅ UPDATED TOAST MESSAGE
    toast.success(`${type} with ${friend.name}`, {
      duration: 2000,
    });
  };

  if (!friend) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#1f4d3a] rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-500 text-sm sm:text-base">
          Loading friend details...
        </p>

      </div>

    </div>
  );
}

  return (
    <div className="bg-white-100 min-h-screen pt-20 sm:pt-24 pb-10 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-4">

          {/* PROFILE CARD */}
          <div className="bg-white rounded-xl border p-5 sm:p-6 text-center shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3"
            />

            <h2 className="font-semibold text-gray-800 text-base sm:text-lg">
              {friend.name}
            </h2>

            <span
              className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${getStatusStyle(
                friend.status
              )}`}
            >
              {friend.status}
            </span>

            <div className="flex justify-center gap-2 flex-wrap mt-3">
              {friend.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4 italic px-2">
              "{friend.bio}"
            </p>

            <p className="text-xs text-gray-400 mt-1 break-all">
              Preferred: {friend.email}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-3 sm:py-4 text-sm sm:text-base hover:bg-gray-50 transition">
              <FaBell /> Snooze 2 Weeks
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-3 sm:py-4 text-sm sm:text-base hover:bg-gray-50 transition">
              <FaArchive /> Archive
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-3 sm:py-4 text-sm sm:text-base text-red-500 hover:bg-red-50 transition">
              <FaTrash /> Delete
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* TOP STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white p-4 sm:p-5 rounded-xl border text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1f4d3a]">
                {friend.days_since_contact}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Days Since Contact
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1f4d3a]">
                {friend.goal}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Goal (Days)
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border text-center shadow-sm">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1f4d3a]">
                {friend.next_due_date}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Next Due
              </p>
            </div>

          </div>

          {/* RELATIONSHIP GOAL */}
          <div className="bg-white rounded-xl border p-5 sm:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Relationship Goal
              </h3>

              <button className="text-xs border px-3 py-1 rounded hover:bg-gray-50">
                Edit
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Connect every <b>{friend.goal} days</b>
            </p>
          </div>

          {/* QUICK CHECK-IN */}
          <div className="bg-white rounded-xl border p-5 sm:p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-800 text-sm sm:text-base">
              Quick Check-In
            </h3>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">

              <div
                onClick={() => addToTimeline("Call")}
                className="bg-gray-100 p-4 sm:p-5 rounded-lg hover:bg-gray-200 cursor-pointer transition"
              >
                <FaPhoneAlt className="mx-auto mb-2 text-gray-500 text-lg sm:text-xl" />
                <p className="text-xs sm:text-sm text-gray-700">Call</p>
              </div>

              <div
                onClick={() => addToTimeline("Text")}
                className="bg-gray-100 p-4 sm:p-5 rounded-lg hover:bg-gray-200 cursor-pointer transition"
              >
                <FaCommentDots className="mx-auto mb-2 text-gray-500 text-lg sm:text-xl" />
                <p className="text-xs sm:text-sm text-gray-700">Text</p>
              </div>

              <div
                onClick={() => addToTimeline("Video")}
                className="bg-gray-100 p-4 sm:p-5 rounded-lg hover:bg-gray-200 cursor-pointer transition"
              >
                <FaVideo className="mx-auto mb-2 text-gray-500 text-lg sm:text-xl" />
                <p className="text-xs sm:text-sm text-gray-700">Video</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}