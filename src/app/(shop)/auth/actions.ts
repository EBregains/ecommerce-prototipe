'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import z from 'zod'

const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function login(formData: FormData) {
  const supabase = createClient();

  const validatedFields = LogInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }


  const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (error) {
    redirect('/error')
  }

  const comingFrom = formData.get("from")
  revalidatePath('/', 'layout')
  redirect('/' + comingFrom)
}

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is too short' }),
  area_code: z.string().min(1).max(4),
  phone: z.string().min(6),
  first_name: z.string(),
  last_name: z.string(),
  birth_day: z.number().min(1).max(31),
  birth_month: z.number().min(1).max(12),
  birth_year: z.number().min(1910).max(new Date().getFullYear()),
  province: z.string(),
  city: z.string(),
  address: z.string(),
})

export async function signup(formData: FormData) {
  const supabase = createClient()

  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    area_code: formData.get('area_code'),
    phone: formData.get('phone'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    birth_day: Number(formData.get('birth_day')),
    birth_month: Number(formData.get('birth_month')),
    birth_year: Number(formData.get('birth_year')),
    province: formData.get('province'),
    city: formData.get('city'),
    address: formData.get('address'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return validatedFields.error.flatten().fieldErrors
  }
  else
    console.log('success');

  const {
    email,
    password,
    area_code,
    phone,
    first_name,
    last_name,
    birth_day,
    birth_month,
    birth_year,
    province,
    city,
    address,
  } = validatedFields.data
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        area_code: area_code,
        phone: phone,
        first_name: first_name,
        last_name: last_name,
        birth_day: birth_day,
        birth_month: birth_month,
        birth_year: birth_year,
        province: province,
        city: city,
        address: address,
      }
    }
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/tienda', 'layout')
  redirect('/tienda')
}

export async function signout(formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
}