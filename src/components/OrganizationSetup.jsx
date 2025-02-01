import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrganizationSetup({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate meta description fetch
    if (formData.website) {
      toast.success('Website meta description fetched successfully!');
      setFormData(prev => ({
        ...prev,
        description: prev.description || 'Auto-generated description for ' + prev.name
      }));
    }
    onComplete(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Setup Organization</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Company Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              placeholder="Company Website URL"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              placeholder="Company Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}