"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Info, Lock, Eye, EyeOff, MapPin, AlertTriangle } from 'lucide-react';

// Datos de rutas (matriz completa)
const routeData = {
  "SJO → La Fortuna": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },
  "La Fortuna → SJO": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },
  
  "SJO → Santa Teresa (con ferry)": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5-2h a Puntarenas + 1.5h ferry + espera + 1.5h a Santa Teresa. Reservar ferry con anticipación." },
  "SJO → Santa Teresa (sin ferry)": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles. Solo considerar si se pierde ferry." },
  "Santa Teresa (con ferry) → SJO": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5h a Paquera + 1.5h ferry + espera + 1.5-2h a San José." },
  "Santa Teresa (sin ferry) → SJO": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles." },
  
  "SJO → Puerto Viejo": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). Últimos km con baches. NO conducir de noche." },
  "Puerto Viejo → SJO": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). NO conducir de noche." },
  
  "SJO → Monteverde": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada." },
  "Monteverde → SJO": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada." },
  
  "La Fortuna → Santa Teresa (con ferry)": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: La Fortuna → Puntarenas → Ferry Paquera → Santa Teresa. Incluye esperas." },
  "La Fortuna → Santa Teresa (sin ferry)": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles y cruces de ríos (requiere 4x4)." },
  "Santa Teresa (con ferry) → La Fortuna": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: Santa Teresa → Ferry Paquera → Puntarenas → La Fortuna." },
  "Santa Teresa (sin ferry) → La Fortuna": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles." },
  
  "La Fortuna → Puerto Viejo": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo." },
  "Puerto Viejo → La Fortuna": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo." },
  
  "La Fortuna → Monteverde": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar. Requiere 4x4 en lluvias." },
  "Monteverde → La Fortuna": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar." },
  
  "Santa Teresa (con ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país. Requiere volver hacia San José. No hay ruta directa." },
  "Santa Teresa (sin ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente." },
  "Puerto Viejo → Santa Teresa (con ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país." },
  "Puerto Viejo → Santa Teresa (sin ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente." },
  
  "Santa Teresa (con ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Desde Santa Teresa hacia el norte de la península, luego a Monteverde. Caminos mixtos." },
  "Santa Teresa (sin ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos." },
  "Monteverde → Santa Teresa (con ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos hacia península." },
  "Monteverde → Santa Teresa (sin ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos." },
  
  "Puerto Viejo → Monteverde": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José o rutas alternativas." },
  "Monteverde → Puerto Viejo": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José." },
};

const CORRECT_PASSWORD = "costarica2026";

export default function CostaRicaPlanner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [stops, setStops] = useState([
    { id: 1, location: 'SJO', ferryOption: 'con ferry' },
  ]);
  const [nextId, setNextId] = useState(2);

  const destinations = ['SJO', 'La Fortuna', 'Santa Teresa', 'Puerto Viejo', 'Monteverde'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const addStop = () => {
    setStops([...stops, { id: nextId, location: 'SJO', ferryOption: 'con ferry' }]);
    setNextId(nextId + 1);
  };

  const removeStop = (id) => {
    if (stops.length > 1) {
      setStops(stops.filter(stop => stop.id !== id));
    }
  };

  const updateStop = (id, field, value) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const getRouteKey = (from, to, ferryFrom, ferryTo) => {
    let fromKey = from;
    let toKey = to;
    
    if (from === 'Santa Teresa') {
      fromKey = `Santa Teresa (${ferryFrom})`;
    }
    if (to === 'Santa Teresa') {
      toKey = `Santa Teresa (${ferryTo})`;
    }
    
    return `${fromKey} → ${toKey}`;
  };

  const calculateTotals = () => {
    let minTotal = 0, maxTotal = 0, recTotal = 0;
    const legs = [];

    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i].location;
      const to = stops[i + 1].location;
      const ferryFrom = stops[i].ferryOption;
      const ferryTo = stops[i + 1].ferryOption;

      const routeKey = getRouteKey(from, to, ferryFrom, ferryTo);
      const route = routeData[routeKey];

      if (route) {
        minTotal += route.min;
        maxTotal += route.max;
        recTotal += route.rec;
        legs.push({ from, to, ...route, ferryFrom, ferryTo });
      }
    }

    return { minTotal, maxTotal, recTotal, legs };
  };

  const { minTotal, maxTotal, recTotal, legs } = calculateTotals();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
              <Lock className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Costa Rica Trip Planner</h1>
            <p className="text-gray-600">Planificador colaborativo de ruta en coche</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña de acceso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="Introduce la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
            >
              Acceder
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Comparte la contraseña con tus amigos de viaje para que puedan acceder al planificador.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">🚗 Costa Rica Road Trip</h1>
            <p className="text-emerald-100">Calculadora de tiempos de conducción</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Warnings */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Advertencias importantes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>NO conducir de noche (oscurece a las 6 PM todo el año)</li>
                    <li>Tráfico en San José: añadir 30-60 min en horas pico</li>
                    <li>Temporada de lluvias (Mayo-Nov): tiempos +20-30%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Route Builder */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Selecciona tu ruta</h2>
              
              <div className="space-y-3">
                {stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    
                    <select
                      value={stop.location}
                      onChange={(e) => updateStop(stop.id, 'location', e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {destinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>

                    {stop.location === 'Santa Teresa' && (
                      <select
                        value={stop.ferryOption}
                        onChange={(e) => updateStop(stop.id, 'ferryOption', e.target.value)}
                        className="px-4 py-2 border-2 border-blue-300 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="con ferry">Con ferry</option>
                        <option value="sin ferry">Sin ferry</option>
                      </select>
                    )}

                    {stops.length > 1 && (
                      <button
                        onClick={() => removeStop(stop.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addStop}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition shadow-md"
              >
                <Plus size={20} />
                Añadir parada
              </button>
            </div>

            {/* Results */}
            {legs.length > 0 && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                    <div className="text-sm font-semibold text-green-700 mb-1">Tiempo mínimo</div>
                    <div className="text-3xl font-bold text-green-800">{minTotal.toFixed(1)}h</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                    <div className="text-sm font-semibold text-blue-700 mb-1">Tiempo recomendado</div>
                    <div className="text-3xl font-bold text-blue-800">{recTotal.toFixed(1)}h</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200">
                    <div className="text-sm font-semibold text-red-700 mb-1">Tiempo máximo</div>
                    <div className="text-3xl font-bold text-red-800">{maxTotal.toFixed(1)}h</div>
                  </div>
                </div>

                {/* Detailed Legs */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin size={24} className="text-emerald-600" />
                    Desglose por tramo
                  </h3>
                  
                  <div className="space-y-4">
                    {legs.map((leg, index) => (
                      <div key={index} className="bg-white p-5 rounded-lg border-2 border-gray-200 hover:border-emerald-300 transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 text-lg mb-1">
                              {leg.from} → {leg.to}
                              {(leg.from === 'Santa Teresa' || leg.to === 'Santa Teresa') && (
                                <span className="ml-2 text-sm font-normal text-blue-600">
                                  ({leg.from === 'Santa Teresa' ? leg.ferryFrom : leg.ferryTo})
                                </span>
                              )}
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span className="text-green-700">Min: {leg.min}h</span>
                              <span className="text-blue-700 font-semibold">Rec: {leg.rec}h</span>
                              <span className="text-red-700">Max: {leg.max}h</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          <Info size={16} className="mt-0.5 flex-shrink-0 text-blue-600" />
                          <p>{leg.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Ferry Info */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">ℹ️ Info del Ferry Puntarenas-Paquera</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Duración travesía:</strong> 70-80 minutos</p>
                <p><strong>Llegar antes:</strong> 40-60 minutos</p>
                <p><strong>Costo aprox:</strong> $24 USD vehículo + conductor</p>
                <p><strong>Horarios:</strong> 6 salidas diarias</p>
                <p className="pt-2 border-t border-blue-200"><strong>⚠️ Importante:</strong> Reservar con anticipación en temporada alta en <a href="https://www.quickpaycr.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">QuickPay</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>Tiempos calculados en base a múltiples fuentes validadas • Última actualización: Enero 2025</p>
        </div>
      </div>
    </div>
  );
}
