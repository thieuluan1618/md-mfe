"use client";

import { Suspense, lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { AngularMFELoader, SvelteMFELoader } from "@/components/MFELoader";

export default function Home() {
  const [showAngular, setShowAngular] = useState(false);
  const [showSvelte, setShowSvelte] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Micro-Frontend Architecture Demo
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Next.js Shell orchestrating Angular & Svelte applications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Architecture Overview */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-semibold mb-4">Architecture Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Shell Application</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Next.js 15 + React 19</p>
                <p className="text-xs text-slate-500">Port: 3000</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                <div className="w-12 h-12 bg-red-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <h3 className="font-semibold text-red-700 dark:text-red-300">Angular MFE</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Angular 20+ + TypeScript</p>
                <p className="text-xs text-slate-500">Port: 4201</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Svelte MFE</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Svelte 4 + Vite</p>
                <p className="text-xs text-slate-500">Port: 4173</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demos */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">Live Micro-Frontend Demonstrations</h2>
          
          {/* Angular MFE Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">Angular Micro-Frontend</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Dynamically loaded from http://localhost:4201
                  </p>
                </div>
                <Button 
                  onClick={() => setShowAngular(!showAngular)}
                  variant={showAngular ? "destructive" : "default"}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {showAngular ? "Hide Angular MFE" : "Load Angular MFE"}
                </Button>
              </div>
            </div>
            
            {showAngular && (
              <div className="p-6">
                <AngularMFELoader />
              </div>
            )}
          </div>

          {/* Svelte MFE Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300">Svelte Micro-Frontend</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Dynamically loaded from http://localhost:4173
                  </p>
                </div>
                <Button 
                  onClick={() => setShowSvelte(!showSvelte)}
                  variant={showSvelte ? "destructive" : "default"}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {showSvelte ? "Hide Svelte MFE" : "Load Svelte MFE"}
                </Button>
              </div>
            </div>
            
            {showSvelte && (
              <div className="p-6">
                <SvelteMFELoader />
              </div>
            )}
          </div>
        </section>

        {/* Status Section */}
        <section className="mt-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold mb-4">Development Status</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Shell Application: Running</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Angular MFE: Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Svelte MFE: Ready</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
              All micro-frontends are configured with Module Federation and ready for integration.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-slate-600 dark:text-slate-400">
          <p>Micro-Frontend Architecture Demo • Module Federation • Independent Development</p>
        </div>
      </footer>
    </div>
  );
}
