import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Calendar, AlertTriangle, Filter } from 'lucide-react';

// Sample alert data
const alerts = [
  { 
    id: 1, 
    lat: -5.1894, 
    lng: -73.5135, 
    date: '2024-03-20', 
    severity: 'Alta',
    area: 45,
    description: 'Tala ilegal detectada por drones de vigilancia',
    status: 'En proceso'
  },
  { 
    id: 2, 
    lat: -4.9894, 
    lng: -73.2135, 
    date: '2024-03-19', 
    severity: 'Media',
    area: 28,
    description: 'Actividad sospechosa reportada por comunidad local',
    status: 'Verificado'
  },
  { 
    id: 3, 
    lat: -5.3894, 
    lng: -73.7135, 
    date: '2024-03-18', 
    severity: 'Alta',
    area: 62,
    description: 'Deforestación detectada por imágenes satelitales',
    status: 'Crítico'
  },
];

// Custom icon for markers
const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map() {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity.toLowerCase() === filter.toLowerCase();
  });

  const getCircleColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-900 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Mapa de Alertas
          </h1>
          
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-green-800/50 text-white border border-green-700 rounded-lg px-4 py-2"
            >
              <option value="all">Todas las alertas</option>
              <option value="alta">Severidad Alta</option>
              <option value="media">Severidad Media</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-green-800/50 backdrop-blur-sm rounded-lg p-6">
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                center={[-5.1894, -73.5135]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {filteredAlerts.map((alert) => (
                  <React.Fragment key={alert.id}>
                    <Marker
                      position={[alert.lat, alert.lng]}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setSelectedAlert(alert)
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-bold mb-1">Alerta #{alert.id}</p>
                          <p>Fecha: {alert.date}</p>
                          <p>Severidad: {alert.severity}</p>
                          <p>Área: {alert.area} ha</p>
                        </div>
                      </Popup>
                    </Marker>
                    <Circle
                      center={[alert.lat, alert.lng]}
                      radius={alert.area * 100}
                      pathOptions={{
                        color: getCircleColor(alert.severity),
                        fillColor: getCircleColor(alert.severity),
                        fillOpacity: 0.2
                      }}
                    />
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-4">
            {selectedAlert ? (
              <div className="bg-green-800/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Detalles de Alerta #{selectedAlert.id}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Calendar className="h-5 w-5 mr-2 text-green-400" />
                    <span>{selectedAlert.date}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                    <span>Severidad {selectedAlert.severity}</span>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold mb-1">Descripción:</p>
                    <p>{selectedAlert.description}</p>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold mb-1">Estado:</p>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      selectedAlert.status === 'Crítico' ? 'bg-red-900' :
                      selectedAlert.status === 'En proceso' ? 'bg-yellow-900' :
                      'bg-green-900'
                    }`}>
                      {selectedAlert.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
                <Filter className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-white">Selecciona una alerta en el mapa para ver sus detalles</p>
              </div>
            )}

            <div className="bg-green-800/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Resumen
              </h3>
              <div className="space-y-2">
                <p className="text-white">Total de alertas: {filteredAlerts.length}</p>
                <p className="text-white">
                  Área total afectada: {filteredAlerts.reduce((sum, alert) => sum + alert.area, 0)} ha
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;