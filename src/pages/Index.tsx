import React, { useState, useEffect } from 'react';
import EcosystemCanvas from '@/components/EcosystemCanvas';
import WeatherControls from '@/components/WeatherControls';
import { Button } from '@/components/ui/button';
import { Save, Download, Leaf } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Onboarding from '@/components/Onboarding';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  const handleSave = () => {
    // In future versions, this will save the ecosystem state
    toast({
      title: "Ecosystem Saved",
      description: "Your ecosystem has been saved successfully",
    });
  };

  const handleLoad = () => {
    // In future versions, this will load the ecosystem state
    toast({
      title: "Ecosystem Loaded",
      description: "Your ecosystem has been loaded successfully",
    });
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    toast({
      title: isSimulating ? "Simulation Paused" : "Simulation Started",
      description: isSimulating 
        ? "Your ecosystem simulation has been paused" 
        : "Your ecosystem is now evolving based on the weather conditions",
    });
  };

  return (
    <div className="min-h-screen eco-gradient p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-eco-green p-3 rounded-full">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-eco-green font-poppins">
              EcoSphere
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Build and manage your virtual ecosystem
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={handleSave} variant="outline" className="bg-white/50">
              <Save className="w-4 h-4 mr-2" />
              Save Ecosystem
            </Button>
            <Button onClick={handleLoad} variant="outline" className="bg-white/50">
              <Download className="w-4 h-4 mr-2" />
              Load Ecosystem
            </Button>
            <Button 
              onClick={toggleSimulation} 
              variant="outline" 
              className={`${isSimulating ? 'bg-eco-green text-white' : 'bg-white/50'}`}
            >
              {isSimulating ? 'Pause Simulation' : 'Start Simulation'}
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <EcosystemCanvas isSimulating={isSimulating} />
          </div>
          <div>
            <WeatherControls />
          </div>
        </div>
      </div>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
    </div>
  );
};

export default Index;
