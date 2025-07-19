"use client";

import { useState, useEffect } from "react";

export function AngularMFELoader() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAngularMFE = async () => {
      try {
        setIsLoading(true);
        
        // In production, show demo mode if Module Federation is not available
        if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ENABLE_MODULE_FEDERATION !== 'true') {
          setError('demo-mode');
          return;
        }
        
        // Attempt to load the Angular MFE
        const response = await fetch('http://localhost:4201/remoteEntry.js');
        if (response.ok) {
          // For now, we'll show a success state
          // In a real implementation, this would dynamically import the component
          setError(null);
        } else {
          throw new Error('Angular MFE not available');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAngularMFE();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-2 text-slate-600">Loading Angular MFE...</span>
      </div>
    );
  }

  if (error) {
    if (error === 'demo-mode') {
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">Angular MFE Demo Mode</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This is a production demo showing the micro-frontend architecture. 
            Module Federation is disabled in production builds for this demo.
          </p>
          <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4">
            <div className="text-center text-slate-500">
              <p className="mb-2">📱 Angular Component Demo</p>
              <div className="text-sm space-y-1">
                <p>• Standalone Angular components</p>
                <p>• TypeScript integration</p>
                <p>• Custom webpack configuration</p>
                <p>• Module Federation: 🔧 Demo Mode</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
          <h4 className="font-semibold text-red-700 dark:text-red-300">Angular MFE Unavailable</h4>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
          Make sure the Angular MFE is running on port 4201
        </p>
        <p className="text-xs text-slate-500 mt-1">Error: {error}</p>
        <div className="mt-4 text-sm text-slate-600">
          <p className="font-medium">To start the Angular MFE:</p>
          <code className="block bg-slate-100 dark:bg-slate-700 p-2 rounded mt-1">
            cd angular-mfe && npm run dev
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
        <h4 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Angular MFE Connected! 🎉
        </h4>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        The Angular micro-frontend is running and accessible via Module Federation.
      </p>
      <div className="border-2 border-dashed border-red-300 dark:border-red-600 rounded-lg p-4">
        <div className="text-center text-slate-500">
          <p className="mb-2">🚀 Angular Component Would Load Here</p>
          <div className="text-sm space-y-1">
            <p>• Standalone Angular components</p>
            <p>• TypeScript integration</p>
            <p>• Custom webpack configuration</p>
            <p>• Module Federation: ✅ Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SvelteMFELoader() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSvelteMFE = async () => {
      try {
        setIsLoading(true);
        
        // In production, show demo mode if Module Federation is not available
        if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ENABLE_MODULE_FEDERATION !== 'true') {
          setError('demo-mode');
          return;
        }
        
        // Attempt to load the Svelte MFE
        const response = await fetch('http://localhost:4173/remoteEntry.js');
        if (response.ok) {
          // For now, we'll show a success state
          // In a real implementation, this would dynamically import the component
          setError(null);
        } else {
          throw new Error('Svelte MFE not available');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSvelteMFE();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2 text-slate-600">Loading Svelte MFE...</span>
      </div>
    );
  }

  if (error) {
    if (error === 'demo-mode') {
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">Svelte MFE Demo Mode</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This is a production demo showing the micro-frontend architecture. 
            Module Federation is disabled in production builds for this demo.
          </p>
          <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4">
            <div className="text-center text-slate-500">
              <p className="mb-2">⚡ Svelte Component Demo</p>
              <div className="text-sm space-y-1">
                <p>• Reactive Svelte components</p>
                <p>• Vite build optimization</p>
                <p>• TypeScript support</p>
                <p>• Module Federation: 🔧 Demo Mode</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
          <h4 className="font-semibold text-orange-700 dark:text-orange-300">Svelte MFE Unavailable</h4>
        </div>
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          Make sure the Svelte MFE is running on port 4173
        </p>
        <p className="text-xs text-slate-500 mt-1">Error: {error}</p>
        <div className="mt-4 text-sm text-slate-600">
          <p className="font-medium">To start the Svelte MFE:</p>
          <code className="block bg-slate-100 dark:bg-slate-700 p-2 rounded mt-1">
            cd svelte-mfe && npm run dev
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
        <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
          Svelte MFE Connected! 🎉
        </h4>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        The Svelte micro-frontend is running and accessible via Module Federation.
      </p>
      <div className="border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-lg p-4">
        <div className="text-center text-slate-500">
          <p className="mb-2">⚡ Svelte Component Would Load Here</p>
          <div className="text-sm space-y-1">
            <p>• Reactive Svelte components</p>
            <p>• Vite build optimization</p>
            <p>• TypeScript support</p>
            <p>• Module Federation: ✅ Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}