'use client'

import { useState } from "react"

export const ImageGalleryDisplay = ({
  images
}: {
  images: string[]
}) => {

  const [currentImage, setCurrentImage] = useState<string>(images[0])

  return (
    <div className="flex flex-col-reverse items-center md:items-start md:flex-row gap-4 md:w-auto ">
      {/* Images to see */}
      <div className="h-12 flex gap-2 md:flex-col w-max md:h-auto md:w-20">
        {images.map((image, index) => (
          <img
            key={image + index}
            src={image}
            alt={image}
            onMouseEnter={() => setCurrentImage(image)}
            width={80}
            height={80}
            className="size-12 hover:border-2 border-separate border-sky-600 md:size-20 object-cover"
          />

        ))}
      </div>
      {/* Current img */}
      <div className="flex-1 flex justify-center items-center overflow-hidden max-h-[400px] min-h-[400px] md:max-h-none md:w-[500px] md:h-[600px] md:mr-12">
        <img src={currentImage} className="object-cover h-full" />
      </div>
    </div>
  )
}