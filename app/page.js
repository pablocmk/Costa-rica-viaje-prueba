import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Info, Lock, Eye, EyeOff, MapPin, AlertTriangle, Calendar, DollarSign, Users, Save, Download, TrendingUp, Clock, Navigation, Palmtree, Sun, Cloud, X, Edit2, Check } from 'lucide-react';

const routeData = {
  "SJO → La Fortuna": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche.", gas: 25 },
  "La Fortuna → SJO": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche.", gas: 25 },
  "SJO → Santa Teresa (con ferry)": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5-2h a Puntarenas + 1.5h ferry + espera + 1.5h a Santa Teresa. Reservar ferry con anticipación.", gas: 35, ferry: 24 },
  "SJO → Santa Teresa (sin ferry)": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles. Solo considerar si se pierde ferry.", gas: 45 },
  "Santa Teresa (con ferry) → SJO": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5h a Paquera + 1.5h ferry + espera + 1.5-2h a San José.", gas: 35, ferry: 24 },
  "Santa Teresa (sin ferry) → SJO": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles.", gas: 45 },
  "SJO → Puerto Viejo": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). Últimos km con baches. NO conducir de noche.", gas: 30 },
  "Puerto Viejo → SJO": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). NO conducir de noche.", gas: 30 },
  "SJO → Monteverde": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada.", gas: 28 },
  "Monteverde → SJO": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada.", gas: 28 },
  "La Fortuna → Santa Teresa (con ferry)": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: La Fortuna → Puntarenas → Ferry Paquera → Santa Teresa. Incluye esperas.", gas: 40, ferry: 24 },
  "La Fortuna → Santa Teresa (sin ferry)": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles y cruces de ríos (requiere 4x4).", gas: 50 },
  "Santa Teresa (con ferry) → La Fortuna": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: Santa Teresa → Ferry Paquera → Puntarenas → La Fortuna.", gas: 40, ferry: 24 },
  "Santa Teresa (sin ferry) → La Fortuna": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles.", gas: 50 },
  "La Fortuna → Puerto Viejo": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo.", gas: 35 },
  "Puerto Viejo → La Fortuna": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo.", gas: 35 },
  "La Fortuna → Monteverde": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar. Requiere 4x4 en lluvias.", gas: 22 },
  "Monteverde → La Fortuna": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar.", gas: 22 },
  "Santa Teresa (con ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país. Requiere volver hacia San José. No hay ruta directa.", gas: 60 },
  "Santa Teresa (sin ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente.", gas: 65 },
  "Puerto Viejo → Santa Teresa (con ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país.", gas: 60, ferry: 24 },
  "Puerto Viejo → Santa Teresa (sin ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente.", gas: 65 },
  "Santa Teresa (con ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Desde Santa Teresa hacia el norte de la península, luego a Monteverde. Caminos mixtos.", gas: 38 },
  "Santa Teresa (sin ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos.", gas: 38 },
  "Monteverde → Santa Teresa (con ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos hacia península.", gas: 38, ferry: 24 },
  "Monteverde → Santa Teresa (sin ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos.", gas: 38 },
  "Puerto Viejo → Monteverde": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José o rutas alternativas.", gas: 55 },
  "Monteverde → Puerto Viejo": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José.", gas: 55 },
};

const destinationInfo = {
  "SJO": { 
    name: "San José", 
    icon: "🏙️",
    description: "Capital y punto de entrada",
    activities: ["Mercado Central", "Museo Nacional", "Teatro Nacional"],
    avgCostPerDay: 60,
    climate: "Templado urbano",
    difficulty: "Fácil"
  },
  "La Fortuna": { 
    name: "La Fortuna / Arenal", 
    icon: "🌋",
    description: "Volcán Arenal y aguas termales",
    activities: ["Puentes colgantes", "Aguas termales", "Cataratas La Fortuna", "Kayak en lago Arenal"],
    avgCostPerDay: 80,
    climate: "Cálido húmedo",
    difficulty: "Media"
  },
  "Santa Teresa": { 
    name: "Santa Teresa", 
    icon: "🏄",
    description: "Surf y playas paradisíacas",
    activities: ["Surf", "Playa Hermosa", "Montezuma", "Yoga"],
    avgCostPerDay: 90,
    climate: "Tropical seco (Feb)",
    difficulty: "Media-Alta"
  },
  "Puerto Viejo": { 
    name: "Puerto Viejo", 
    icon: "🌴",
    description: "Caribe costarricense",
    activities: ["Playa Cocles", "Snorkel", "Parque Cahuita", "Gastronomía caribeña"],
    avgCostPerDay: 70,
    climate: "Caribeño húmedo",
    difficulty: "Fácil"
  },
  "Monteverde": { 
    name: "Monteverde", 
    icon: "🌲",
    description: "Bosque nuboso",
    activities: ["Reserva biológica", "Canopy", "Observación aves", "Puentes colgantes"],
    avgCostPerDay: 75,
    climate: "Fresco nuboso",
    difficulty: "Media"
  }
};

const CORRECT_PASSWORD = "costarica2026";
const STORAGE_KEY = "costa-rica-trip";

export default function CostaRicaPlanner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [days, setDays] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [nextDayId, setNextDayId] = useState(1);
  const [nextExpenseId, setNextExpenseId] = useState(1);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [savedStatus, setSavedStatus] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  const tripStartDate = new Date('2025-02-14');
  const tripEndDate = new Date('2025-02-28');
  const totalDays = 14;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && (days.length > 0 || expenses.length > 0)) {
      saveData();
    }
  }, [days, expenses, isAuthenticated]);

  const loadData = async () => {
    try {
      const result = await window.storage.get(STORAGE_KEY, true);
      if (result && result.value) {
        const data = JSON.parse(result.value);
        setDays(data.days || []);
        setExpenses(data.expenses || []);
        setNextDayId(data.nextDayId || 1);
        setNextExpenseId(data.nextExpenseId || 1);
      }
    } catch (err) {
      console.log('No hay datos guardados o error al cargar');
    }
    setLoading(false);
  };

  const saveData = async () => {
    try {
      const data = { days, expenses, nextDayId, nextExpenseId };
      await window.storage.set(STORAGE_KEY, JSON.stringify(data), true);
      setSavedStatus('Guardado ✓');
      setTimeout(() => setSavedStatus(''), 2000);
    } catch (err) {
      console.error('Error al guardar:', err);
      setSavedStatus('Error al guardar');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const addDay = () => {
    const newDay = {
      id: nextDayId,
      dayNumber: days.length + 1,
      date: new Date(tripStartDate.getTime() + (days.length * 24 * 60 * 60 * 1000)),
      location: 'SJO',
      ferryOption: 'con ferry',
      notes: '',
      accommodation: '',
      accommodationCost: 0
    };
    setDays([...days, newDay]);
    setNextDayId(nextDayId + 1);
  };

  const removeDay = (id) => {
    const newDays = days.filter(d => d.id !== id).map((d, i) => ({
      ...d,
      dayNumber: i + 1,
      date: new Date(tripStartDate.getTime() + (i * 24 * 60 * 60 * 1000))
    }));
    setDays(newDays);
  };

  const updateDay = (id, field, value) => {
    setDays(days.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const addExpense = () => {
    setExpenses([...expenses, {
      id: nextExpenseId,
      date: new Date(),
      category: 'Comida',
      description: '',
      amount: 0
    }]);
    setNextExpenseId(nextExpenseId + 1);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    setEditingExpense(null);
  };

  const updateExpense = (id, field, value) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const getRouteKey = (from, to, ferryFrom, ferryTo) => {
    let fromKey = from;
    let toKey = to;
    if (from === 'Santa Teresa') fromKey = `Santa Teresa (${ferryFrom})`;
    if (to === 'Santa Teresa') toKey = `Santa Teresa (${ferryTo})`;
    return `${fromKey} → ${toKey}`;
  };

  const calculateItinerary = () => {
    let totalTime = 0;
    let totalGas = 0;
    let totalFerry = 0;
    const routes = [];
    const warnings = [];

    for (let i = 0; i < days.length - 1; i++) {
      const from = days[i].location;
      const to = days[i + 1].location;
      const ferryFrom = days[i].ferryOption;
      const ferryTo = days[i + 1].ferryOption;

      const routeKey = getRouteKey(from, to, ferryFrom, ferryTo);
      const route = routeData[routeKey];

      if (route) {
        totalTime += route.rec;
        totalGas += route.gas || 0;
        totalFerry += route.ferry || 0;
        routes.push({ from, to, ...route, dayNum: i + 1 });

        if (route.rec > 6) {
          warnings.push(`Día ${i + 1}: Trayecto muy largo (${route.rec}h) - Considera parar en el camino`);
        }
      }
    }

    return { totalTime, totalGas, totalFerry, routes, warnings };
  };

  const calculateBudget = () => {
    const { totalGas, totalFerry } = calculateItinerary();
    
    const accommodationCosts = days.reduce((sum, d) => sum + (parseFloat(d.accommodationCost) || 0), 0);
    const dailyCosts = days.reduce((sum, d) => {
      const info = destinationInfo[d.location];
      return sum + (info ? info.avgCostPerDay : 60);
    }, 0);
    const manualExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    return {
      transport: totalGas + totalFerry,
      accommodation: accommodationCosts,
      dailyActivities: dailyCosts,
      manualExpenses,
      total: totalGas + totalFerry + accommodationCosts + dailyCosts + manualExpenses
    };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🌴</div>
          <div className="absolute bottom-20 right-10 text-9xl">🏄</div>
          <div className="absolute top-40 right-20 text-7xl">🌋</div>
          <div className="absolute bottom-40 left-20 text-7xl">☀️</div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 shadow-lg">
              <Palmtree className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Pura Vida
            </h1>
            <p className="text-gray-600 text-lg">Costa Rica Trip Planner</p>
            <p className="text-sm text-teal-600 font-semibold mt-2">14-28 Febrero 2025</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña de acceso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white/50"
                  placeholder="Introduce la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Acceder al Planificador
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💾 Datos sincronizados:</span> Todos los cambios se guardan automáticamente y son visibles para todo el grupo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { totalTime, totalGas, totalFerry, routes, warnings } = calculateItinerary();
  const budget = calculateBudget();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10">🌴</div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                    <Navigation className="w-10 h-10" />
                    Costa Rica 2025
                  </h1>
                  <p className="text-emerald-100 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    14 Febrero - 28 Febrero · {totalDays} días
                  </p>
                </div>
                {savedStatus && (
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                    {savedStatus}
                  </div>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-emerald-100 text-sm mb-1">Días planificados</div>
                  <div className="text-3xl font-bold text-white">{days.length}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-emerald-100 text-sm mb-1">Tiempo en ruta</div>
                  <div className="text-3xl font-bold text-white">{totalTime.toFixed(1)}h</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-emerald-100 text-sm mb-1">Presupuesto</div>
                  <div className="text-3xl font-bold text-white">${budget.total.toFixed(0)}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-emerald-100 text-sm mb-1">Destinos</div>
                  <div className="text-3xl font-bold text-white">{new Set(days.map(d => d.location)).size}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-sm p-2 rounded-2xl">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === 'itinerary'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <MapPin size={20} />
              Itinerario
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === 'budget'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <DollarSign size={20} />
              Presupuesto
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === 'expenses'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <TrendingUp size={20} />
              Gastos
            </button>
          </div>

          {/* Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {/* Warnings */}
              {warnings.length > 0 && (
                <div className="bg-amber-500/20 backdrop-blur-sm border-2 border-amber-500/50 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Avisos importantes</h3>
                      <ul className="space-y-2">
                        {warnings.map((w, i) => (
                          <li key={i} className="text-amber-100">{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Days Timeline */}
              <div className="space-y-4">
                {days.map((day, index) => {
                  const info = destinationInfo[day.location];
                  return (
                    <div key={day.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
                      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {day.dayNumber}
                          </div>
                          <div>
                            <div className="text-white font-bold text-lg">{formatDate(day.date)}</div>
                            <div className="text-emerald-100 text-sm">{info?.name}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeDay(day.id)}
                          className="p-2 bg-white/20 hover:bg-red-500/80 rounded-lg transition text-white"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Destino</label>
                            <select
                              value={day.location}
                              onChange={(e) => updateDay(day.id, 'location', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                            >
                              {Object.keys(destinationInfo).map(key => (
                                <option key={key} value={key}>
                                  {destinationInfo[key].icon} {destinationInfo[key].name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {day.location === 'Santa Teresa' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Opción de viaje</label>
                              <select
                                value={day.ferryOption}
                                onChange={(e) => updateDay(day.id, 'ferryOption', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                              >
                                <option value="con ferry">🚢 Con ferry</option>
                                <option value="sin ferry">🚗 Sin ferry</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {info && (
                          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="text-3xl">{info.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 mb-1">{info.description}</h4>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                                    💰 ${info.avgCostPerDay}/día aprox
                                  </span>
                                  <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                                    {info.climate}
                                  </span>
                                  <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                                    {info.difficulty}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-700">
                                  <strong>Actividades:</strong> {info.activities.join(', ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Alojamiento</label>
                            <input
                              type="text"
                              value={day.accommodation}
                              onChange={(e) => updateDay(day.id, 'accommodation', e.target.value)}
                              placeholder="Nombre del hotel/hostel..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Costo alojamiento ($)</label>
                            <input
                              type="number"
                              value={day.accommodationCost}
                              onChange={(e) => updateDay(day.id, 'accommodationCost', e.target.value)}
                              placeholder="0"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Notas del día</label>
                          <textarea
                            value={day.notes}
                            onChange={(e) => updateDay(day.id, 'notes', e.target.value)}
                            placeholder="Actividades, restaurantes, puntos de interés..."
                            rows="3"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                          />
                        </div>

                        {/* Route info if not last day */}
                        {index < days.length - 1 && (() => {
                          const nextDay = days[index + 1];
                          const routeKey = getRouteKey(day.location, nextDay.location, day.ferryOption, nextDay.ferryOption);
                          const route = routeData[routeKey];
                          return route && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500">
                              <div className="flex items-start gap-3">
                                <Navigation className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="font-bold text-gray-800 mb-2">
                                    Ruta al día {day.dayNumber + 1}: {info?.name} → {destinationInfo[nextDay.location]?.name}
                                  </div>
                                  <div className="grid grid-cols-3 gap-3 mb-2 text-sm">
                                    <div>
                                      <span className="text-gray-600">Tiempo:</span>
                                      <span className="ml-1 font-semibold text-blue-700">{route.rec}h</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Gasolina:</span>
                                      <span className="ml-1 font-semibold text-blue-700">${route.gas}</span>
                                    </div>
                                    {route.ferry && (
                                      <div>
                                        <span className="text-gray-600">Ferry:</span>
                                        <span className="ml-1 font-semibold text-blue-700">${route.ferry}</span>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-700">{route.notes}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addDay}
                disabled={days.length >= totalDays}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-3 ${
                  days.length >= totalDays
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                <Plus size={24} />
                Añadir día {days.length < totalDays ? `(${totalDays - days.length} disponibles)` : '(límite alcanzado)'}
              </button>
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-teal-600" />
                  Desglose de Presupuesto
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700">Transporte</div>
                        <div className="text-sm text-gray-500">Gasolina + Ferry</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">${budget.transport.toFixed(0)}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl">
                        🏨
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700">Alojamiento</div>
                        <div className="text-sm text-gray-500">{days.filter(d => d.accommodationCost > 0).length} noches registradas</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">${budget.accommodation.toFixed(0)}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-2xl">
                        🎯
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700">Actividades diarias</div>
                        <div className="text-sm text-gray-500">Comida, tours, entradas</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-700">${budget.dailyActivities.toFixed(0)}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700">Gastos registrados</div>
                        <div className="text-sm text-gray-500">{expenses.length} gastos</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-amber-700">${budget.manualExpenses.toFixed(0)}</div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">TOTAL ESTIMADO</div>
                        <div className="text-sm opacity-90">14 días en Costa Rica</div>
                      </div>
                    </div>
                    <div className="text-4xl font-bold">${budget.total.toFixed(0)}</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Nota:</strong> Los costos de actividades diarias son estimaciones basadas en promedios por destino. Ajusta los gastos reales en la pestaña "Gastos".
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-teal-600" />
                    Control de Gastos
                  </h2>
                  <button
                    onClick={addExpense}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition transform hover:scale-105"
                  >
                    <Plus size={20} />
                    Nuevo Gasto
                  </button>
                </div>

                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💸</div>
                    <p className="text-gray-500 text-lg">No hay gastos registrados aún</p>
                    <p className="text-gray-400 text-sm mt-2">Añade tus gastos para llevar un control del presupuesto</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {expenses.map(expense => (
                      <div key={expense.id} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition">
                        {editingExpense === expense.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <select
                              value={expense.category}
                              onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            >
                              <option value="Comida">🍽️ Comida</option>
                              <option value="Transporte">🚗 Transporte</option>
                              <option value="Actividades">🎯 Actividades</option>
                              <option value="Alojamiento">🏨 Alojamiento</option>
                              <option value="Compras">🛍️ Compras</option>
                              <option value="Otros">📌 Otros</option>
                            </select>
                            <input
                              type="text"
                              value={expense.description}
                              onChange={(e) => updateExpense(expense.id, 'description', e.target.value)}
                              placeholder="Descripción..."
                              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            />
                            <input
                              type="number"
                              value={expense.amount}
                              onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                              placeholder="Monto"
                              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingExpense(null)}
                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                              >
                                <Check size={18} />
                                Guardar
                              </button>
                              <button
                                onClick={() => removeExpense(expense.id)}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="text-2xl">
                                {expense.category === 'Comida' && '🍽️'}
                                {expense.category === 'Transporte' && '🚗'}
                                {expense.category === 'Actividades' && '🎯'}
                                {expense.category === 'Alojamiento' && '🏨'}
                                {expense.category === 'Compras' && '🛍️'}
                                {expense.category === 'Otros' && '📌'}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">{expense.description || 'Sin descripción'}</div>
                                <div className="text-sm text-gray-500">{expense.category}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold text-teal-700">${parseFloat(expense.amount || 0).toFixed(2)}</div>
                              <button
                                onClick={() => setEditingExpense(expense.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                              >
                                <Edit2 size={18} className="text-gray-600" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Total gastos registrados</div>
                    <div className="text-3xl font-bold">${budget.manualExpenses.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
