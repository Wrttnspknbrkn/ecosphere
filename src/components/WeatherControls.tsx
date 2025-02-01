import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Cloud, Sun, Droplets, Thermometer } from 'lucide-react';
import { toast } from './ui/use-toast';

const WeatherControls = () => {
  const [sunlight, setSunlight] = useState(75);
  const [rainfall, setRainfall] = useState(50);
  const [temperature, setTemperature] = useState(22);

  const handleApplyChanges = () => {
    // In future versions, this will affect the ecosystem simulation
    toast({
      title: "Weather Updated",
      description: `Applied new weather conditions: ${sunlight}% sunlight, ${rainfall}% rainfall, ${temperature}°C`,
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-semibold font-poppins">Weather Controls</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-eco-sand" />
              <span>Sunlight</span>
            </div>
            <span className="text-sm text-muted-foreground">{sunlight}%</span>
          </div>
          <Slider 
            value={[sunlight]} 
            onValueChange={(value) => setSunlight(value[0])} 
            max={100} 
            step={1} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-eco-blue" />
              <span>Rainfall</span>
            </div>
            <span className="text-sm text-muted-foreground">{rainfall}%</span>
          </div>
          <Slider 
            value={[rainfall]} 
            onValueChange={(value) => setRainfall(value[0])} 
            max={100} 
            step={1} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-eco-brown" />
              <span>Temperature</span>
            </div>
            <span className="text-sm text-muted-foreground">{temperature}°C</span>
          </div>
          <Slider 
            value={[temperature]} 
            onValueChange={(value) => setTemperature(value[0])} 
            max={40} 
            step={1} 
          />
        </div>
      </div>

      <div className="pt-2">
        <Button 
          className="w-full bg-eco-green hover:bg-eco-green/90"
          onClick={handleApplyChanges}
        >
          <Cloud className="w-4 h-4 mr-2" />
          Apply Changes
        </Button>
      </div>
    </Card>
  );
};

export default WeatherControls;