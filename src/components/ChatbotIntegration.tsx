import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Mail, MessageSquare, Share2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface ChatbotIntegrationProps {
  onComplete: () => void;
}

export function ChatbotIntegration({ onComplete }: ChatbotIntegrationProps) {
  const [step, setStep] = useState<'options' | 'testing' | 'success'>('options');
  const [isIntegrated, setIsIntegrated] = useState(false);

  const handleTestChatbot = () => {
    window.open('https://example.com?preview=true', '_blank');
  };

  const handleEmailInstructions = () => {
    toast.success('Integration instructions sent to developer!');
  };

  const handleTestIntegration = () => {
    // Simulate integration check
    setTimeout(() => {
      setIsIntegrated(true);
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  const handleShare = (platform: string) => {
    toast.success(`Shared to ${platform}!`);
  };

  const integrationCode = `<script>
  window.BEYONDCHATS_CONFIG = {
    orgId: "your-org-id",
    theme: "light"
  };
</script>
<script async src="https://cdn.beyondchats.com/widget.js"></script>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl"
    >
      {step === 'options' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Chatbot Integration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border rounded-xl hover:shadow-lg transition-all cursor-pointer"
              onClick={handleTestChatbot}
            >
              <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Test Chatbot</h3>
              <p className="text-gray-600">Preview your chatbot in action before integration</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border rounded-xl hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setStep('testing')}
            >
              <Code className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrate Now</h3>
              <p className="text-gray-600">Get the code snippet or send to your developer</p>
            </motion.div>
          </div>
        </div>
      )}

      {step === 'testing' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Integration Setup</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Add this code to your website</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">{integrationCode}</pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEmailInstructions}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Email to Developer</span>
              </button>

              <button
                onClick={handleTestIntegration}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Integration
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && isIntegrated && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Integration Successful! 🎉</h2>
            <p className="text-gray-600">Your chatbot is now live and ready to help your customers</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Admin Panel
            </button>
            <button
              onClick={handleTestChatbot}
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Talking to Your Chatbot
            </button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-gray-600 mb-4">Share your success</p>
            <div className="flex justify-center space-x-4">
              {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                <motion.button
                  key={platform}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleShare(platform)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}