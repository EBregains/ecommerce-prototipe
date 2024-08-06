'use client'

import { routes } from "@/lib/routes"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { User } from "@supabase/supabase-js"
import { CrossIcon, Store, X } from "lucide-react"
import React, { useState } from "react"
import { set } from "zod"
import { buttonVariants } from "./ui/button"
import Link from "next/link"

export default function HamburgerMenu({ children }: { children: React.ReactNode; }) {

  const [isOpen, setOpen] = useState(false)

  return (
    <div className="relative flex justify-center items-center">
      <button onClick={() => setOpen(prev => (!prev))}>
        {!isOpen ?
          <HamburgerMenuIcon className=" size-8" />
          :
          <X className="animate-fade-in size-8" />
        }
      </button>
      {isOpen &&
        <ul className="absolute flex flex-col animate-fade-in -right-3 w-screen top-[44px] border-t-4 bg-white border-sky-600 h-auto shadow-lg">
          <li className="h-12 w-full">
            <Link onClick={() => setOpen(false)} href={routes.tienda.home} className="flex gap-1 size-full justify-center items-center">
              <Store className="mr-1.5 size-5"></Store>
              Tienda
            </Link>
          </li>
          {children}
        </ul>
      }

    </div>
  )
}