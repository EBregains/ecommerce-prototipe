import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Icons } from "@/lib/Icons";
import { createClient } from "@/utils/supabase/server";
import { ShoppingBasket, ShoppingCart, Truck } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { productInCart } from "@/lib/types";
import PurchaseResumee from "@/components/cart/PurchaseResumee";
import { routes } from "@/lib/routes";
import { buttonVariants } from "@/components/ui/button";

const supabase = createClient()

export default async function CartPage() {

  //@ts-ignore
  const { data: productsInCart, error } = await supabase.from("cart").select('id, products ( title, slug, images, base_price ), color, plastic, size, definition, quantity').order('added_at', { ascending: true }) as { data: productInCart[], error: any }

  let items_quantity: number = 0;
  for (let index = 0; index < productsInCart.length; index++) {
    items_quantity += productsInCart[index].quantity;
  }

  return (
    <div className="flex-1 bg-white">
      {/* < p className="relative w-full text-center tracking-tight text-balance py-4 md:py-8 font-bold !leading-tight bg-gradient-to-br from-sky-600/90 to-sky-700 text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl" > Estas a un paso de llevarte eso que elegiste!
        < Icons.arrow className="absolute ml-4 top-2 hidden sm:inline-block md:top-8 size-12 md:size-16 rotate-[60deg] stroke-white" />
      </p > */}
      <MaxWidthWrapper>
        <div className="flex flex-col gap-4 pt-4 lg:flex-row pb-10">
          {/* Section with products */}
          <div className="rounded-md flex-1 h-[900px] py-2 md:px-8 md:py-4 bg-white">
            <section>
              <h1 className="font-semibold mt-4 mb-4 pb-4 text-xl w-full border-b flex items-center leading-none">
                <ShoppingCart className="inline-block size-6 mr-2" />
                Tu Carrito
              </h1>
              <ul className="w-full sm:px-4">
                {productsInCart.length > 0 ?
                  productsInCart?.map((producto, index) => (
                    <li key={index} className="w-full flex py-4">
                      <CartItem product={productsInCart[index]} />
                    </li>
                  )) :
                  <div className="w-full text-center sm:py-8 text-gray-500 flex items-center flex-col">
                    <ShoppingBasket className="text-gray-400 stroke-1 pb-2 size-32"></ShoppingBasket>
                    <p className="pb-3">Oops.... Tu carrito esta vacio!</p>
                    <a href={routes.tienda.home} className={buttonVariants({ size: 'lg', className: 'bg-sky-600' })}> Encuentra productos</a>
                  </div>
                }
              </ul>
            </section>
            {productsInCart.length > 0 &&
              <section>
                <h2 className="font-semibold mt-4 mb-4 pb-4 text-xl w-full border-b flex items-center leading-none">
                  <Truck className="inline-block size-6 mr-2" />
                  Envio
                </h2>
              </section>
            }
          </div>

          {/* Section to calculate total */}
          <PurchaseResumee
            products_total={1000}
            items_quantity={items_quantity}
            shipment_cost={6000}
          />
        </div>
      </MaxWidthWrapper >
    </div >
  )
}