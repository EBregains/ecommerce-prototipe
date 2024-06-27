"use client"

import { cn, splitArray } from "@/utils/utils"
import { useInView } from "framer-motion"
import React, { HTMLAttributes, useEffect, useRef, useState } from "react"
import Model3D from "./Model3D"

// TODO: Make them fetch from the actual db
const MODELS = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
  '/testimonials/5.jpg',
  '/testimonials/6.jpg',
]

const Showcase = () => {
  return (
    <>
      <img
        className="absolute select-none hidden xl:block -left-40 top-1/3 opacity-60"
        src="/what-people-are-buying.png" alt=""
      />

      <ShowcaseGrid />
    </>
  )
}

const ShowcaseGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(MODELS, 3);
  const col1 = columns[0];
  const col2 = columns[1];
  const col3 = splitArray(columns[2], 2);

  return (
    <div
      className="relative mx-4 mt-16 grid h-[49rem] max-h-[110vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 md:mt-32 lg:grid-cols-3"
      ref={containerRef}
    >
      {
        isInView &&
        <>
          <ShowcaseColumn
            models={[...col1, ...col3.flat(), ...col2]}
            itemClassName={(itemIndex) => cn({
              'md:hidden': itemIndex >= col1.length + col3[0].length,
              "lg:hidden": itemIndex >= col1.length
            })}
            msPerPixel={10}
          />
          <ShowcaseColumn
            className="hidden md:block"
            models={[...col2, ...col3[1]]}
            itemClassName={(itemIndex) => itemIndex >= col2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ShowcaseColumn
            className="hidden md:block"
            models={col3.flat()}
            msPerPixel={10}
          />

        </>
      }
      {/* Fade on top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-50" />
      {/* Fade on the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sky-50" />
    </div>)
}

const ShowcaseColumn = ({
  models,
  className,
  itemClassName,
  msPerPixel = 0,
}: {
  models: string[],
  className?: string,
  itemClassName?: (reviewIndex: number) => string,
  msPerPixel?: number,
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`
  useEffect(() => {
    if (!columnRef.current) return

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    }
  }, [])

  return (
    <div
      className={cn('animate-marquee space-y-8 py-4', className)}
      ref={columnRef}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {models.concat(models).map((imgSrc, index) => (
        <ShowcaseItem
          key={index}
          imgSrc={imgSrc}
          className={itemClassName?.(index & models.length)} />
      ))}
    </div>
  )
}

interface ModelProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}

const ShowcaseItem = ({ imgSrc, className, ...props }: ModelProps) => {

  const POSSIBLE_DELAYS = [
    '0.s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0.4s',
    '0.5s',
  ]

  const animationDelay = POSSIBLE_DELAYS[Math.floor(Math.random() * POSSIBLE_DELAYS.length)]

  return (
    <div
      className={cn('animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5 hover:scale-105 transition-transform', className)}
      style={{ animationDelay }}
      {...props}
    >
      <Model3D imgSrc={imgSrc} />
    </div>
  )
}

export default Showcase;