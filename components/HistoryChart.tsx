"use client";
import { Analysis } from "@prisma/client";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  Tooltip,
  LineChart,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const CustomToolTip = ({
  payload,
  label,
  active,
}: {
  payload?: any;
  label?: Date;
  active?: boolean;
}) => {
  if (active && label && payload !== undefined) {
    const dateLabel = new Date(label).toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const analysis = payload[0].payload as Pick<Analysis, keyof Analysis> & {
      formattedDate: string;
    };
    return (
      <div className="custom-tooltip relative rounded-lg border border-black/10 bg-white/5 p-8 shadow-md backdrop-blur-md">
        <div
          className="absolute left-2 top-2 h-2 w-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
        <p className="label text-sm text-black/30">{analysis.subject}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }: { data: Analysis[] }) => {
  const formattedData = data.map((dataset) => {
    return {
      ...dataset,
      formattedDate: new Date(dataset.createdAt).toLocaleDateString("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    };
  });

  return (
    <ResponsiveContainer>
      <LineChart width={300} height={100} data={formattedData}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formattedDate" />
        <YAxis />
        <ReferenceLine y={0} label="Neutral" stroke="lime" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
