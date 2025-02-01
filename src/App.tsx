import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { AuthForm } from './components/AuthForm';
import { OrganizationSetup } from './components/OrganizationSetup';
import { WebsiteScraping } from './components/WebsiteScraping';
import { ChatbotIntegration } from './components/ChatbotIntegration';
import { User, Organization } from './types';

function App() {
  const [step, setStep] = useState<'auth' | 'org' | 'scraping' | 'integration'>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);

  const handleAuthComplete = (userData: User) => {
    setUser(userData);
    setStep('org');
  };

  const handleOrgComplete = (orgData: Organization) => {
    setOrg(orgData);
    setStep('scraping');
  };

  const handleScrapingComplete = () => {
    setStep('integration');
  };

  const handleIntegrationComplete = () => {
    // Redirect to admin panel or next step
    console.log('Setup complete!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BeyondChats</span>
            </div>
            {user && (
              <div className="flex items-center">
                <span className="text-gray-700">Welcome, {user.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {['auth', 'org', 'scraping', 'integration'].map((s, index) => (
                <React.Fragment key={s}>
                  {index > 0 && (
                    <div className={`h-1 w-12 ${
                      ['auth', 'org', 'scraping', 'integration'].indexOf(step) >= index 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    ['auth', 'org', 'scraping', 'integration'].indexOf(step) >= index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div className="flex justify-center">
            {step === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <AuthForm onComplete={handleAuthComplete} />
              </motion.div>
            )}

            {step === 'org' && (
              <motion.div
                key="org"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <OrganizationSetup onComplete={handleOrgComplete} />
              </motion.div>
            )}

            {step === 'scraping' && (
              <motion.div
                key="scraping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <WebsiteScraping onComplete={handleScrapingComplete} />
              </motion.div>
            )}

            {step === 'integration' && (
              <motion.div
                key="integration"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ChatbotIntegration onComplete={handleIntegrationComplete} />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;