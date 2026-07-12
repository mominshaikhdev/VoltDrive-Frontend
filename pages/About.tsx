import { ShieldCheck, Compass, Zap } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Verified EV Listings', value: '1,200+' },
    { label: 'Dealership Network', value: '80+' },
    { label: 'Avg User Rating', value: '4.9/5' }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Performance First',
      desc: 'We analyze vehicles using raw scientific outputs—instant torque speeds, DC charging efficiencies, and battery decay curves.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Datasets',
      desc: 'No placeholder specs. Every rating, acceleration metric, and charging capability listed is matched against verified real-world telemetry.'
    },
    {
      icon: Compass,
      title: 'Independent Metrics',
      desc: 'We offer unbiased, data-backed comparisons helping you locate value and battery ranges suited to your daily commute.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 relative">
      <div className="radial-bg top-[-5%] left-[-10%]" />
      <div className="radial-bg bottom-[10%] right-[-10%]" />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-cyber-cyan uppercase tracking-widest bg-cyber-cyan/5 border border-cyber-cyan/15 px-3.5 py-1 rounded-full">
          About VoltDrive
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Accelerating the <span className="text-gradient">Electric Transition</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          VoltDrive is an independent, high-performance database and marketplace tracking the specs, price margins, and battery analytics of the worlds most innovative electric vehicles.
        </p>
      </section>

      {/* Stats Counter */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-8 rounded-2xl border border-gray-800/40 text-center space-y-2 hover:border-cyber-cyan/20 transition-all duration-300">
            <p className="text-4xl md:text-5xl font-extrabold text-gradient">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Core values */}
      <section className="space-y-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">Our Core Operating Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="glass p-6.5 rounded-2xl border border-gray-950 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple">
                <val.icon className="h-5 w-5" />
              </div>
              <h3 className="text-white font-bold text-lg">{val.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Block */}
      <section className="glass p-8 rounded-2xl border border-gray-800/40 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white">The Engineering Team</h2>
          <p className="text-gray-400 text-xs">A small, passionate group of battery engineers and full stack developers based in Austin, Texas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              alt="Lead Architect"
              className="h-20 w-20 rounded-full object-cover border border-cyber-cyan/35"
            />
            <div>
              <h4 className="text-white font-bold text-sm">Dr. Sarah Jenkins</h4>
              <p className="text-cyber-cyan text-xs font-semibold">Chief Battery Scientist & Co-Founder</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
              alt="Lead Engineer"
              className="h-20 w-20 rounded-full object-cover border border-cyber-purple/35"
            />
            <div>
              <h4 className="text-white font-bold text-sm">Marcus Vance</h4>
              <p className="text-cyber-purple text-xs font-semibold">Lead Full Stack Architect</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
