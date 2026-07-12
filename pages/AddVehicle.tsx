import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    rangeMi: '',
    topSpeedMph: '',
    chargingSpeedKw: '',
    acceleration: '',
    category: 'Sedan',
    location: '',
    imageUrl: '',
    galleryInput: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verification
    if (
      !formData.title ||
      !formData.brand ||
      !formData.shortDescription ||
      !formData.fullDescription ||
      !formData.price ||
      !formData.rangeMi ||
      !formData.topSpeedMph ||
      !formData.chargingSpeedKw ||
      !formData.acceleration ||
      !formData.location ||
      !formData.imageUrl
    ) {
      setErrorMsg('All main fields are required.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      // Split optional gallery input by comma
      const gallery = formData.galleryInput
        ? formData.galleryInput.split(',').map((url) => url.trim()).filter(Boolean)
        : [];

      const payload = {
        ...formData,
        price: Number(formData.price),
        rangeMi: Number(formData.rangeMi),
        topSpeedMph: Number(formData.topSpeedMph),
        chargingSpeedKw: Number(formData.chargingSpeedKw),
        gallery
      };

      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/explore');
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || 'Failed to list vehicle. Please check inputs.');
      }
    } catch (err) {
      console.error('Add vehicle error:', err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Sedan', 'SUV', 'Truck', 'Sports', 'Supercar'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="radial-bg top-[-10%] left-[-15%]" />

      {/* Breadcrumbs / Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xs text-gray-500 hover:text-cyber-cyan transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back
      </button>

      <div className="glass p-8 rounded-2xl border border-gray-800/40 relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 pb-5 border-b border-gray-900">
          <div className="p-2 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">List New Vehicle</h1>
            <p className="text-xs text-gray-400">Publish a premium electric vehicle to the global marketplace database.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-purple flex items-center">
              <Sparkles className="h-4 w-4 mr-1.5 text-cyber-cyan" />
              General Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Model / Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Lucid Air Sapphire"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Manufacturer / Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  placeholder="e.g. Lucid Motors"
                  value={formData.brand}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field text-sm appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Dealership Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Austin, Texas"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Base MSRP Price ($)</label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="e.g. 89900"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Technical Performance */}
          <div className="space-y-4 pt-4 border-t border-gray-900/60">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-purple">
              Technical Metrics & Output
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Battery Range (mi)</label>
                <input
                  type="number"
                  name="rangeMi"
                  required
                  placeholder="e.g. 380"
                  value={formData.rangeMi}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Top Speed (mph)</label>
                <input
                  type="number"
                  name="topSpeedMph"
                  required
                  placeholder="e.g. 155"
                  value={formData.topSpeedMph}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Charge Speed (kW)</label>
                <input
                  type="number"
                  name="chargingSpeedKw"
                  required
                  placeholder="e.g. 250"
                  value={formData.chargingSpeedKw}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Acceleration (0-60)</label>
                <input
                  type="text"
                  name="acceleration"
                  required
                  placeholder="e.g. 2.4s"
                  value={formData.acceleration}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media Assets */}
          <div className="space-y-4 pt-4 border-t border-gray-900/60">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-purple">
              Media & Imagery
            </h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Primary Cover Image URL</label>
              <input
                type="url"
                name="imageUrl"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-field text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Additional Gallery Image URLs (comma separated)
              </label>
              <input
                type="text"
                name="galleryInput"
                placeholder="https://image1.com, https://image2.com"
                value={formData.galleryInput}
                onChange={handleChange}
                className="input-field text-sm"
              />
            </div>
          </div>

          {/* Section 4: Descriptions */}
          <div className="space-y-4 pt-4 border-t border-gray-900/60">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-purple">
              Overview & Writeups
            </h3>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Short Pitch / Card Description</label>
              <input
                type="text"
                name="shortDescription"
                required
                placeholder="Capped at 150 characters for card alignment..."
                value={formData.shortDescription}
                onChange={handleChange}
                className="input-field text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Full Detailed Overview</label>
              <textarea
                name="fullDescription"
                required
                rows={6}
                placeholder="Detailed performance profile, safety suite, and charging options..."
                value={formData.fullDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm rounded-xl bg-gray-950/60 border border-gray-800 text-cyber-text focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex.items-center justify-center cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Submitting EV Spec Sheet...
              </>
            ) : (
              'Publish Vehicle Specs'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
