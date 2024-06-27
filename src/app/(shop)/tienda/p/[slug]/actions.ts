'use server'

import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export async function addToCart(formData: FormData) {

  const productDetails = {
    user_id: formData.get('user_id'),
    product_id: formData.get('product_id'),
    color: formData.get('color'),
    plastic: formData.get('material'),
    definition: formData.get('definition') ?? 0,
    size: formData.get('size') ?? 0,
    quantity: formData.get('quantity')
  }

  const { data, error } = await supabase
    .from('cart')
    .insert(productDetails)

  console.log(data, error);

}

export async function directCheckout(formData: FormData) {

} 