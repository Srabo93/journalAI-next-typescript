"use client";
import { Analysis } from "@prisma/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MoodChart = ({ data }: { data: Analysis[] }) => {
  const aggregateMoodData = (data: Analysis[]) => {
    return data.reduce(
      (acc: { [date: string]: { [mood: string]: number } }, entry) => {
        const dateKey = new Date(entry.createdAt).toISOString().split("T")[0];
        console.log("datekey", dateKey);

        if (!acc[dateKey]) {
          acc[dateKey] = {};
        }

        acc[dateKey][entry.mood] = (acc[dateKey][entry.mood] || 0) + 1;
        return acc;
      },
      {},
    );
  };

  const aggregatedData = aggregateMoodData(data);

  const chartData = Object.keys(aggregatedData).map((date) => {
    const moodCounts = aggregatedData[date];
    return {
      date,
      ...moodCounts,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "Moods", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        {Object.keys(chartData[0]).map((key) => {
          if (key !== "date") {
            return (
              <Bar key={key} dataKey={key} stackId="mood" fill="#8884d8" />
            );
          }
          return null;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;
