import HistoryChart from "./HistoryChart";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { Prisma } from "@prisma/client";

const getData = async () => {
  const user = await getUserByClerkID();

  if (!user) return;

  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    } as Prisma.AnalysisWhereInput,
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analysis.reduce(
    (all, current) => all + current.sentimentScore,
    0,
  );
  const avg = Math.round(sum / analysis.length);

  return { analysis, avg };
};

const History = async () => {
  const analysis = await getData();

  if (!analysis) return;

  return (
    <div className="h-full w-full">
      <div>{`Avg. Sentiment ${analysis?.avg}`}</div>
      <div className="h-4/6 w-4/6">
        <HistoryChart data={analysis?.analysis} />
      </div>
    </div>
  );
};

export default History;
