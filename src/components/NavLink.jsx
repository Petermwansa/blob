'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


function NavLink({ label, href}) {
    const pathname = usePathname();
  return (
    <Link
      className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
}

export default NavLink;
