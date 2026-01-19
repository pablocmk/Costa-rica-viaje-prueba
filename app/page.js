"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Info, Lock, Eye, EyeOff, MapPin, AlertTriangle } from 'lucide-react';

/* =========================
   DATA
========================= */

const routeData = {
  "SJO → La Fortuna": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },
  "La Fortuna → SJO": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },

  "SJO → Santa Teresa (con ferry)": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye ferry y esperas. Reservar con antelación." },
  "SJO → Santa Teresa (sin ferry)": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad." },
  "Santa Teresa (con ferry) → SJO": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye ferry y esperas." },
  "Santa Teresa (sin ferry) → SJO": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad." },

  "SJO → Puerto Viejo": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta 32 (Braulio Carrillo). NO conducir de noche." },
  "Puerto Viejo → SJO": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta 32 (Braulio Carrillo)." },

  "SJO → Monteverde": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada." },
  "Monteverde → SJO": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada." },
};

const CORRECT_PASSWORD = "costarica2026";

/* =========================
   COMPONENT
========================= */

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
      setStops(stops.filter(s => s.id !== id));
    }
  };

  const updateStop = (id, field, value) => {
    setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const getRouteKey = (from, to, ferryFrom, ferryTo) => {
    const f = from === 'Santa Teresa' ? `Santa Teresa (${ferryFrom})` : from;
    const t = to === 'Santa Teresa' ? `Santa Teresa (${ferryTo})` : to;
    return `${f} → ${t}`;
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
        legs.push({ ...route, from: stops[i].location, to: stops[i + 1].location });
      }
    }
    return { minTotal, maxTotal, recTotal, legs };
  };

  const { minTotal, maxTotal, recTotal, legs } = calculateTotals();

  /* ================= LOGIN ================= */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4
        bg-gradient-to-br from-emerald-50 to-teal-100
        dark:from-zinc-900 dark:to-zinc-950">
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

            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
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
      dark:from-zinc-900 dark:to-zinc-950">

      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden
          dark:shadow-[0_0_40px_rgba(16,185,129,0.15)]">

          {/* HEADER */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h1 className="text-3xl font-bold">🚗 Costa Rica Road Trip</h1>
            <p className="text-emerald-100">Calculadora de tiempos de conducción</p>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="absolute top-6 right-6 px-4 py-2 rounded-full
                bg-white/10 border border-white/20 backdrop-blur">
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="p-6 md:p-8 text-gray-800 dark:text-zinc-100">

            {/* WARNINGS */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6 rounded">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 mr-3" />
                <ul className="text-sm space-y-1">
                  <li>NO conducir de noche</li>
                  <li>Tráfico en San José: +30–60 min</li>
                  <li>Lluvias: +20–30%</li>
                </ul>
              </div>
            </div>

            {/* ROUTE BUILDER */}
            <h2 className="text-2xl font-bold mb-4">Selecciona tu ruta</h2>

            <div className="space-y-3 mb-4">
              {stops.map((s, i) => (
                <div key={s.id} className="flex gap-3 items-center">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>

                  <select
                    value={s.location}
                    onChange={(e) => updateStop(s.id, 'location', e.target.value)}
                    className="flex-1 px-4 py-2 rounded border bg-white dark:bg-zinc-800">
                    {destinations.map(d => <option key={d}>{d}</option>)}
                  </select>

                  {s.location === 'Santa Teresa' && (
                    <select
                      value={s.ferryOption}
                      onChange={(e) => updateStop(s.id, 'ferryOption', e.target.value)}
                      className="px-4 py-2 rounded border bg-white dark:bg-zinc-800">
                      <option value="con ferry">Con ferry</option>
                      <option value="sin ferry">Sin ferry</option>
                    </select>
                  )}

                  {stops.length > 1 && (
                    <button onClick={() => removeStop(s.id)} className="text-red-500">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addStop}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              <Plus size={20} /> Añadir parada
            </button>

            {/* RESULTS */}
            {legs.length > 0 && (
              <>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>Min: {minTotal.toFixed(1)}h</div>
                  <div>Rec: {recTotal.toFixed(1)}h</div>
                  <div>Max: {maxTotal.toFixed(1)}h</div>
                </div>

                <div className="space-y-4">
                  {legs.map((l, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-zinc-800 p-4 rounded">
                      <strong>{l.from} → {l.to}</strong>
                      <p className="text-sm mt-1">{l.notes}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
