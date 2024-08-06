'use client'

import { ARS, cn } from "@/utils/utils";
import { useFormStatus } from "react-dom"
import { buttonVariants } from "../ui/button";
import { LoaderCircle } from "lucide-react";

export default function ShipmentItem({ shipment, active }: { shipment: { id: number, title: string, description: string, price: number }, active: boolean }) {

  const { pending } = useFormStatus();

  return (
    <>
      {pending &&
        <div className="absolute w-full flex items-center justify-center top-0 h-full z-20">
          <LoaderCircle className="size-12 text-gray-400 animate-spin"></LoaderCircle>
        </div>
      }
      <input type="hidden" name="shipment-id" value={shipment.id} />
      <button disabled={pending} aria-disabled={pending} key={shipment.title + "key"} type="submit" className={buttonVariants({ variant: 'secondary', size: 'lg', className: cn(active ? "border-2 border-green-400" : "border-none", 'h-20 sm:h-40 w-full') })}>
        <div>
          <h4>{shipment.title}</h4>
          <p className="text-sm font-light">{ARS.format(shipment.price)}</p>
        </div>
      </button>

    </>
  )

}