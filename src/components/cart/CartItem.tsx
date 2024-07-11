'use client'

import { productInCart } from "@/lib/types";
import { buttonVariants } from "../ui/button";
import { ARS, cn } from "@/utils/utils";
import { LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";
import { matchColor, matchDefinition, matchMaterial } from "@/lib/variants";
import { AddOne, RemoveOne, deleteCartItem } from "@/app/(shop)/cart/actions";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function CartItem({ product }: { product: productInCart }) {

  let unity_price = product?.products.base_price
  const color = matchColor(product?.color);

  if (color) unity_price *= color.price
  const material = matchMaterial(product?.plastic);
  if (material) unity_price *= material.cost
  const definition = matchDefinition(product?.definition);
  if (definition) unity_price *= definition.cost

  const { pending } = useFormStatus();

  return (
    <div className={cn(pending ? "opacity-60 text-muted" : "", "relative flex w-full")}>
      {pending &&
        <div className="absolute w-full flex  items-center justify-center top-0 h-full z-20">
          <LoaderCircle className="size-12 text-gray-400 animate-spin"></LoaderCircle>
        </div>
      }
      <input type="text" className="sr-only hidden" name="order_id" defaultValue={product?.id} />
      <div>
        <img src={product?.products.images[0]} alt="" className="size-36" />
      </div>
      <div className="ml-4 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <Link href={routes.tienda.productos + '/' + product.products.slug} className="capitalize font-semibold hover:underline hover:scale-105 transition-transform text-lg md:text-xl">
            <h4>{product?.products.title}</h4>
          </Link>
          <p className=" text-gray-400 font-light">{ARS.format(unity_price)}</p>
        </div>
        <div className="flex text-sm py-2 text-gray-500 leading-[1.2]">
          {color && <p className="inline-block w-20 md:w-32">Color: <span className="font-medium block lg:inline-block text-black">{color?.name}</span></p>}
          {material && <p className="inline-block w-20 md:w-32">Material: <span className="font-medium block lg:inline-block text-black">{material?.name}</span></p>}
          {definition && <p className="inline-block w- md:w-fit">Definicion: <span className="font-medium block lg:inline-block text-black">{product?.definition}</span></p>}
        </div>
        <div className="flex flex-1 justify-between items-end mt-2 w-full">
          <button disabled={pending} aria-disabled={pending} formAction={deleteCartItem} className={buttonVariants({
            size: 'sm',
            variant: 'outline',
            className: 'hover:bg-red-500 hover:stroke-white hover:text-white mr-4'
          })}>
            <Trash2 className="size-4 md:mr-4" />
            <span className="hidden md:inline-block">Quitar</span>
          </button>
          <div className="flex items-center">
            <div className="flex gap-1">
              <button aria-disabled={pending} formAction={RemoveOne} className="size-7 md:size-8 rounded-sm flex items-center justify-center bg-gray-200 disabled:opacity-20"
                disabled={product?.quantity <= 1 || pending}>
                <Minus className="size-2 md:size-4" />
              </button>
              <input name="quantity" type="number" className="rounded-sm appearance-none size-7 md:size-8 text-center text-xs md:text-sm border" value={product?.quantity} min={1} max={20} required readOnly />
              <button aria-disabled={pending} formAction={AddOne} className="size-7 md:size-8 rounded-sm flex items-center justify-center bg-gray-200">
                <Plus className="size-2 md:size-4" />
              </button>
            </div>
            <p className="font-medium md:text-lg pl-2 md:pl-4">{ARS.format(unity_price * product.quantity)}</p>
          </div>
        </div>
      </div>
    </div>)
}