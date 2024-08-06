import { ARS } from "@/utils/utils";
import { buttonVariants } from "../ui/button";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCES_TOKEN!, })

export default function PurchaseResumee({
  products_total,
  items_quantity,
  shipment_cost,
  user_email,
  disabled
}: {
  products_total: number,
  items_quantity: number,
  shipment_cost?: number,
  user_email?: string,
  disabled?: boolean,
}) {

  async function checkout(formData: FormData) {
    'use server'

    const preference = await new Preference(client).create({
      body: {
        payer: {
          email: user_email
        },
        items: [
          {
            id: 'productos',
            title: `Compra de ${formData.get('items-quantity')} productos`,
            quantity: 1,
            unit_price: Number(formData.get('products-total')),
          },
          {
            id: 'shipment',
            title: 'Envio a ${Cierto Lugar}',
            quantity: 1,
            unit_price: Number(formData.get('shipment-cost'))
          }
        ]
      },
      requestOptions: {}
    })

    redirect(preference.sandbox_init_point!)
  }
  return (<form action={checkout} className="relative w-full lg:w-96">
    <input type="hidden" value={items_quantity} name="items-quantity" />
    <input type="hidden" value={products_total} name="products-total" />
    <input type="hidden" value={shipment_cost} name="shipment-cost" />
    <div className="sticky top-20 bg-white border rounded-md pt-2 pb-4 px-4 py-2 md:px-8 w-full ">
      <h2 className="font-semibold mt-4 mb-4 pb-4 text-base md:text-lg w-full border-b">Resumen de compra</h2>
      <div className="flex justify-between mt-1 font-light">
        <p>Productos ({items_quantity})</p>
        <p>{ARS.format(products_total)}</p>
      </div>
      {shipment_cost &&
        <div className="flex justify-between mt-1 font-light">
          <p>Envio</p>
          <p>{ARS.format(shipment_cost)}</p>
        </div>
      }
      <div className="flex justify-between mt-4 pt-2 border-t text-lg">
        <p className="font-semibold">Total</p>
        <p>{ARS.format(products_total + (shipment_cost ?? 0))}</p>
      </div>
      <button className={buttonVariants({
        size: 'lg',
        className: 'w-full mt-4 bg-sky-600'
      })}
        disabled={disabled}>Continuar compra</button>
    </div>
  </form>)
}