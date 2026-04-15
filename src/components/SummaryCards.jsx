import { useEffect, useState } from "react";

export default function SummaryCards() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  const cards = [
    { title: "Total Friends", value: friends.length },
    { title: "On Track", value: friends.filter(f => f.status === "on-track").length },
    { title: "Need Attention", value: friends.filter(f => f.status !== "on-track").length },
    { title: "Interactions This Month", value: 12 },
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 -mt-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border p-6 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {card.value}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
}