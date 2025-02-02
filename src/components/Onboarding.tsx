import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Leaf, Trees, Bird, Fish, MoveHorizontal, Play } from 'lucide-react';

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to EcoSphere",
      description: "Your virtual ecosystem simulation platform",
      icon: <Leaf className="w-16 h-16 text-eco-green animate-float" />,
      content: "Create and manage your own virtual ecosystem with various elements like plants, animals, and water bodies."
    },
    {
      title: "Adding Elements",
      description: "Drag and drop elements",
      icon: <Trees className="w-16 h-16 text-eco-brown animate-float" />,
      content: "Simply drag elements from the control panel and drop them onto the canvas. You can add plants, trees, animals, and water sources."
    },
    {
      title: "Moving Elements",
      description: "Arrange your ecosystem",
      icon: <MoveHorizontal className="w-16 h-16 text-eco-blue animate-float" />,
      content: "Click and drag elements on the canvas to reposition them. Create the perfect arrangement for your ecosystem."
    },
    {
      title: "Start Simulation",
      description: "Bring your ecosystem to life",
      icon: <Play className="w-16 h-16 text-eco-green animate-float" />,
      content: "Use the weather controls to affect your ecosystem. Adjust sunlight, rainfall, and temperature to see how your ecosystem responds."
    }
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[90%] max-w-2xl p-8 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          {slides[currentSlide].icon}
          <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
          <p className="text-lg text-muted-foreground">{slides[currentSlide].description}</p>
          <p className="text-base">{slides[currentSlide].content}</p>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-eco-green' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <Button onClick={handleNext} className="bg-eco-green hover:bg-eco-green/90">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;