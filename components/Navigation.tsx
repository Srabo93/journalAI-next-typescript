"use client";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const links = [
    { href: "/journal", label: "Journal" },
    { href: "/history", label: "History" },
  ];
  return (
    <NavigationMenu
      className="flex max-w-full flex-col place-items-end"
      style={{ alignItems: "flex-start" }}
    >
      <NavigationMenuList className="flex flex-col">
        {links.map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl font-normal`}
              >
                {link.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
