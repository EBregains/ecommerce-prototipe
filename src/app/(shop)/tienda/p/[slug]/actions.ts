'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const supabase = createClient()

const AddProductSchema = z.object({
  user_id: z.string(),
  product_id: z.string(),
  color: z.string({
    invalid_type_error: 'Por favor, selecciona un color'
  }),
  plastic: z.string({
    invalid_type_error: 'Por favor, selecciona un tipo de plastico'
  }),
  definition: z.number() ?? 0,
  size: z.number() ?? 0,
  quantity: z.string()
})

export async function addToCart(prevState: any, formData: FormData) {

  const validatedFields = AddProductSchema.safeParse({
    user_id: formData.get('user_id'),
    product_id: formData.get('product_id'),
    color: formData.get('color'),
    plastic: formData.get('material'),
    definition: formData.get('definition') ?? 0,
    size: formData.get('size') ?? 0,
    quantity: formData.get('quantity')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    }
  }

  const { data, error } = await supabase
    .from('cart')
    .insert(validatedFields.data)

  console.log(data, error);
  revalidatePath('/', 'layout')

  return {
    errors: {},
    success: true,
  }
}

export async function directCheckout(prevState: any, formData: FormData) {

  const validatedFields = AddProductSchema.safeParse({
    user_id: formData.get('user_id'),
    product_id: formData.get('product_id'),
    color: formData.get('color'),
    plastic: formData.get('material'),
    definition: formData.get('definition') ?? 0,
    size: formData.get('size') ?? 0,
    quantity: formData.get('quantity')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    }
  }

  return {
    errors: {},
    success: true,
  }
} 