import Link from "next/link"
import React from "react"
import { routes } from "@/lib/routes"
import { Sparkles, Speaker } from "lucide-react"


export default function AdminNav({ }) {
  return (
    <aside>
      <nav className="flex flex-col h-full w-48 items-center justify-center bg-sky-600">
        <ul className="w-full flex flex-col">

          <NavItem href={routes.admin.dashboard}>
            <Sparkles className="size-6 mr-2 stroke-2" />
            <p className="text-medium">Dashboard</p>
          </NavItem>
          <NavItem href={routes.admin.products}>
            <Speaker className="size-6 mr-2 stroke-2" />
            <p className="text-medium">Products</p>
          </NavItem>

        </ul>
      </nav>
    </aside>
  )
}

const NavItem = ({ children, href }: { children: React.ReactNode, href: string }) => {
  return (
    <li className="w-full text-white ">
      <Link href={href} className="w-full h-12 flex items-center pl-8 hover:bg-sky-500">
        {children}
      </Link>
    </li>
  )
} 