"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const NavigationMobile = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/journal", label: "Journal" },
    { href: "/history", label: "History" },
  ];
  return (
    <div className="
       md:hidden
      ">
      {!open && (
        <RxHamburgerMenu
          size="2em"
          title="open menu"
          onClick={() => setOpen(true)}
        />
      )}
      {open && (
        <div className="flex flex-col items-start justify-center">
          <RxCross1
            size="2em"
            title="open menu"
            onClick={() => setOpen(false)}
          />
          <NavigationMenu>
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
        </div>
      )}
    </div>
  );
};

export default NavigationMobile;
