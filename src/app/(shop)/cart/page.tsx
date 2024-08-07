import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { createClient } from "@/utils/supabase/server";
import { ShoppingBasket, ShoppingCart, Truck } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { productInCart } from "@/lib/types";
import PurchaseResumee from "@/components/cart/PurchaseResumee";
import { routes } from "@/lib/routes";
import { buttonVariants } from "@/components/ui/button";
import { matchColor, matchDefinition, matchMaterial } from "@/lib/variants";
import { matchShipments, shipments } from "@/lib/shipments";
import { selectShipment } from "./actions";
import ShipmentItem from "@/components/cart/ShipmentItem";


export default async function CartPage() {

  const supabase = createClient()

  //@ts-ignore
  const { data: productsInCart, error } = await supabase.from("cart").select('id, products ( title, slug, images, base_price ), color, plastic, size, definition, quantity').order('added_at', { ascending: true }) as { data: productInCart[], error: any }

  const { data: { user } } = await supabase.auth.getUser()

  const selected_shipment = matchShipments(user?.user_metadata.shipment_preference)

  let items_quantity: number = 0;
  let total_price: number = 0
  for (let index = 0; index < productsInCart.length; index++) {
    items_quantity += productsInCart[index].quantity;

    let unity_price = productsInCart[index].products.base_price
    const color = matchColor(productsInCart[index].color);
    if (color) unity_price *= color.price
    const material = matchMaterial(productsInCart[index].plastic);
    if (material) unity_price *= material.cost
    const definition = matchDefinition(productsInCart[index].definition);
    if (definition) unity_price *= definition.cost

    total_price += unity_price * productsInCart[index].quantity
  }

  return (
    <div className="flex-1 bg-white">
      {/* < p className="relative w-full text-center tracking-tight text-balance py-4 md:py-8 font-bold !leading-tight bg-gradient-to-br from-sky-600/90 to-sky-700 text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl" > Estas a un paso de llevarte eso que elegiste!
        < Icons.arrow className="absolute ml-4 top-2 hidden sm:inline-block md:top-8 size-12 md:size-16 rotate-[60deg] stroke-white" />
      </p > */}
      <MaxWidthWrapper>
        <div className="flex flex-col gap-4 pt-4 lg:flex-row pb-10">
          {/* Section with products */}
          <div className="rounded-md flex-1 h-[900px] py-2 md:py-4 bg-white">
            <section>
              <h1 className="font-semibold mt-4 mb-4 pb-4 text-xl w-full border-b flex items-center leading-none">
                <ShoppingCart className="inline-block size-6 mr-2" />
                Tu Carrito
              </h1>
              <ul className="w-full sm:px-4">
                {productsInCart.length > 0 ?
                  productsInCart?.map((producto, index) => (
                    <li key={producto.id} className="w-full flex py-4">
                      <form className="flex w-full">
                        <CartItem product={productsInCart[index]} />
                      </form>
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
                <label className="block"> Localidad:</label>
                <div className="flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                  {
                    shipments.map((location, index) => (
                      <form key={location.title + "key" + index} action={selectShipment} className="w-full relative">
                        <ShipmentItem shipment={location} active={location.id === selected_shipment?.id} />
                      </form >
                    ))
                  }
                </div >
              </section>
            }
          </div>

          {/* Section to calculate total */}
          <PurchaseResumee
            products_total={total_price}
            items_quantity={items_quantity}
            shipment_cost={selected_shipment?.price}
            user_email={user?.email}
            disabled={selected_shipment ? false : true}
          />
        </div>
      </MaxWidthWrapper >
    </div >
  )
}