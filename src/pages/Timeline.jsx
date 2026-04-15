import { useEffect, useState } from "react";
import { FaPhoneAlt, FaCommentDots, FaVideo } from "react-icons/fa";

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(data);
  }, []);

  const getIcon = (type) => {
    if (type === "Call") return <FaPhoneAlt />;
    if (type === "Text") return <FaCommentDots />;
    if (type === "Video") return <FaVideo />;
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Timeline</h1>

        {timeline.length === 0 ? (
          <p className="text-gray-500">No activity yet</p>
        ) : (
          <div className="space-y-4">
            {timeline.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg flex gap-4 items-center shadow-sm"
              >
                <div className="text-lg text-gray-500">
                  {getIcon(item.type)}
                </div>

                <div>
                  <p className="font-medium">
                    {item.type} with {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.date}
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