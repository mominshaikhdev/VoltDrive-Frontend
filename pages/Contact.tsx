import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative">
      <div className="radial-bg top-[-5%] right-[-10%]" />

      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Contact Our Team</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Have questions about a listing, dealer integration, or API metrics? We are here to assist.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Info & Map Placeholder */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass p-6 rounded-2xl border border-gray-800/40 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-cyber-cyan" />
              General Inquiries
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5 text-sm text-gray-300">
                <MapPin className="h-5 w-5 text-cyber-purple shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Austin Headquarters</p>
                  <p className="text-xs text-gray-400">100 Tesla Road, Austin, TX 78725</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-sm text-gray-300">
                <Phone className="h-5 w-5 text-cyber-purple shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Line</p>
                  <p className="text-xs text-gray-400">+1 (512) 555-0199 (Mon-Fri 9AM-5PM CST)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-sm text-gray-300">
                <Mail className="h-5 w-5 text-cyber-purple shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Electronic Mail</p>
                  <p className="text-xs text-gray-400">support@voltdrive.com / media@voltdrive.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-56 rounded-2xl border border-gray-900 bg-gray-950/80 overflow-hidden flex flex-col justify-center items-center text-center p-6 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600')` }} />
            <MapPin className="h-10 w-10 text-cyber-cyan mb-2.5 animate-bounce relative z-10" />
            <h4 className="font-bold text-white text-sm relative z-10">Interactive Map View</h4>
            <p className="text-[10px] text-gray-500 max-w-xs mt-1 relative z-10">Austin Innovation Hub, TX. Satellite tracking active.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 glass p-8 rounded-2xl border border-gray-800/40 space-y-6">
          <h3 className="text-xl font-bold text-white">Send Message</h3>

          {submitted && (
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-sm rounded-xl flex items-center">
              <CheckCircle className="h-5 w-5 mr-2.5 shrink-0" />
              <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
                className="input-field text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Message Details</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm rounded-xl bg-gray-950/60 border border-gray-800 text-cyber-text focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 flex items-center justify-center cursor-pointer"
            >
              <Send className="h-4.5 w-4.5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
