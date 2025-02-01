import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { Page } from '../types';

interface WebsiteScrapingProps {
  onComplete: () => void;
}

const dummyPages: Page[] = [
  {
    url: '/about',
    status: 'scraped',
    title: 'About Us',
    chunks: [
      'Our company was founded in 2020...',
      'We specialize in AI-powered solutions...',
      'Our mission is to revolutionize...',
    ],
  },
  {
    url: '/services',
    status: 'scraped',
    title: 'Our Services',
    chunks: [
      'We offer cutting-edge AI solutions...',
      'Custom chatbot development...',
      'Enterprise integration services...',
    ],
  },
  {
    url: '/contact',
    status: 'pending',
    title: 'Contact Us',
    chunks: [],
  },
  {
    url: '/blog/ai-future',
    status: 'failed',
    title: 'The Future of AI',
    chunks: [],
  },
];

export function WebsiteScraping({ onComplete }: WebsiteScrapingProps) {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [progress, setProgress] = useState(60);

  // Simulate progress
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Website Scraping</h2>
        <button
          onClick={onComplete}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Setup
        </button>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {progress}% complete - {dummyPages.filter(p => p.status === 'scraped').length} pages scraped
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Detected Pages</h3>
          <div className="space-y-3">
            {dummyPages.map((page) => (
              <motion.div
                key={page.url}
                whileHover={{ x: 5 }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  selectedPage?.url === page.url ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPage(page)}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(page.status)}
                  <span className="text-gray-700">{page.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">
            {selectedPage ? 'Page Content' : 'Select a page to view content'}
          </h3>
          {selectedPage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{selectedPage.url}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              {selectedPage.status === 'scraped' ? (
                <div className="space-y-3">
                  {selectedPage.chunks.map((chunk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                    >
                      {chunk}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedPage.status === 'pending'
                    ? 'Page is currently being processed...'
                    : 'Failed to process this page'}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click on a page from the left to view its content
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}