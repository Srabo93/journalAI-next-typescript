import MoodChart from "@/components/history/MoodChart";
import MoodTrackingChart from "@/components/history/MoodTrackingChart";
import SentimentChart from "@/components/history/SentimentChart";
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
    <>
      <div className="h-96 w-full">
        <h2 className="py-3 text-2xl font-semibold">{`Avg. Sentiment: ${analysis?.avg}`}</h2>
        <SentimentChart data={analysis?.analysis} />
      </div>
      <div className="h-96 w-full">
        <h2 className="py-3 text-2xl font-semibold">Mood Analysis</h2>
        <MoodChart data={analysis?.analysis} />
      </div>
      <div className="h-96 w-full">
        <h2 className="py-3 text-2xl font-semibold">Mood Tracking</h2>
        <MoodTrackingChart data={analysis?.analysis} />
      </div>
    </>
  );
};

export default History;
