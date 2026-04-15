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

// ✅ status style helper
const getStatusStyle = (status) => {
  if (status === "overdue") return "bg-red-100 text-red-600";
  if (status === "almost due") return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-700";
};

export default function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  // ✅ fetch data safely
  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === Number(id));
        setFriend(found || null);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load friend data");
      });
  }, [id]);

  // ✅ add to timeline (safe version)
  const addToTimeline = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type,
      name: friend.name,
      date: new Date().toLocaleDateString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("timeline")) || [];
      const updated = [newEntry, ...existing];

      localStorage.setItem("timeline", JSON.stringify(updated));

      toast.success(`${type} with ${friend.name} added!`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // ✅ loading state
  if (!friend) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          {/* Profile Card */}
          <div className="bg-white rounded-xl border p-5 text-center shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />

            <h2 className="font-semibold text-lg text-gray-800">
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
              {friend.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4 italic">
              "{friend.bio}"
            </p>

            <p className="text-xs text-gray-400 mt-1 break-all">
              Preferred: {friend.email}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-4 hover:bg-gray-50 transition">
              <FaBell /> Snooze
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-4 hover:bg-gray-50 transition">
              <FaArchive /> Archive
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-xl py-4 text-red-500 hover:bg-red-50 transition">
              <FaTrash /> Delete
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">

          {/* QUICK CHECK-IN */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-800">
              Quick Check-In
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">

              <div
                onClick={() => addToTimeline("Call")}
                className="cursor-pointer p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <FaPhoneAlt className="mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-700">Call</p>
              </div>

              <div
                onClick={() => addToTimeline("Text")}
                className="cursor-pointer p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <FaCommentDots className="mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-700">Text</p>
              </div>

              <div
                onClick={() => addToTimeline("Video")}
                className="cursor-pointer p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <FaVideo className="mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-700">Video</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}