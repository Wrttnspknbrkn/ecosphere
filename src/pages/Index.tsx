import React, { useEffect } from 'react';
import EcosystemCanvas from '@/components/EcosystemCanvas';
import WeatherControls from '@/components/WeatherControls';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
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
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={handleSave} variant="outline" className="bg-white/50">
              <Save className="w-4 h-4 mr-2" />
              Save Ecosystem
            </Button>
            <Button onClick={handleLoad} variant="outline" className="bg-white/50">
              <Download className="w-4 h-4 mr-2" />
              Load Ecosystem
            </Button>
          </div>
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