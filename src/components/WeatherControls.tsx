import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Cloud, Sun, Droplets, Thermometer } from 'lucide-react';

const WeatherControls = () => {
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
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
          <Slider defaultValue={[75]} max={100} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-eco-blue" />
              <span>Rainfall</span>
            </div>
            <span className="text-sm text-muted-foreground">50%</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-eco-brown" />
              <span>Temperature</span>
            </div>
            <span className="text-sm text-muted-foreground">22°C</span>
          </div>
          <Slider defaultValue={[22]} max={40} step={1} />
        </div>
      </div>

      <div className="pt-2">
        <Button className="w-full bg-eco-green hover:bg-eco-green/90">
          <Cloud className="w-4 h-4 mr-2" />
          Apply Changes
        </Button>
      </div>
    </Card>
  );
};

export default WeatherControls;