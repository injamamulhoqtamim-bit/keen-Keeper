import { useEffect, useState } from "react";
import { FaPhoneAlt, FaCommentDots, FaVideo } from "react-icons/fa";

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(data);
  }, []);

  // ✅ Icon handler
  const getIcon = (type) => {
    if (type === "Call") return <FaPhoneAlt />;
    if (type === "Text") return <FaCommentDots />;
    if (type === "Video") return <FaVideo />;
  };

  // ✅ Date format (March 29, 2026)
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // ✅ Filter logic
  const filteredTimeline =
    filter === "All"
      ? timeline
      : timeline.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 px-3 sm:px-6 bg-white-100">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Timeline
        </h1>

        {/* ✅ FILTER DROPDOWN */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-64 bg-white border rounded-lg px-4 py-3 text-sm text-gray-600 shadow-sm focus:outline-none"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>

        {/* EMPTY STATE */}
        {filteredTimeline.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No activity found
          </p>
        ) : (
          <div className="space-y-3 sm:space-y-4">

            {filteredTimeline.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-xl flex gap-3 sm:gap-4 items-center shadow-sm border hover:shadow-md transition"
              >
                {/* ICON */}
                <div className="text-lg sm:text-xl text-gray-500">
                  {getIcon(item.type)}
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-00">
                    {item.type} with{" "}
                    <span className="text-gray-400">
                      {item.name}
                    </span>
                  </p>

                  <p className="text-sm text-gray-800 mt-1">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}