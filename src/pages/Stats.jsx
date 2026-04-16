import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

    const counts = { Text: 0, Call: 0, Video: 0 };

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

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          Friendship Analytics
        </h1>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">

          {/* Sub Title */}
          <h3 className="text-sm font-semibold text-green-900 mb-6">
            By Interaction Type
          </h3>

          {/* Chart */}
          <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={83}
                  outerRadius={110}
                  paddingAngle={6}
                  cornerRadius={6}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                {/* Tooltip */}
                <Tooltip />

                {/* Legend (Figma style) */}
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    paddingTop: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}