'use client'

import { ARS, cn } from "@/utils/utils"
import { LoaderCircle, Minus, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"
import { buttonVariants } from "./ui/button"
import { matchColors, matchMaterials } from '@/lib/variants'
import { addToCart, directCheckout } from "@/app/(shop)/tienda/p/[slug]/actions"
import { routes } from "@/lib/routes"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "sonner"

const initialState = {
  errors: {
    color: undefined,
    plastic: undefined,
  },
  success: false,
}

export const ProductDisplay = ({ product, user_id }: { product: any, user_id: string | undefined }) => {

  const availableColors = matchColors(product.variants.colors)
  const availableMaterials = matchMaterials(product.variants.materials)

  const [quantity, setQuantity] = useState<number>(1)
  const [currentColor, setCurrentColor] = useState<string>("")
  const [currentMaterial, setCurrentMaterial] = useState<string>("")
  const [price, setPrice] = useState<number>(product.base_price)
  const { pending } = useFormStatus();

  const [addToCartState, addToCartFormAction] = useFormState(addToCart, initialState)
  const [directCheckoutState, directCheckoutFormAction] = useFormState(directCheckout, initialState)


  useEffect(() => {
    if (addToCartState.success) {
      toast.success("Producto agregado al carrito!")
    }
  }, [addToCartState, toast]);

  return (<>
    <h1 className="relative w-fit tracking-normal text-3xl lg:text-4xl text-balance font-medium !leading-tight text-gray-900">
      {product.title}
    </h1>
    <p className="font-light text-3xl">{ARS.format(product.base_price)}</p>
    <input className="sr-only hidden" readOnly name="product_id" value={product.id} />
    <input className="sr-only hidden" readOnly name="user_id" value={user_id} />
    {
      availableColors &&
      <div className="flex flex-col my-6 w-full">
        <label htmlFor="materiales" className="mb-1">Color: <span className="inline-block ml-1 font-semibold">{currentColor}</span></label>
        <ColorPickerList>
          {availableColors.map((color, index) => (
            <div key={"color" + index} className="size-10">
              <input
                className="hidden"
                onChange={() => setCurrentColor(color.name)}
                name="color"
                id={color.name}
                type="radio"
                defaultValue={color.id}
              />
              <label htmlFor={color.name} className={cn(
                'flex items-center justify-start p-1 size-full border rounded-full',
                currentColor === color.name ? "border-green-700 bg-zinc-50 border-2" : " hover:border-gray-400 hover:bg-gray-100",
              )}>
                <div className={cn("size-full rounded-full border-2 p-1", color.colorCode)}></div>
              </label >
            </div>
          ))}
        </ColorPickerList>
        <p aria-live="polite" className="text-xs text-red-700 mt-1">
          {addToCartState?.errors.color || directCheckoutState?.errors.color}
        </p>
      </div>
    }
    {
      product.variants.materials &&
      <div className="flex flex-col my-6 w-full">
        <label htmlFor="materiales" className="mb-1">Material: <span className="inline-block ml-1 font-semibold">{currentMaterial}</span></label>
        <MaterialPickerList>
          {availableMaterials.map((material, index) => (
            <div key={'material' + index} className="h-10 w-full">
              <input
                className="hidden"
                onChange={() => {
                  setCurrentMaterial(material.name)
                  setPrice(product.base_price * material.cost)
                }}
                name="material"
                id={material.name}
                type="radio"
                defaultValue={material.id}
              />
              <label htmlFor={material.name} className={cn(
                'flex items-center justify-between p-1 size-full border rounded-md px-4 font-medium',
                currentMaterial === material.name ? "border-green-700 bg-zinc-50 border-2" : " hover:border-gray-400 hover:bg-zinc-50",
              )}>
                {material.name}
                <p className="text-gray-900/60 font-light">{"+ " + ARS.format(material.cost * product.base_price - product.base_price)}</p>
              </label >
            </div>
          ))}
        </MaterialPickerList>
        <p aria-live="polite" className="text-xs text-red-700 mt-1">
          {addToCartState?.errors.plastic || directCheckoutState?.errors.plastic}
        </p>
      </div>
    }
    <div className="mt-4 mb-4 flex justify-between items-end">
      <div>
        <label htmlFor="quantity" className="mb-2 text-sm">Cantidad:</label>
        <div className="flex gap-1">
          <button
            onClick={() => setQuantity((prev) => (prev - 1))}
            type="button"
            className="size-8 rounded-sm flex items-center justify-center bg-gray-200"
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </button>
          <input id="quantity" name="quantity" type="number" className="rounded-sm appearance-none h-8 w-8 text-center text-sm border" value={quantity} min={1} max={20} readOnly />
          <button
            onClick={() => setQuantity((prev) => (prev + 1))}
            type="button"
            className="size-8 rounded-sm flex items-center justify-center bg-gray-200"
            disabled={quantity > 20}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
      <div>
        <h4 className="text-sm block w-32">Total:</h4>
        <p className="text-lg font-medium">{ARS.format(price * quantity)}</p>
      </div>
    </div>
    {
      user_id ?
        <button className={buttonVariants({
          size: 'lg',
          variant: "outline",
          className: 'w-full mb-2',
        })}
          formAction={addToCartFormAction}
          type="submit"
          disabled={pending}
          aria-disabled={pending}
        >
          {!pending ? "Agregar al carrito" : <LoaderCircle className="animate-spin"></LoaderCircle>}
        </button>
        :
        <p className="text-center text-xs text-gray-600 my-4 text-pretty">
          <a href={routes.auth.login + `?from=tienda/p/${product.slug}`} className="text-sky-600">Inicia Sesion </a>
          para armar tu carrito y accede a beneficios!</p>
    }
    <button
      formAction={directCheckoutFormAction}
      className={buttonVariants({
        size: 'lg',
        className: 'w-full bg-sky-600',
      })}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {!pending ? "Comprar" : <LoaderCircle className="animate-spin"></LoaderCircle>}
    </button>
  </>
  )
}

export const ColorPickerList = ({ children }: { children: React.ReactNode }) => {
  return (
    <fieldset id="colores" className="w-full flex gap-2">
      {children}
    </fieldset>
  )
}

export const MaterialPickerList = ({ children }: { children: React.ReactNode }) => {
  return (
    <fieldset id="materiales" className="w-full flex flex-col gap-2">
      {children}
    </fieldset>
  )
}
