import React, { useState } from 'react';
import { BarChart, Card, Title, Text, TabGroup, Tab, AreaChart } from '@tremor/react';
import { AlertTriangle, TreePine, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';

const weeklyData = [
  { day: 'Lun', alerts: 8 },
  { day: 'Mar', alerts: 5 },
  { day: 'Mié', alerts: 12 },
  { day: 'Jue', alerts: 7 },
  { day: 'Vie', alerts: 10 },
  { day: 'Sáb', alerts: 4 },
  { day: 'Dom', alerts: 6 },
];

const monthlyData = [
  { month: 'Ene', alerts: 45, area: 156 },
  { month: 'Feb', alerts: 52, area: 178 },
  { month: 'Mar', alerts: 38, area: 129 },
  { month: 'Abr', alerts: 63, area: 202 },
  { month: 'May', alerts: 42, area: 145 },
];

const yearlyData = [
  { year: '2020', alerts: 423, area: 1245 },
  { year: '2021', alerts: 567, area: 1890 },
  { year: '2022', alerts: 489, area: 1567 },
  { year: '2023', alerts: 678, area: 2134 },
  { year: '2024', alerts: 240, area: 810 },
];

function Dashboard() {
  const [timeRange, setTimeRange] = useState(0);
  
  const getChartData = () => {
    switch(timeRange) {
      case 0: return weeklyData;
      case 1: return monthlyData;
      case 2: return yearlyData;
      default: return weeklyData;
    }
  };

  const getIndexKey = () => {
    switch(timeRange) {
      case 0: return 'day';
      case 1: return 'month';
      case 2: return 'year';
      default: return 'day';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-900 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
          <div className="flex items-center space-x-2">
            <span className="text-green-200">Última actualización: </span>
            <span className="text-white font-medium">Hace 5 minutos</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-green-400/50 backdrop-blur-sm border-green-700">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <div className="flex-1">
                <Text className="text-white">Alertas esta semana</Text>
                <div className="flex items-end justify-between">
                  <Title className="text-2xl text-white">24</Title>
                  <span className="text-red-400 flex items-center text-sm">
                    +12% <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-green-400/50 backdrop-blur-sm border-green-700">
            <div className="flex items-center space-x-4">
              <TreePine className="h-8 w-8 text-green-400" />
              <div className="flex-1">
                <Text className="text-white">Áreas afectadas</Text>
                <div className="flex items-end justify-between">
                  <Title className="text-2xl text-white">156 ha</Title>
                  <span className="text-red-400 flex items-center text-sm">
                    +8% <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-green-400/50 backdrop-blur-sm border-green-700">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-8 w-8 text-yellow-400" />
              <div className="flex-1">
                <Text className="text-white">Último reporte</Text>
                <div className="flex items-end justify-between">
                  <Title className="text-2xl text-white">Hace 2h</Title>
                  <span className="text-green-400 text-sm">En línea</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-green-400/50 backdrop-blur-sm border-green-700">
            <div className="mb-4">
              <Title className="text-white mb-2">Tendencia de Alertas</Title>
              <TabGroup index={timeRange} onIndexChange={setTimeRange}>
                <Tab className="text-white">Semanal</Tab>
                <Tab className="text-white">Mensual</Tab>
                <Tab className="text-white">Anual</Tab>
              </TabGroup>
            </div>
            <BarChart
              data={getChartData()}
              index={getIndexKey()}
              categories={["alerts"]}
              colors={["white"]}
              valueFormatter={(value) => `${value} alert.`}
              yAxisWidth={48}
              className="h-72 mt-4"
            />
          </Card>

          <Card className="bg-green-400/50 backdrop-blur-sm border-green-700">
            <Title className="text-white mb-6">Área Afectada vs Alertas</Title>
            <AreaChart
              data={monthlyData}
              index="month"
              categories={["area", "alerts"]}
              colors={["amber", "red"]}
              valueFormatter={(value) => `${value} ${value > 100 ? 'ha' : ''}`}
              yAxisWidth={48}
              className="h-72"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;