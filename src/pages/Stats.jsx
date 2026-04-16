import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

    const counts = { Call: 0, Text: 0, Video: 0 };

    timeline.forEach((item) => {
      if (counts[item.type] !== undefined) {
        counts[item.type]++;
      }
    });

    setData([
      { name: "Text", value: counts.Text },
      { name: "Call", value: counts.Call },
      { name: "Video", value: counts.Video },
    ]);
  }, []);

  const COLORS = ["#7c3aed", "#1f4d3a", "#34a853"];

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Friendship Analytics
        </h1>

        <div className="bg-white rounded-xl border p-6 shadow-sm">

          <h3 className="text-sm text-gray-600 mb-4">
            By Interaction Type
          </h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}