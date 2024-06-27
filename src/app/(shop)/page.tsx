import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Model3D from "@/components/Model3D";
import Reviews from "@/components/Showcase";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/lib/Icons";
import { routes } from "@/lib/routes";
import { ArrowRight, Check, Star } from 'lucide-react'
import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pb-40 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 ">
          {/* Title and paragraph */}
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute hidden w-28 left-0 -top-20 lg:block">
                {/* <img src="/logo_1.png" alt="" className="w-full" /> */}
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Tus ideas <span className="bg-sky-600 px-2 text-white">impresas</span> en 3D
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Diseña <span className="font-semibold">tus ideas</span> en formato digital y materializalas con nosotros.
              </p>

              <CheckList>
                <CheckItem>
                  Alta calidad de diseño y materiales.
                </CheckItem>
                <CheckItem>
                  Altamente durable y resistente.
                </CheckItem>
                <CheckItem>
                  Garantía garantizada
                </CheckItem>
              </CheckList>

              <UsersImageArray />
            </div>
          </div>
          {/* Side image */}
          <div className="col-span-full lg:col-span-1 w-full h-fit flex justify-center mt-32 lg:mx-0 lg:mt-20 px-8 sm:px-16 md:px-0">
            <div className="relative md:max-w-xl">
              {/* "Your image" text with an arrow pointing the Model */}
              <img src="/your-image.png" alt="" className="absolute hidden w-40 lg:w-52 left-52 -top-20 select-none sm:block lg:hidden xl:block opacity-60" />
              {/* Line on the side */}
              <img src="/line.png" alt="" className="absolute w-20 -left-6 -bottom-6 select-none" />
              <Model3D className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section >

      {/* Value Proposition Section */}
      <section className="bg-sky-50 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          {/* Title */}
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              Reseñas de
              <span className="relative px-2">
                <Icons.underline className='block pointer-events-none absolute inset-x-0 -bottom-6 text-sky-500' />
                compradores
              </span></h2>
          </div>
          {/* CustomerReviews */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2  ">
            <CustomerReview customerName="Alejandro Martínez" imgsrc="/users/user-1.png">
              <p>
                "La experiencia de compra fue fantástica. La interfaz de la tienda es fácil de navegar y el proceso de personalización de mis piezas fue muy intuitivo. Recibí mis productos antes de lo esperado y la calidad superó mis expectativas. <span className="p-0.5 bg-slate-600 text-white">Los colores son vibrantes y las formas perfectamente acabadas.</span> ¡Un servicio de primera clase que vale cada centavo!"
              </p>
            </CustomerReview>
            <CustomerReview customerName="Laura Gómez" imgsrc="/users/user-3.png">
              <p>
                "Estoy realmente impresionada con la calidad de las impresiones 3D que recibí. Los detalles son impecables y el material utilizado es de alta durabilidad. El servicio al cliente fue excepcional, siempre atentos y dispuestos a resolver mis dudas. Definitivamente <span className="p-0.5 bg-slate-600 text-white">volveré a comprar aquí</span> para mis próximos proyectos. ¡Muy recomendado!"
              </p>
            </CustomerReview>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="relative max-w-5xl">
          <Reviews />
        </MaxWidthWrapper>
      </section>

      {/* Your Custom Model Section */}
      <section className="bg-white">
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Sube{" "}
                <span className="relative px-2 bg-sky-600 text-white">tu propio modelo
                </span> e imprimelo con nosotros.</h2>
            </div>

            <div className="mx-auto max-w-6xl px-6 pt-12 lg:px-8">
              <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                <img src="./arrow.png" className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0" />

                <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                  <img src="/horse.jpg" alt="" className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full" />
                </div>

                <Model3D className="w-60" imgSrc="/horse_phone.jpg" />
              </div>
            </div>
          </div>

          <CheckList className=" sm:items-center">
            <CheckItem>Alta calidad de materiales.</CheckItem>
            <CheckItem>Precision en la impresion.</CheckItem>
            <CheckItem>Compra con solo un click.</CheckItem>
            <CheckItem>Envio a tu puerta.</CheckItem>
          </CheckList>

          <div className="flex justify-center">
            <Link className={buttonVariants({
              size: "lg",
              className: 'mx-auto mt-8 bg-sky-600'
            })} href={routes.configura.upload}>Sube tu propio modelo ahora! <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}

function CheckList({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <ul className={`mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start ${className}`}>
      <div className="space-y-2">
        {children}
      </div>
    </ul>
  )
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-1.5 items-center text-left">
      <Check className="h-5 w-5 shrink-0 text-sky-600" />
      {children}
    </li>
  )
}

function UsersImageArray() {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
      <div className="flex -space-x-4">
        <img src="/users/user-1.png" alt="Portrait of one of the costumers" className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100" />
        <img src="/users/user-2.png" alt="Portrait of one of the costumers" className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100" />
        <img src="/users/user-3.png" alt="Portrait of one of the costumers" className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100" />
        <img src="/users/user-4.jpg" alt="Portrait of one of the costumers" className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100" />
        <img src="/users/user-5.jpg" alt="Portrait of one of the costumers" className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100" />
      </div>
      <div className="flex flex-col justify-between items-center sm:items-start gap-2">
        <FiveStars starSize="4" />
        <p><span className="font-semibold">1.250</span> Clientes felices</p>
      </div>
    </div>
  )
}

function FiveStars({ starSize }: { starSize: string }) {
  return (
    <div className="flex gap-0.5">
      <Star className={`size-${starSize} text-sky-600 fill-sky-600`} />
      <Star className={`size-${starSize} text-sky-600 fill-sky-600`} />
      <Star className={`size-${starSize} text-sky-600 fill-sky-600`} />
      <Star className={`size-${starSize} text-sky-600 fill-sky-600`} />
      <Star className={`size-${starSize} text-sky-600 fill-sky-600`} />
    </div>
  )
}

function CustomerReview({ children, customerName, imgsrc }: { children: ReactNode, customerName: string, imgsrc?: string }) {
  return (
    <div className="flex flex-auto flex-col gap-4">
      <div className="flex gap-0.5 mb-2">
        <FiveStars starSize="5" />
      </div>
      <div className="text-lg leading-8">
        {children}
      </div>
      <div className="flex flex-row gap-4 mt-2">
        <img
          className="rounded-full size-12 object-cover"
          src={imgsrc} alt="The user"
        />

        <div className="flex flex-col">
          <p className="font-semibold">{customerName}</p>
          <div className="flex gap-1.5 items-center text-zinc-600">
            <p className="text-sm">Compra Verificada</p>
            <Check className="size-4 stroke-[3px] text-sky-600" />
          </div>
        </div>
      </div>
    </div>
  )
}