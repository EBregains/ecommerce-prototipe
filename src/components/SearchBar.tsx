import { Search } from "lucide-react";

export default async function SearchBar({ }: {}) {
  return <div className="w-full h-auto flex  p-4 my-4 bg-white rounded-lg">
    <Search className="size-6 mr-4 ml-1" />
    <p>SearchBar placeholder...</p>
  </div>
}