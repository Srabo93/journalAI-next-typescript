"use client";
import { Analysis } from "@prisma/client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MoodTrackingChart = ({ data }: { data: Analysis[] }) => {
  //TODO:Type this Madness
  const processedData = data.reduce((acc, entry) => {
    if (!acc[entry.subject]) {
      acc[entry.subject] = { subject: entry.subject, mood: 0 };
    }
    // Sum up the sentiment scores for each subject
    acc[entry.subject].mood += entry.sentimentScore;
    return acc;
  }, {});

  // Convert the processed data object into an array
  const chartData = Object.values(processedData);
  console.log(chartData);

  return (
    <BarChart
      width={600}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* <XAxis dataKey="subject" /> */}
      <YAxis
        label={{
          value: "Impact",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip
        formatter={(value, subject) => [
          `Subject: ${subject}`,
          `Impact: ${value}`,
        ]} // TODO: Tooltip should show the subject
      />
      <Legend />
      <Bar dataKey="mood" fill={"green"} />
    </BarChart>
  );
};

export default MoodTrackingChart;
