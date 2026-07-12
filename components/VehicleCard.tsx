import { Link } from 'react-router-dom';
import { Star, MapPin, BatteryCharging, DollarSign } from 'lucide-react';

interface VehicleCardProps {
  id: string;
  title: string;
  brand: string;
  price: number;
  rangeMi: number;
  rating: number;
  category: string;
  location: string;
  imageUrl: string;
  shortDescription: string;
  createdAt?: string;
}

export default function VehicleCard({
  id,
  title,
  brand,
  price,
  rangeMi,
  rating,
  category,
  location,
  imageUrl,
  shortDescription,
  createdAt
}: VehicleCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[440px] w-full group">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-cyber-bg/80 border border-gray-800 text-cyber-cyan backdrop-blur-md">
          {category}
        </div>
        {createdAt && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold bg-cyber-bg/80 border border-gray-800 text-gray-400 backdrop-blur-md">
            {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Brand & Rating */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-cyber-purple font-bold tracking-wider uppercase">{brand}</span>
            <div className="flex items-center text-yellow-500 font-semibold space-x-1">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-snug line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {/* Specs and CTA */}
        <div className="space-y-4 pt-3 border-t border-gray-800/60">
          {/* Specifications */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyber-cyan/80 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-end">
              <BatteryCharging className="h-3.5 w-3.5 text-cyber-cyan/80 shrink-0" />
              <span>{rangeMi} mi</span>
            </div>
          </div>

          {/* Action button & Price */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline text-white shrink-0">
              <DollarSign className="h-3.5 w-3.5 text-cyber-cyan self-center shrink-0 mr-0.5" />
              <span className="text-base sm:text-xl font-extrabold tracking-tight">
                {price.toLocaleString()}
              </span>
            </div>
            <Link
              to={`/vehicles/${id}`}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg bg-cyber-purple hover:bg-cyber-cyan hover:text-cyber-bg border border-transparent text-white transition-all duration-300 active:scale-95 shadow-md shadow-cyber-purple/10 cursor-pointer whitespace-nowrap shrink-0"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export type { VehicleCardProps };
