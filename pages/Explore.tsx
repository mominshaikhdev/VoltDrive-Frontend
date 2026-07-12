import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RefreshCw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import SkeletonLoader from '../components/SkeletonLoader';

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  price: number;
  rangeMi: number;
  rating: number;
  category: string;
  location: string;
  imageUrl: string;
  shortDescription: string;
  createdAt: string;
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);

  // Filter and pagination states
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const brand = searchParams.get('brand') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const minRange = searchParams.get('minRange') || '';

  // Local inputs before applying
  const [searchInput, setSearchInput] = useState(search);
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);
  const [minRangeInput, setMinRangeInput] = useState(minRange);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync inputs when params change
  useEffect(() => {
    setSearchInput(search);
    setMinPriceInput(minPrice);
    setMaxPriceInput(maxPrice);
    setMinRangeInput(minRange);
  }, [search, minPrice, maxPrice, minRange]);

  // Fetch data when parameters change
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', '8');
        if (search) queryParams.append('search', search);
        if (brand) queryParams.append('brand', brand);
        if (category) queryParams.append('category', category);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
        if (minRange) queryParams.append('minRange', minRange);

        const res = await fetch(`/api/vehicles?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setVehicles(data.vehicles || []);
          setTotalPages(data.totalPages || 1);
          setTotalVehicles(data.totalVehicles || 0);
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, [page, search, brand, category, sortBy, minPrice, maxPrice, minRange]);

  // Apply filters helper
  const updateParams = (newParams: Record<string, string | null>) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === '') {
        updated.delete(key);
      } else {
        updated.set(key, val);
      }
    });
    // Reset to page 1 on filter modification
    if (newParams.page === undefined) {
      updated.set('page', '1');
    }
    setSearchParams(updated);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  const handlePriceApply = () => {
    updateParams({ minPrice: minPriceInput, maxPrice: maxPriceInput });
  };

  const handleRangeApply = () => {
    updateParams({ minRange: minRangeInput });
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchInput('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setMinRangeInput('');
  };

  const categories = ['Sedan', 'SUV', 'Truck', 'Sports', 'Supercar'];
  const brandsList = ['Tesla', 'Lucid Motors', 'Porsche', 'Rivian', 'Rimac Technology', 'Ford', 'BMW', 'Hyundai'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="radial-bg top-[-10%] right-[-10%]" />

      {/* Header Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">EV Marketplace</h1>
        <p className="text-gray-400 text-sm mt-1">Discover performance statistics, configurations, and pricing models.</p>
      </div>

      {/* Search & Sort Panel */}
      <div className="glass p-4 rounded-2xl border border-gray-800/40 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search brand, model, features..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-950/60 border border-gray-800 text-cyber-text text-sm focus:outline-none focus:border-cyber-cyan"
          />
          <Search className="absolute left-4 top-3 h-4.5 w-4.5 text-gray-500" />
        </form>

        <div className="flex w-full md:w-auto items-center justify-end gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-200 text-sm font-semibold cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => updateParams({ sortBy: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-gray-300 text-sm font-semibold focus:outline-none focus:border-cyber-cyan cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rangeDesc">Highest Range</option>
            <option value="topSpeedDesc">Top Speed</option>
            <option value="ratingDesc">Highest Rated</option>
          </select>

          <button
            onClick={handleResetFilters}
            title="Reset Filters"
            className="p-2.5 rounded-xl border border-gray-850 bg-gray-950 hover:bg-gray-900 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className={`lg:block ${showMobileFilters ? 'fixed inset-0 z-50 bg-cyber-bg/95 p-6 overflow-y-auto block' : 'hidden'}`}>
          <div className="space-y-6">
            {/* Mobile Filter Close */}
            <div className="flex lg:hidden justify-between items-center pb-4 border-b border-gray-900">
              <h3 className="text-white font-bold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 rounded-lg text-gray-400 cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateParams({ category: category === cat ? null : cat })}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 cursor-pointer ${
                      category === cat
                        ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan'
                        : 'bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase">Brand</h3>
              <div className="flex flex-col space-y-1">
                {brandsList.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateParams({ brand: brand === b ? null : b })}
                    className={`text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-300 border cursor-pointer ${
                      brand === b
                        ? 'bg-cyber-purple/10 border-cyber-purple/40 text-cyber-purple'
                        : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-gray-900/40'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min ($)"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-gray-950/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan"
                />
                <input
                  type="number"
                  placeholder="Max ($)"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-gray-950/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan"
                />
              </div>
              <button
                onClick={handlePriceApply}
                className="w-full py-2 text-xs font-bold text-center rounded-lg bg-gray-900 border border-gray-800 hover:border-cyber-cyan hover:text-cyber-cyan text-gray-300 transition-colors cursor-pointer"
              >
                Apply Price
              </button>
            </div>

            {/* Range Filter */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase">Min Range (miles)</h3>
              <input
                type="number"
                placeholder="E.g. 300"
                value={minRangeInput}
                onChange={(e) => setMinRangeInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-gray-950/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan"
              />
              <button
                onClick={handleRangeApply}
                className="w-full py-2 text-xs font-bold text-center rounded-lg bg-gray-900 border border-gray-800 hover:border-cyber-cyan hover:text-cyber-cyan text-gray-300 transition-colors cursor-pointer"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => <SkeletonLoader key={idx} />)
            ) : vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  id={vehicle._id}
                  title={vehicle.title}
                  brand={vehicle.brand}
                  price={vehicle.price}
                  rangeMi={vehicle.rangeMi}
                  rating={vehicle.rating}
                  category={vehicle.category}
                  location={vehicle.location}
                  imageUrl={vehicle.imageUrl}
                  shortDescription={vehicle.shortDescription}
                  createdAt={vehicle.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-gray-400 glass rounded-2xl border border-gray-800/40">
                <p className="text-lg font-bold text-white mb-1">No matches found</p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">Try resetting the filters or broadening your search parameters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2 text-xs font-bold rounded-lg bg-cyber-purple hover:bg-cyber-cyan text-white hover:text-cyber-bg transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-900 pt-6">
              <p className="text-xs text-gray-500">
                Showing <span className="font-semibold text-gray-300">{vehicles.length}</span> of{' '}
                <span className="font-semibold text-gray-300">{totalVehicles}</span> results
              </p>
              <div className="flex items-center space-x-2">
                <button
                  disabled={page === '1'}
                  onClick={() => updateParams({ page: String(Number(page) - 1) })}
                  className="p-2 rounded-lg border border-gray-850 bg-gray-950 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-900 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold text-gray-300 px-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={Number(page) >= totalPages}
                  onClick={() => updateParams({ page: String(Number(page) + 1) })}
                  className="p-2 rounded-lg border border-gray-850 bg-gray-950 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-900 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
