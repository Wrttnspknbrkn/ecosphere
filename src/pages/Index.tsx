import React from 'react';
import EcosystemCanvas from '@/components/EcosystemCanvas';
import WeatherControls from '@/components/WeatherControls';

const Index = () => {
  return (
    <div className="min-h-screen eco-gradient p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-eco-green font-poppins">
            EcoSphere
          </h1>
          <p className="text-lg text-muted-foreground">
            Build and manage your virtual ecosystem
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <EcosystemCanvas />
          </div>
          <div>
            <WeatherControls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;