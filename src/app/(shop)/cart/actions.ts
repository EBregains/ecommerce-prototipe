'use server'

import { createClient } from "@/utils/supabase/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { revalidatePath } from "next/cache";

const ACCESS_TOKEN = process.env.MP_ACCES_TOKEN ?? ""

export async function OnSubmit(formData: FormData) {

  console.log(formData);

  // callback llamado al hacer clic en el botón enviar datos
  const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });

  const preference = new Preference(client);

  // preference.create({
  //   // body: { }
  // }).then(console.log).catch(console.log);
}

export async function deleteCartItem(formData: FormData) {

  const item_id = formData.get('order_id')
  const supabase = createClient();
  console.log(item_id);


  const response = await supabase.from('cart').delete().eq('id', item_id)

  console.log(response);

  revalidatePath('/cart', 'page')
}

export async function RemoveOne(formData: FormData) {

  const item_id = formData.get('order_id')
  const quantity = Number(formData.get('quantity'))
  const supabase = createClient();

  const { error } = await supabase
    .from('cart')
    .update({ quantity: (quantity - 1) })
    .eq('id', item_id)

  revalidatePath('/cart')
}

export async function AddOne(formData: FormData) {

  const item_id = formData.get('order_id')
  const quantity = Number(formData.get('quantity'))
  const supabase = createClient();

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: (quantity + 1) })
    .eq('id', item_id)
    .select()

  revalidatePath('/cart')
}

export async function selectShipment(formData: FormData) {

  const shipment_id = Number(formData.get('shipment-id'))

  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    data: { shipment_preference: shipment_id }
  })

  revalidatePath('/cart')
}