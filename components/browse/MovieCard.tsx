"use client";

import { ChevronDown, PlayCircle, PlusCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  overview: string;
  poster: string | undefined;
}

export default function MovieCard({ title, overview, poster }: MovieCardProps) {
  return (
    <div className="group">
      <div className="flex-none w-36 relative cursor-pointer group">
        <Image
          src={poster || ""}
          alt={title}
          width={200}
          height={60}
          className="rounded-md object-cover h-auto group-hover:opacity-0 transition duration-200 delay-300"
        />
      </div>
      <div className="absolute z-30 top-0 scale-0 bg-slate-800 w-56 transition duration-200 group-hover:scale-140 opacity-0 delay-300 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-[3vw]">
        {/* <div> */}
        <Image
          src={poster || ""}
          alt={title}
          width={230}
          height={60}
          className="object-cover"
        />
        <div className="flex justify-between p-6 items-center">
          <div className="flex space-x-3 items-center">
            <PlayCircle className="h-8 w-8" />
            <PlusCircle className="h-8 w-8" />
            <ThumbsUp />
          </div>
          <ChevronDown />
        </div>
        <p className="px-6 py-2 text-white">Exciting · Kids · Rivalry</p>
        {/* </div> */}
      </div>
    </div>
  );
}
