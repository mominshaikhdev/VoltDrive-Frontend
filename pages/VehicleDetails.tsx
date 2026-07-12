import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, BatteryCharging, Gauge, Zap, DollarSign, Calendar, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';

interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  rangeMi: number;
  topSpeedMph: number;
  chargingSpeedKw: number;
  acceleration: string;
  category: string;
  location: string;
  rating: number;
  imageUrl: string;
  gallery: string[];
  reviews: Review[];
  createdBy?: string;
  createdAt: string;
}

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [related, setRelated] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitPending, setReviewSubmitPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch product details
  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/vehicles/${id}`);
      if (res.ok) {
        const data = await res.json();
        setVehicle(data.vehicle);
        setRelated(data.related || []);
        if (data.vehicle) {
          setActiveImage(data.vehicle.imageUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id, fetchDetails]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setReviewSubmitPending(true);
      setErrorMsg('');
      const res = await fetch(`/api/vehicles/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      });

      if (res.ok) {
        setComment('');
        setRating(5);
        // Refresh product details to show the new review and updated average score
        await fetchDetails();
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Review submit error:', err);
      setErrorMsg('Network error. Failed to send review.');
    } finally {
      setReviewSubmitPending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[400px] bg-gray-800 rounded-2xl" />
          <div className="space-y-6">
            <div className="h-4 bg-gray-800 w-16 rounded-md" />
            <div className="h-10 bg-gray-800 w-3/4 rounded-md" />
            <div className="h-6 bg-gray-800 w-1/4 rounded-md" />
            <div className="h-20 bg-gray-800 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
        <p className="text-gray-400 mb-6">The EV you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="btn-primary">Return to Marketplace</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Battery Range', value: `${vehicle.rangeMi} miles`, icon: BatteryCharging, desc: 'Estimated range on full charge' },
    { label: 'Top Speed', value: `${vehicle.topSpeedMph} mph`, icon: Gauge, desc: 'Maximum velocity on track' },
    { label: 'Acceleration', value: vehicle.acceleration, icon: Zap, desc: 'From 0 to 60 mph' },
    { label: 'Fast Charge Power', value: `${vehicle.chargingSpeedKw} kW`, icon: BatteryCharging, desc: 'Maximum DC accept speed' }
  ];

  const galleryList = [vehicle.imageUrl, ...(vehicle.gallery || [])].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative">
      <div className="radial-bg top-[-10%] left-[-10%]" />

      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 flex items-center space-x-2">
        <Link to="/" className="hover:text-cyber-cyan">Home</Link>
        <span>/</span>
        <Link to="/explore" className="hover:text-cyber-cyan">Marketplace</Link>
        <span>/</span>
        <span className="text-gray-300 font-semibold">{vehicle.title}</span>
      </div>

      {/* Top Section: Media Gallery & Purchase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Photo Gallery (Requirement 5) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden glass border border-gray-800/40">
            <img
              src={activeImage}
              alt={vehicle.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-bold bg-cyber-bg/90 border border-gray-800 text-cyber-cyan backdrop-blur-md">
              {vehicle.category}
            </div>
          </div>
          
          {/* Thumbnails */}
          {galleryList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryList.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`h-20 w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 cursor-pointer ${
                    activeImage === imgUrl ? 'border-cyber-cyan scale-95' : 'border-gray-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Overview Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-bold text-cyber-purple uppercase tracking-widest">{vehicle.brand}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{vehicle.title}</h1>
            
            <div className="flex items-center space-x-4 pt-1">
              <div className="flex items-center text-yellow-500 font-bold space-x-1 text-sm">
                <Star className="h-4.5 w-4.5 fill-current" />
                <span>{vehicle.rating.toFixed(1)}</span>
                <span className="text-gray-500 font-medium ml-1">({vehicle.reviews?.length || 0} reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-800" />
              <div className="flex items-center space-x-1 text-gray-400 text-xs font-semibold">
                <MapPin className="h-4 w-4 text-cyber-cyan" />
                <span>{vehicle.location}</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-gray-800/40 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-400 text-sm font-semibold">MSRP Base Price</span>
              <div className="flex items-baseline text-white">
                <DollarSign className="h-5 w-5 text-cyber-cyan self-center" />
                <span className="text-3xl font-extrabold tracking-tight">
                  {vehicle.price.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed border-t border-gray-900 pt-5">
              {vehicle.shortDescription}
            </p>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 btn-primary py-3 flex items-center justify-center">
                Contact Dealership
              </button>
              <button className="p-3 rounded-xl border border-gray-850 hover:border-red-900/30 hover:bg-red-950/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 border-t border-gray-900 pt-4">
              <ShieldCheck className="h-4 w-4 text-cyber-cyan" />
              <span>Certified VoltDrive Guarantee. All stats verified by dynamic sensor log.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Key Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, idx) => (
            <div key={idx} className="glass p-5 rounded-xl border border-gray-800/40 space-y-3">
              <div className="flex items-center space-x-2 text-cyber-cyan">
                <spec.icon className="h-5 w-5 shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-gray-400">{spec.label}</span>
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">{spec.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Description / Overview */}
      <section className="glass p-8 rounded-2xl border border-gray-800/40 space-y-4">
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {vehicle.fullDescription}
        </p>
      </section>

      {/* Related Items Section */}
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Related Electric Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((car) => (
              <VehicleCard
                key={car._id}
                id={car._id}
                title={car.title}
                brand={car.brand}
                price={car.price}
                rangeMi={car.rangeMi}
                rating={car.rating}
                category={car.category}
                location={car.location}
                imageUrl={car.imageUrl}
                shortDescription={car.shortDescription}
                createdAt={car.createdAt}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews & Ratings Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        {/* Review list */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-cyber-purple" />
            Customer Reviews
          </h2>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {vehicle.reviews && vehicle.reviews.length > 0 ? (
              vehicle.reviews.map((rev, idx) => (
                <div key={idx} className="glass p-5 rounded-xl border border-gray-900 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-bold text-sm">{rev.username}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{new Date(rev.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500 font-bold space-x-0.5 text-xs bg-gray-900 border border-gray-800 px-2.5 py-1 rounded-lg">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm glass rounded-xl border border-gray-900">
                No reviews yet. Be the first to express your feedback!
              </div>
            )}
          </div>
        </div>

        {/* Add review form */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-bold text-white">Write a Review</h3>

          {!user ? (
            <div className="glass p-6 rounded-xl border border-gray-900 text-center space-y-4">
              <p className="text-gray-400 text-xs">
                To write reviews and provide ratings, you must be logged in.
              </p>
              <Link to="/login" className="inline-block btn-secondary text-xs">
                Log In to Account
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="glass p-6 rounded-xl border border-gray-900 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/25 border border-red-900/30 text-red-400 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Rating selection */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Rating Score</label>
                <div className="flex space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 rounded-md text-yellow-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`h-6 w-6 ${rating >= star ? 'fill-current' : 'text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Your Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your driving experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-gray-950/60 border border-gray-800 text-cyber-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitPending}
                className="w-full btn-primary text-xs py-2.5 disabled:opacity-40"
              >
                {reviewSubmitPending ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
