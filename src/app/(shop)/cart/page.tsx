import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/lib/Icons";
import { routes } from "@/lib/routes";
import { createClient } from "@/utils/supabase/server";
import { ARS } from "@/utils/utils";

import { Minus, Plus, ShoppingBasket, ShoppingCart, Trash2, Truck } from "lucide-react";
import Link from "next/link";

const supabase = createClient()

export default async function CartPage() {

  const { data: productsInCart, error } = await supabase.from("cart").select('id, products ( title, slug, images, base_price ), color, plastic, size, definition, quantity')
  console.log(productsInCart, error);


  return (
    <div className="bg-white flex-1">
      <p className="relative w-full text-center tracking-tight text-balance py-4 md:py-8 font-bold !leading-tight bg-gradient-to-br from-sky-600/90 to-sky-700 text-slate-100 text-lg sm:text-2xl md:text-3xl lg:text-4xl">Estas a un paso de llevarte eso que elegiste!
        <Icons.arrow className="absolute ml-4 top-2 hidden sm:inline-block md:top-8 size-12 md:size-16 rotate-[60deg] stroke-slate-100" />
      </p>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-4 pt-4 lg:flex-row pb-10">
          {/* Section with products */}
          <div className="rounded-md flex-1 h-[900px] py-2 md:px-4">
            <section>
              <h1 className="font-semibold mt-4 mb-4 pb-4 text-xl w-full border-b flex items-center leading-none">
                <ShoppingCart className="inline-block size-6 mr-2" />
                Tu Carrito
              </h1>
              <ul className="w-full sm:px-4 ">
                {productsInCart?.map((producto, index) => (
                  <li key={index} className="w-full flex py-4">
                    <div>
                      <img src={producto.products.images[0]} alt="" className="size-36" />
                    </div>
                    <div className="ml-4 flex flex-col flex-1">
                      <div className="flex flex-col md:flex-row justify-between">
                        <h4 className="capitalize font-semibold text-lg md:text-xl">{producto.products.title}</h4>
                        <p className=" text-gray-500 font-light">{ARS.format(producto.products.base_price)}</p>
                      </div>
                      <div className="flex text-sm py-2 text-gray-500 leading-[1.2]">
                        <p className="inline-block w-20 md:w-32">Color: <span className="font-medium block lg:inline-block text-black">{producto.color}</span></p>
                        <p className="inline-block w-20 md:w-32">Material: <span className="font-medium block lg:inline-block text-black">{producto.plastic}</span></p>
                        <p className="inline-block w- md:w-fit">Definicion: <span className="font-medium block lg:inline-block text-black">{producto.definition}</span></p>
                      </div>
                      <div className="flex flex-1 justify-between items-end mt-2 w-full">
                        <button type="button" className={buttonVariants({
                          size: 'sm',
                          variant: 'outline',
                          className: 'hover:bg-red-500 hover:stroke-white hover:text-white mr-4 '
                        })}>
                          <Trash2 className="size-4 md:mr-4" />
                          <span className="hidden md:inline-block">Quitar</span>
                        </button>
                        <div className="flex items-center">
                          <QuantityPicker
                            currentValue={producto.quantity}
                          />
                          <p className="font-medium pl-2 md:pl-4">{ARS.format(producto.unity_price * producto.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold mt-4 mb-4 pb-4 text-xl w-full border-b flex items-center leading-none">
                <Truck className="inline-block size-6 mr-2" />
                Envio
              </h2>
            </section>
          </div>

          {/* Section to calculate total */}
          <section className="relative w-full lg:w-96">
            <div className="sticky top-16 bg-white border rounded-md pt-2 pb-4 px-4 w-full ">
              <h2 className="font-semibold mt-4 mb-4 pb-4 text-base w-full border-b">Resumen de compra</h2>
              <div className="flex justify-between mt-1 font-light">
                <p>Productos (2)</p>
                <p>{ARS.format(26254)}</p>
              </div>
              <div className="flex justify-between mt-1 font-light">
                <p>Envio</p>
                <p>{ARS.format(4876)}</p>
              </div>
              <div className="flex justify-between mt-4 pt-2 border-t text-lg">
                <p className="font-semibold">Total</p>
                <p>{ARS.format(4876 + 26254)}</p>
              </div>
              <Link href={routes.checkout} className={buttonVariants({
                size: 'lg',
                className: 'mt-4 w-full mb-2 text-xl py-7 bg-sky-600'
              })}>Continuar compra</Link>
            </div>
          </section>
        </div>
      </MaxWidthWrapper >
    </div >
  )
}

export const QuantityPicker = ({ currentValue, onMinus, onPlus }: { currentValue: number, onMinus?: () => any, onPlus?: () => any }) => {

  return (
    <>
      <div className="flex gap-1">
        <button onClick={onMinus} className="size-7 md:size-8 rounded-sm flex items-center justify-center bg-gray-200 disabled:opacity-20"
          disabled={currentValue <= 1}>
          <Minus className="size-2 md:size-4" />
        </button>
        <input name="cantidad" type="number" className="rounded-sm appearance-none size-7 md:size-8 text-center text-xs md:text-sm border" value={currentValue} min={1} max={20} required readOnly />
        <button onClick={onPlus} className="size-7 md:size-8 rounded-sm flex items-center justify-center bg-gray-200">
          <Plus className="size-2 md:size-4" />
        </button>
      </div>
    </>
  )
}
