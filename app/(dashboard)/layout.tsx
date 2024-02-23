import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { PropsWithChildren } from "react";

const links = [
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];
const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 border-r border-black/10 md:w-1/5 lg:w-1/6">
        <div className="mx-2 my-2 text-xl">JournalAI</div>
        <ul>
          {links.map((link) => (
            <li key={link.label} className="mx-2 my-2 text-lg">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b border-black/10 md:h-20">
          <div className="flex h-full w-full items-center justify-end px-6 py-4">
            <UserButton />
          </div>
        </header>
        <div className="flex-1  p-4 md:p-8 lg:p-12">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
