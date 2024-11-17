import React from 'react';
import { TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449823984592-d669e610d3e9')] bg-cover bg-center">
          <div className="absolute inset-0 bg-green-950/70 backdrop-blur-sm"></div>
        </div>
        {/* Floating Elements Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <TreePine className="text-green-500/20 w-8 h-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="bg-green-950/60 backdrop-blur-md rounded-xl p-8 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <TreePine className="h-16 w-16 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BioAlert
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Sistema de monitoreo y alerta contra la tala ilegal en la selva peruana
          </p>
          <div className="space-y-4">
            <p className="text-green-200">
              Mapeo en tiempo real • Análisis de datos • Protección forestal
            </p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Comenzar monitoreo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;