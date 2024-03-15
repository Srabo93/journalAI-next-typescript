import MoodChart from "@/components/history/MoodChart";
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
    <div className="flex h-full w-full flex-col">
      <h2 className="text-2xl font-semibold">{`Avg. Sentiment: ${analysis?.avg}`}</h2>
      <div className="my-5 sm:h-full sm:w-full md:h-4/6 md:w-4/6">
        <SentimentChart data={analysis?.analysis} />
      </div>
      <h2 className="text-2xl font-semibold">Mood Analysis</h2>
      <div className="mt-5 sm:h-full sm:w-full md:h-4/6 md:w-4/6">
        <MoodChart data={analysis?.analysis} />
      </div>
    </div>
  );
};

export default History;
