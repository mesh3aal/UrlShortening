import { Quote } from "lucide-react";
import type { Review } from "#/data/data";
import { Rating } from "./reui/rating";

export default function Card({ paragraph, name, job }: Review) {
  return (
    <div className="flex flex-col justify-between last:pb-6 p-6 bg-white rounded-xl shadow-md card mb-8">
      <Rating rating={5} size="sm" className="mb-4" />
      <div className="relative mb-6">
        <Quote size={24} color="#878787" strokeWidth={1} />
        <p className="text-gray-700 italic pl-6">{paragraph}</p>
      </div>
      <div className="flex gap-x-2 person items-center">
        <p className="w-10 h-10 p-2 text-center text-gray-900 bg-gray-200 rounded-full">
          {name[0].toUpperCase() + name.split(" ")[1][0].toUpperCase()}
        </p>
        <div className="flex flex-col justify-center">
          <h3 className="text-sm sm:text-base">{name}</h3>
          <p className="text-xs md:text-sm text-gray-600">{job}</p>
        </div>
      </div>
    </div>
  );
}
