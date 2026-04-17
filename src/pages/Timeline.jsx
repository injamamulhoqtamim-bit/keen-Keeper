import { useEffect, useState } from "react";

// ✅ PNG icons import
import callIcon from "../assets/call.png";
import textIcon from "../assets/text.png";
import videoIcon from "../assets/video.png";

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(data);
  }, []);

  // ✅ PNG Icon handler
  const getIcon = (type) => {
    if (type === "Call") {
      return (
        <img
          src={callIcon}
          alt="Call"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      );
    }

    if (type === "Text") {
      return (
        <img
          src={textIcon}
          alt="Text"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      );
    }

    if (type === "Video") {
      return (
        <img
          src={videoIcon}
          alt="Video"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      );
    }
  };

  // ✅ Date format
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
    <div className="min-h-screen pt-20 sm:pt-24 px-3 sm:px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Timeline
        </h1>

        {/* FILTER */}
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

                {/* ICON BOX (Figma style) */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 rounded-full hover:scale-110 transition">
                  {getIcon(item.type)}
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {item.type} with{" "}
                    <span className="text-gray-500">
                      {item.name}
                    </span>
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
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