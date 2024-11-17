import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Sample alert data
  const alerts = {
    "2024-03-15": { count: 3, severity: "alta" },
    "2024-03-18": { count: 2, severity: "media" },
    "2024-03-20": { count: 5, severity: "alta" },
  };

  const days = [];
  let currentDay = firstDayOfMonth;

  while (currentDay <= lastDayOfMonth) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'alta': return 'bg-red-900/40 border-red-700';
      case 'media': return 'bg-yellow-900/40 border-yellow-700';
      default: return 'bg-green-900/20 border-green-800';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-900 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Calendario de Alertas
        </h1>
        
        <div className="bg-green-800/50 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-green-700/50 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <h2 className="text-2xl font-bold text-white">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-green-700/50 rounded-lg transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-green-200 font-semibold">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="h-24 rounded-lg"></div>
            ))}
            
            {days.map((date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const dayAlerts = alerts[dateStr];
              
              return (
                <div
                  key={dateStr}
                  className={`h-24 rounded-lg p-2 transition-all hover:transform hover:scale-105 cursor-pointer
                    ${dayAlerts ? getSeverityColor(dayAlerts.severity) : 'bg-green-900/20 border border-green-800'}`}
                >
                  <div className="text-white font-medium">
                    {format(date, 'd')}
                  </div>
                  {dayAlerts && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-red-400 text-sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span>{dayAlerts.count} alertas</span>
                      </div>
                      <div className="text-xs text-yellow-300 capitalize">
                        Severidad: {dayAlerts.severity}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
              <span className="text-white text-sm">Alta severidad</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
              <span className="text-white text-sm">Media severidad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;