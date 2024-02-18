import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { PropsWithChildren } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];
const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[200px] border-r border-black/10">
        <div className="mx-2 my-2 text-xl">JournalAI</div>
        <ul>
          {links.map((link) => (
            <li key={link.label} className="mx-2 my-2 text-lg">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex h-full flex-1 flex-col">
        <header className="h-[60px] border-b border-black/10">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <div className="h-full flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
