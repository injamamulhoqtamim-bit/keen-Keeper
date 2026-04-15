import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  if (status === "overdue") return "bg-red-100 text-red-600";
  if (status === "almost due") return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-700";
};

export default function FriendsGrid() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading friends...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 mt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Your Friends
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {friends.map((friend) => (
          
          // 🔥 IMPORTANT: wrap with Link
          <Link
            to={`/friend/${friend.id}`}
            key={friend.id}
            className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition"
          >
            {/* Profile */}
            <img
              src={friend.picture}
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />

            {/* Name */}
            <h3 className="font-semibold text-gray-800">
              {friend.name}
            </h3>

            {/* Days */}
            <p className="text-xs text-gray-400 mb-2">
              {friend.days_since_contact}d ago
            </p>

            {/* Tags */}
            <div className="flex justify-center gap-2 flex-wrap mb-2">
              {friend.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Status */}
            <span
              className={`text-[10px] px-3 py-1 rounded-full ${getStatusStyle(
                friend.status
              )}`}
            >
              {friend.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}