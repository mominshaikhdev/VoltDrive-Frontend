import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Zap, BatteryCharging, Gauge, HelpCircle, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
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

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch all vehicles for analytics and featured list
        const res = await fetch('/api/vehicles?limit=100');
        if (res.ok) {
          const data = await res.json();
          const list: Vehicle[] = data.vehicles || [];
          
          // Featured: Top 4 highest rated
          const sorted = [...list].sort((a, b) => b.rating - a.rating);
          setFeaturedVehicles(sorted.slice(0, 4));

          // Range vs Price Data
          const scatter = list.map(v => ({
            name: v.title,
            price: v.price,
            range: v.rangeMi,
            brand: v.brand
          }));
          setAnalyticsData(scatter);

          // Category price breakdown
          const categories = Array.from(new Set(list.map(v => v.category)));
          const breakdown = categories.map(cat => {
            const catVehs = list.filter(v => v.category === cat);
            const avgPrice = catVehs.reduce((sum, v) => sum + v.price, 0) / catVehs.length;
            return {
              category: cat,
              avgPrice: Math.round(avgPrice),
              count: catVehs.length
            };
          });
          setCategoryData(breakdown);
        }
      } catch (err) {
        console.error('Error fetching landing page data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const brands = [
    { name: 'Tesla', logo: '⚡' },
    { name: 'Lucid Motors', logo: '💎' },
    { name: 'Porsche', logo: '🏎️' },
    { name: 'Rivian', logo: '🏞️' },
    { name: 'Rimac', logo: '🌀' },
    { name: 'BMW', logo: '🇩🇪' },
    { name: 'Audi', logo: '⭕' },
    { name: 'Hyundai', logo: '🇰🇷' }
  ];

  const highlights = [
    {
      icon: Zap,
      title: 'Instant Torque',
      description: 'Experience instant power delivery and whisper-quiet acceleration from high-performance electric powertrains.'
    },
    {
      icon: BatteryCharging,
      title: 'Next-Gen Range',
      description: 'Say goodbye to range anxiety with advanced battery packs providing up to 400+ miles on a single charge.'
    },
    {
      icon: Gauge,
      title: 'Ultra-Fast Charging',
      description: 'Regain up to 200 miles of battery range in as little as 15 minutes utilizing high-voltage DC chargers.'
    },
    {
      icon: ShieldCheck,
      title: 'Smart Tech Suite',
      description: 'Benefit from state-of-the-art Driver Assistance, Over-the-Air software updates, and smart cabin analytics.'
    }
  ];

  const faqs = [
    {
      q: 'How long do EV batteries typically last?',
      a: 'Modern electric vehicle battery packs are engineered to last between 10 to 15 years, or roughly 150,000 to 200,000 miles. Most manufacturers offer a minimum 8-year/100,000-mile warranty covering battery degradation.'
    },
    {
      q: 'What is the difference between Level 2 and DC Fast Charging?',
      a: 'Level 2 charging utilizes 240V AC power (commonly used at home or workplaces) and takes 4 to 8 hours for a full charge. DC Fast Charging bypasses the vehicle’s onboard charger to deliver direct current, recharging up to 80% in 15 to 30 minutes.'
    },
    {
      q: 'Are electric vehicles cheaper to maintain than gas cars?',
      a: 'Yes, EVs have significantly fewer moving parts (no engine oil, transmission fluids, spark plugs, or timing belts) resulting in roughly 40% lower maintenance costs over the lifetime of the vehicle.'
    }
  ];

  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Porsche Taycan Owner',
      quote: 'VoltDrive helped me compare specifications and find my Taycan Turbo. The range charts were incredibly helpful during my buying process.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
    },
    {
      name: 'Elena Rostova',
      role: 'Rivian R1S Enthusiast',
      quote: 'The search filters let me pinpoint exactly what off-road SUV fit my budget. Managing and reviewing listings is simple and responsive.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass p-3.5 rounded-xl border border-gray-800 text-xs">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <p className="text-cyber-cyan"><span className="text-gray-400">Price:</span> ${data.price.toLocaleString()}</p>
          <p className="text-cyber-purple"><span className="text-gray-400">Range:</span> {data.range} miles</p>
          <p className="text-cyber-pink"><span className="text-gray-400">Brand:</span> {data.brand}</p>
        </div>
      );
    }
    return null;
  };

  const handleScrollToAnalytics = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('analytics-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 pb-20 relative">
      {/* Background glow effects */}
      <div className="radial-bg top-[-10%] left-[-10%]" />
      <div className="radial-bg top-[40%] right-[-10%]" />

      {/* 1. Hero Section (60-70% height) */}
      <section className="relative min-h-[90vh] sm:min-h-[80vh] md:h-[80vh] flex items-center overflow-hidden border-b border-gray-900/50 pt-24 pb-12 md:py-0">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(7, 10, 19, 0.7), rgba(7, 10, 19, 0.95)), url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600')` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center flex flex-col items-center justify-center">
          <div className="max-w-3xl space-y-6 mx-auto flex flex-col items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan animate-pulse mt-4 md:mt-12">
              ⚡ The Future of Mobility
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              The Premium Electric <br />
              <span className="text-gradient">Revolution is Here</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium">
              Explore and manage the worlds most powerful electric vehicles. Compare ranges, top speeds, pricing, and high-voltage charging networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 pb-8 w-full sm:w-auto mb-4">
              <Link to="/explore" className="btn-primary flex items-center justify-center">
                Explore EV Marketplace
                <Compass className="ml-2 h-5 w-5" />
              </Link>
              <a href="#analytics-section" onClick={handleScrollToAnalytics} className="btn-secondary flex items-center justify-center">
                View Performance Analytics
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand / Category Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass p-6 rounded-2xl border border-gray-800/40">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-cyber-purple mb-6">
            Featured Manufacturers & Innovators
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/explore?brand=${encodeURIComponent(brand.name)}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-950/40 border border-gray-900 hover:border-cyber-cyan/30 hover:bg-gray-900/40 transition-all duration-300 group"
              >
                <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform duration-300">{brand.logo}</span>
                <span className="text-xs font-bold text-gray-400 group-hover:text-cyber-cyan transition-colors duration-300">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured EV Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Featured Electric Vehicles</h2>
            <p className="text-gray-400 text-sm mt-1">High-performance EVs with outstanding feedback and user reviews.</p>
          </div>
          <Link to="/explore" className="text-cyber-cyan font-semibold flex items-center hover:underline mt-2 md:mt-0 text-sm">
            View all vehicles <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => <SkeletonLoader key={idx} />)
          ) : featuredVehicles.length > 0 ? (
            featuredVehicles.map((vehicle) => (
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
            <div className="col-span-full py-12 text-center text-gray-400">
              No vehicles available in the database.
            </div>
          )}
        </div>
      </section>

      {/* 4. Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white">Engineered for the Modern Road</h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Why transition to electric? Discover the key engineering advantages of premium EV powertrains.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-gray-800/40 space-y-4 hover:border-cyber-purple/30 transition-all duration-300">
              <div className="p-3 w-fit rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EV Market Analytics Hub (Recharts Graphs) */}
      <section id="analytics-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">EV Market Analytics Hub</h2>
          <p className="text-gray-400 mt-2 text-sm">Real-time comparison metrics and insights on pricing, battery capacity, and manufacturer stats.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Scatter Plot Price vs Range */}
          <div className="glass p-6 rounded-2xl border border-gray-800/40 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-md mb-2">Battery Range vs. Retail Price</h3>
              <p className="text-gray-400 text-xs mb-6">Compare range efficiency against cost. Lower price + higher range = maximum value.</p>
            </div>
            <div className="h-72 w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs">Loading scatter plot...</div>
              ) : analyticsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                    <XAxis type="number" dataKey="price" name="Price" unit="$" stroke="#9ca3af" fontSize={10} tickFormatter={(v) => `$${v/1000}k`} />
                    <YAxis type="number" dataKey="range" name="Range" unit="mi" stroke="#9ca3af" fontSize={10} />
                    <ZAxis type="category" dataKey="name" name="Model" />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="EVs" data={analyticsData} fill="#06b6d4" />
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs">No range data available.</div>
              )}
            </div>
          </div>

          {/* Chart 2: Category Breakdown */}
          <div className="glass p-6 rounded-2xl border border-gray-800/40 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-md mb-2">Average Price per EV Category</h3>
              <p className="text-gray-400 text-xs mb-6">Visualizing how averages skew by design styling (Sedans, SUVs, Supercars, Trucks).</p>
            </div>
            <div className="h-72 w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs">Loading bar chart...</div>
              ) : categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="category" stroke="#9ca3af" fontSize={10} />
                    <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip
                      formatter={(value: any) => [`$${value.toLocaleString()}`, 'Avg Price']}
                      contentStyle={{ backgroundColor: 'var(--cyber-card)', border: '1px solid var(--color-gray-800)', borderRadius: '12px' }}
                      labelStyle={{ color: '#9ca3af', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="avgPrice" radius={[6, 6, 0, 0]}>
                      {categoryData.map((_entry, index) => {
                        const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs">No category data available.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white">What Owners Are Saying</h2>
          <p className="text-gray-400 mt-2 text-sm">Discover feedback from EV owners who purchased through VoltDrive verified dealerships.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl border border-gray-800/40 relative">
              <span className="text-6xl text-cyber-purple/20 absolute top-4 left-6 font-serif select-none">“</span>
              <p className="text-gray-300 text-sm italic relative z-10 mb-6 leading-relaxed">
                {test.quote}
              </p>
              <div className="flex items-center space-x-3.5 pt-4 border-t border-gray-800/60">
                <img src={test.avatar} alt={test.name} className="h-10 w-10 rounded-full object-cover border border-cyber-cyan/35" />
                <div>
                  <h4 className="text-white font-bold text-sm">{test.name}</h4>
                  <p className="text-cyber-cyan text-xs font-semibold">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center">
            <HelpCircle className="h-7 w-7 mr-2.5 text-cyber-cyan" />
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Common inquiries about EV driving dynamics, range limits, and maintenance.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass rounded-xl border border-gray-800/40 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-white hover:text-cyber-cyan transition-colors duration-300 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-cyber-cyan' : ''}`} />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeFaq === idx ? 'max-h-48 border-t border-gray-900/50 bg-gray-950/20' : 'max-h-0'
                }`}
              >
                <p className="px-6 py-5 text-gray-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
