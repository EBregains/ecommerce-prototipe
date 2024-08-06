'use client'

import Link from 'next/link'
import { routes } from '@/lib/routes'
import { login } from '@/app/(shop)/auth/actions'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { SubmitButton } from '@/components/auth/submit-button'

export default function LoginPage() {

  const searchParams = useSearchParams();
  const comingFrom = searchParams.get("from");

  return (
    <MaxWidthWrapper className='grid place-content-center relative flex-1'>
      <div className='bg-white p-8 rounded-lg lg:rounded-xl ring-1 ring-zinc-600/10 shadow-lg'>
        <h1 className='font-medium text-lg mb-4'>Inicia Sesion</h1>
        <form action={login}>
          <div className='flex flex-col gap-y-4'>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="email">Correo:</label>
              <input className='border-b h-8 pl-2 text-base' id="email" name="email" type="email" required />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="password">Contraseña:</label>
              <input className='border-b h-8 pl-2 text-base' id="password" name="password" type="password" required />
            </div>
            <input type="text" name="from" className='hidden sr-only' value={comingFrom ?? ""} />
            <SubmitButton text="Iniciar Sesion" className='mt-2 bg-sky-600' />
            <div className='flex flex-1 flex-col items-center'>
              <p className='text-xs opacity-80'>Todavia no tienes una cuenta?</p>
              <Link href={routes.auth.signup} className={buttonVariants({
                size: "lg",
                variant: 'ghost'
              })}>Registrate</Link>
            </div>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  )
}