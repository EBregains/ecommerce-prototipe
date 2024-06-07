import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Model3D from "@/components/Model3D";
import { Check, Star } from 'lucide-react'
import Image from "next/image";
import { ReactNode } from "react";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pb-52 lg:pt-24 xl:pt-32 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 ">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute hidden w-28 left-0 -top-20 lg:block">
                <img src="/logo_1.png" alt="" className="w-full" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Tus ideas <span className="bg-blue-600 px-2 text-white">impresas</span> en 3D
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
    </main >
  );
}

function CheckList({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
      <div className="space-y-2">
        {children}
      </div>
    </ul>
  )
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-1.5 items-center text-left">
      <Check className="h-5 w-5 shrink-0 text-blue-600" />
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
        <div className="flex gap-0.5">
          <Star className="size-4 text-blue-600 fill-blue-600" />
          <Star className="size-4 text-blue-600 fill-blue-600" />
          <Star className="size-4 text-blue-600 fill-blue-600" />
          <Star className="size-4 text-blue-600 fill-blue-600" />
          <Star className="size-4 text-blue-600 fill-blue-600" />
        </div>

        <p><span className="font-semibold">1.250</span> Clientes felices</p>
      </div>
    </div>
  )
}