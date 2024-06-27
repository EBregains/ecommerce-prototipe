'use client'

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { addProductToDB } from './actions';
import Dropzone from 'react-dropzone';
import { Loader2, MousePointerSquareDashed, Image } from 'lucide-react';
import { Progress } from '@radix-ui/react-progress';
import { slugify } from '@/utils/utils';
import { COLORS, MATERIALS } from '@/lib/variants';
import { buttonVariants } from '@/components/ui/button';

export default function AddProduct() {

  const imagesData = new FormData()
  let SubmitProduct = addProductToDB.bind(null, imagesData)

  const [slug, setSlug] = useState<string>('');
  const UpdateSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const slug = slugify(title);
    setSlug(slug);
  }

  //Dropzone functions
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(45);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isPending, startTransitionFunction] = useTransition();

  const [images, setImages] = useState<File[]>([]);

  const deleteByIndex = (index: number) => {
    setImages(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })
  }

  const onDropRejected = () => {
    console.log("rejected")
  }
  const onDropAccepted = (acceptedFiles: File[]) => {
    let newImages = [...images]
    acceptedFiles.map((file) => {
      newImages.push(file);
    })
    setImages(newImages)
  }

  // On each Image change apends the new images to the server action
  useEffect(() => {
    images.map((image) => {
      imagesData.append('image', image)
    })
    SubmitProduct = addProductToDB.bind(null, imagesData)
  }, [images])

  return (
    <section className='flex-1 p-6'>
      <h1 className='font-medium text-3xl mb-3'>Agregar producto</h1>
      <form action={SubmitProduct}>
        <div className='grid grid-cols-6 gap-4 w-full'>
          <div className='col-span-2'>
            <label className='block' htmlFor='title'>Titulo</label>
            <input type="text" onChange={UpdateSlug} className='w-full p-1 border' id='title' name='title' />
          </div>
          <div className='col-span-2'>
            <label className='block' htmlFor='slug'>Slug</label>
            <input readOnly type="text" value={slug} className='w-full p-1 border' id='slug' name='slug' />
          </div>
          <div className='col-span-1'>
            <label className='block' htmlFor='base_price'>Precio Base</label>
            <input type="text" className='w-full p-1 border' id='base_price' name='base_price' />
          </div>
          <div className='col-span-1'>
            <label className='block' htmlFor='stock'>Stock</label>
            <input type="text" className='w-full p-1 border' id='stock' name='stock' />
          </div>
          <div className='col-span-2'>
            <label className='block' htmlFor='category'>Categoria</label>
            <input type="text" className='w-full p-1 border' id='category' name='category' />
          </div>
          <div className='col-span-4'>
            <label className='block' htmlFor='description'>Descripcion</label>
            <textarea placeholder="Ingrese una descricion" className='w-full p-1 border h-20' id='description' name='description' />
          </div>
          {/* {Images Uploading} */}
          <section className='col-span-full'>
            <label className='block mb-2' htmlFor="images">Images</label>
            <div className='flex gap-4 w-full flex-wrap'>
              {images && images.map((image, index) => (
                <div key={"image" + index} className='relative'>
                  <button className='size-5 p-0 m-0 bg-red-600 absolute rounded-full text-xs font-medium text-white flex items-center justify-center -top-2 -right-2 hover:bg-red-400' type='button' onClick={() => deleteByIndex(index)}>X</button>
                  <img src={URL.createObjectURL(image)} alt='To upload' className='size-32 object-cover'></img>
                </div>
              ))}
              <div className='size-32'>
                <Dropzone
                  accept={{
                    "image/webp": [".webp"],
                  }}
                  multiple={true}
                  onDropRejected={onDropRejected}
                  onDropAccepted={onDropAccepted}
                >
                  {
                    ({ getRootProps, getInputProps }) => (
                      <div className="size-32 flex-1 border rounded-sm border-zinc-400 flex flex-col items-center justify-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragOver
                          ? <MousePointerSquareDashed className="size-10 sm:size-14 text-zinc-500 mb-2" />
                          : isUploading || isPending
                            ? <Loader2 className="size-10 sm:size-14 mb-2 text-zinc-500 animate-spin" />
                            : <Image className="size-10 sm:size-14 stroke-1 text-zinc-500 mb-2" />}
                        <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                          {isUploading
                            ? <div className="flex flex-col items-center">
                              <p>Subiendo archivo...</p>
                              <Progress className="mt-2 w-40 h-2 bg-gray-300" value={uploadProgress} />
                            </div>
                            : isPending
                              ? <div className="flex flex-col items-center">
                                <p>Redireccionando, por favor espere... </p>
                              </div>
                              : isDragOver
                                ? <p>Suelte</p>
                                : <p>Click or drop</p>
                          }
                        </div>
                        {!isPending && <p className="text-xs text-zinc-500">WEBP</p>}
                      </div>
                    )
                  }
                </Dropzone>
              </div>
            </div>
          </section>
          {/* Available Variants */}
          <section className='col-span-full'>
            <fieldset className='mb-4'>
              <legend>Colores</legend>
              {COLORS.map((color) => (
                <div className="mr-6 inline-block" key={color.name}>
                  <input type="checkbox" value={color.id} id={color.name} name='colors' />
                  <label htmlFor={color.name} className='capitalize'>{color.name}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Materiales</legend>
              {MATERIALS.map((material) => (
                <div className="mr-6 inline-block" key={material.name}>
                  <input type="checkbox" value={material.id} id={material.name} name='materials' />
                  <label htmlFor={material.name} className='capitalize'>{material.name}</label>
                </div>
              ))}
            </fieldset>
          </section>
          <section className='col-span-full'>
            <fieldset>Caracteristicas</fieldset>
          </section>
        </div>
        <button className={buttonVariants({
          size: 'lg',
          className: ''
        })}>Submit</button>
      </form>
    </section>
  )

}