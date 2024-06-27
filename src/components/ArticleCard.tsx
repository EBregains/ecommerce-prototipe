import { ARS, cn } from "@/utils/utils"
import { Key } from "react"
import { routes } from "@/lib/routes"

const ArticleCard = ({
  className,
  title,
  slug,
  value,
  imgSrc,
  reactKey
}: {
  className?: string,
  title: string,
  slug: string,
  value: number,
  imgSrc?: string | undefined,
  reactKey?: Key,
}) => {

  return (
    <a href={routes.tienda.productos + '/' + slug} key={reactKey} className={cn("h-72 w-52 flex flex-col overflow-hidden bg-white shadow-lg hover:scale-105 transition-transform cursor-pointer", className)} >
      <div className="h-[75%] w-full ">
        {imgSrc
          ? < img className="inline-block object-cover overflow-hidden w-full" src={imgSrc} alt="" />
          : < img className="inline-block object-cover overflow-hidden w-full opacity-20" src="https://via.assets.so/img.jpg?w=208&h=180&tc=gray&bg=#cecece" alt="" />
        }
      </div>
      <div className="relative z-10 h-[30%] w-full border-t bg-white border-gray-200 flex flex-col">
        <div className="m-2">
          <h3 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis !leading-tight py-2">{title}</h3>
          <div className="flex flex-1 items-end justify-end">
            {value && <p className="font-medium opacity-65">{ARS.format(value)}</p>}
          </div>
        </div>
      </div>
    </a>
  )
}

export default ArticleCard