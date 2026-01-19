"use client";

import React, { useState, useEffect } from 'react';
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

  const [theme, setTheme] = useState('light');

  const [stops, setStops] = useState([
    { id: 1, location: 'SJO', ferryOption: 'con ferry' },
  ]);
  const [nextId, setNextId] = useState(2);

  const destinations = ['SJO', 'La Fortuna', 'Santa Teresa', 'Puerto Viejo', 'Monteverde'];

  /* ================= DARK MODE ================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* ================= LOGIC ================= */

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
    if (from === 'Santa Teresa') fromKey = `Santa Teresa (${ferryFrom})`;
    if (to === 'Santa Teresa') toKey = `Santa Teresa (${ferryTo})`;
    return `${fromKey} → ${toKey}`;
  };

  const calculateTotals = () => {
    let minTotal = 0, maxTotal = 0, recTotal = 0;
    const legs = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const route = routeData[getRouteKey(
        stops[i].location,
        stops[i + 1].location,
        stops[i].ferryOption,
        stops[i + 1].ferryOption
      )];
      if (route) {
        minTotal += route.min;
        maxTotal += route.max;
        recTotal += route.rec;
        legs.push(route);
      }
    }
    return { minTotal, maxTotal, recTotal, legs };
  };

  const { minTotal, maxTotal, recTotal, legs } = calculateTotals();

  /* ================= LOGIN ================= */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-emerald-50 to-teal-100
        dark:from-zinc-900 dark:to-zinc-950 transition-colors p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100 mb-4 text-center">
            Costa Rica Trip Planner
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-zinc-800
                text-gray-800 dark:text-zinc-100"
              placeholder="Contraseña"
            />
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg">
              Acceder
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  /* ================= MAIN ================= */

  return (
    <div className="min-h-screen p-4 md:p-8
      bg-gradient-to-br from-emerald-50 to-teal-100
      dark:from-zinc-900 dark:to-zinc-950 transition-colors">

      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden
          shadow-2xl dark:shadow-[0_0_40px_rgba(16,185,129,0.15)]">

          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h1 className="text-3xl font-bold">🚗 Costa Rica Road Trip</h1>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="absolute top-6 right-6 px-4 py-2 rounded-full
                bg-white/10 border border-white/20 backdrop-blur
                shadow-lg shadow-emerald-500/30">
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="p-6 md:p-8 text-gray-800 dark:text-zinc-100">
            <p className="mb-4">
              Tiempo recomendado total: <strong>{recTotal.toFixed(1)} h</strong>
            </p>

            <button
              onClick={addStop}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              Añadir parada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

     
