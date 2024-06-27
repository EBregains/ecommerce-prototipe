'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import z from 'zod'

const AddProductSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  base_price: z.number(),
  stock: z.number().default(0),
  category: z.string().array(),
  images: z.string().array().optional(),
  images_alt: z.string().optional(),
  variants: z.object({
    colors: z.string().array().optional(),
    materials: z.string().array(),
  }).optional(),
  caracteristic: z.string().optional(),
})

export async function addProductToDB(ImagesData: FormData, formData: FormData) {
  const supabase = createClient();
  // zod validation
  const validatedFields = AddProductSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    base_price: Number(formData.get('base_price')),
    stock: Number(formData.get('stock')),
    category: [formData.get('category')],
    images_alt: formData.get('title'),
    variants: {
      colors: formData.getAll('colors'),
      materials: formData.getAll('materials'),
    }
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  //upload images
  const images = ImagesData.getAll('image')
  if (images) {
    images.map(async (image, index) => {
      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(('public/' + validatedFields.data.slug + `/image${index}.webp`), image, {
          contentType: "image/webp",
        })
    })
    // get images urls
    const { data: publicUrl } = supabase
      .storage
      .from('images')
      .getPublicUrl('public/' + validatedFields.data.slug)
    let imagesUrls: string[] = []
    images.map((element, index) => {
      imagesUrls.push(publicUrl.publicUrl + `/image${index}.webp`)
    })
    validatedFields.data.images = imagesUrls
  }

  // insert product
  const { error } = await supabase
    .from('products')
    .insert(validatedFields.data)

  revalidatePath('/admin/products', 'layout')
  redirect('/admin/products')
}