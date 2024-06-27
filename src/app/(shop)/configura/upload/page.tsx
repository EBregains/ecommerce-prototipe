'use client'

import { Progress } from "@/components/ui/progress"
import { cn } from "@/utils/utils"
import { FileAxis3D, Loader2, MousePointerSquareDashed } from "lucide-react"
import { useState, useTransition } from "react"
import Dropzone from "react-dropzone"


const Page = () => {

  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(45)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isPending, startTransitionFunction] = useTransition();

  const onDropRejected = () => {
    console.log("rejected")
    setIsDragOver(false)
  }
  const onDropAccepted = () => {
    console.log("accepted")
    setIsDragOver(false)
  }



  return (
    <div className={cn("relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex flex-col items-center", {
      "ring-green-900/25 bg-green-900/10": isDragOver,
    })}>
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          accept={{
            "model/stl": [".stl"],
            "model/obj": [".obj"],
          }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="size-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragOver
                ? <MousePointerSquareDashed className="size-10 sm:size-14 text-zinc-500 mb-2" />
                : isUploading || isPending
                  ? <Loader2 className="size-10 sm:size-14 mb-2 text-zinc-500 animate-spin" />
                  : <FileAxis3D className="size-10 sm:size-14 text-zinc-500 mb-2" />}
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
                      ? <p><span className="font-semibold">Suelte el archivo</span> para subirlo</p>
                      : <p><span className="font-semibold">Arrastre aqui o elija</span> el archivo a subir</p>
                }
              </div>
              {!isPending && <p className="text-xs text-zinc-500">| .STL | .OBJ |</p>}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page