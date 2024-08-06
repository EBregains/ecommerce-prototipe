import Link from 'next/link'
import { signup } from '@/app/(shop)/auth/actions'
import { routes } from '@/lib/routes'
import { buttonVariants } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { SubmitButton } from '@/components/auth/submit-button'

export default function SignUpPage() {
  return (
    <MaxWidthWrapper className='grid place-content-center relative flex-1'>
      <div className='bg-white p-8 m-8 rounded-lg lg:rounded-xl ring-1 ring-zinc-600/10 shadow-lg'>
        <h1 className='font-medium text-lg mb-4'>Registrate</h1>
        <form action={signup}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6'>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="email">Correo:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="email" name="email" type="email" required />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="password">Contraseña:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="password" name="password" type="password" required />
            </div>
            <div className='flex gap-2'>
              <div className='w-20'>
                <label className='block text-xs sm:text-sm' htmlFor="area_code">C. Area:</label>
                <input className='border-b w-full h-8 pl-2 text-base' id="area_code" name="area_code" type="number" placeholder='0342' required />
              </div>
              <div className='w-36'>
                <label className='block text-xs sm:text-sm' htmlFor="phone">Telefono:</label>
                <input className='w-full border-b h-8 pl-2 text-base' id="phone" name="phone" type="number" required />
              </div>
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="birth_day">Nacimiento:</label>
              <input className='w-10 mr-2 border-b h-8 pl-2 text-base' id="birth_day" name="birth_day" type="number" required placeholder='DD' />
              <input className='w-10 mr-2 border-b h-8 pl-2 text-base' id="birth_month" name="birth_month" type="number" required placeholder='MM' />
              <input className='w-20 mr-2 border-b h-8 pl-2 text-base' id="birth_year" name="birth_year" type="number" required placeholder='AAAA' />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="first_name">Nombre/s:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="first_name" name="first_name" type="text" required />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="last_name">Apellido:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="last_name" name="last_name" type="text" required />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="province">Provincia:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="province" name="province" type="text" required />
            </div>
            <div>
              <label className='block text-xs sm:text-sm' htmlFor="city">Ciudad:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="city" name="city" type="text" required />
            </div>
            <div className='col-span-full'>
              <label className='block text-xs sm:text-sm' htmlFor="address">Direccion:</label>
              <input className='w-full border-b h-8 pl-2 text-base' id="address" name="address" type="text" required />
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <SubmitButton text="Registrarse" className='mt-2 bg-sky-600' />
            <div className='flex flex-1 flex-col items-center'>
              <p className='text-xs opacity-80'>Ya tienes una cuenta?</p>
              <Link href={routes.auth.login} className={buttonVariants({
                size: "lg",
                variant: 'ghost'
              })}>Inicia Sesion</Link>
            </div>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  )
}