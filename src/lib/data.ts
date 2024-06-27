import { createClient } from "@/utils/supabase/server";

export async function getProduct(field: string, exprected_value: string) {

  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq(field, exprected_value)

  if (data)
    return data[0]
}

export async function getProductImages(slug: string) {

  const supabase = createClient();

  // Get the public URL  
  const { data: publicUrl } = supabase
    .storage
    .from('images')
    .getPublicUrl('public/' + slug)

  // Get the images
  const { data: images, error } = await supabase
    .storage
    .from('images')
    .list(('public/' + slug), {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  // Iterate through the images and generate each image's public url 
  let urls: string[] = []
  images?.map((element, index) => {
    urls.push(publicUrl.publicUrl + `/image${index}.webp`)
  })
  return urls
}

export async function getBestSellers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select()
    .limit(15)

  if (data)
    return data
}
