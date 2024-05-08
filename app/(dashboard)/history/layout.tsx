import { PropsWithChildren } from "react";

const HistoryLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full flex-col space-y-20">{children}</div>
  );
};

export default HistoryLayout;
