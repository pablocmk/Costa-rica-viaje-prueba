 "use client";
 
-import React, { useState } from 'react';
-import { Plus, Trash2, Info, Lock, Eye, EyeOff, MapPin, AlertTriangle } from 'lucide-react';
+import React, { useState } from "react";
+import {
+  Plus,
+  Trash2,
+  Info,
+  Lock,
+  Eye,
+  EyeOff,
+  MapPin,
+  AlertTriangle,
+  Navigation,
+  Sparkles,
+  CloudRain,
+  Sun,
+  Clock,
+  Map,
+  Activity,
+  Building2,
+  Landmark,
+  Wallet,
+  Save,
+} from "lucide-react";
 
 // Datos de rutas (matriz completa)
 const routeData = {
-  "SJO → La Fortuna": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },
-  "La Fortuna → SJO": { min: 2.5, max: 4.0, rec: 3.0, notes: "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche." },
-  
-  "SJO → Santa Teresa (con ferry)": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5-2h a Puntarenas + 1.5h ferry + espera + 1.5h a Santa Teresa. Reservar ferry con anticipación." },
-  "SJO → Santa Teresa (sin ferry)": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles. Solo considerar si se pierde ferry." },
-  "Santa Teresa (con ferry) → SJO": { min: 4.0, max: 6.0, rec: 5.0, notes: "Incluye: 1.5h a Paquera + 1.5h ferry + espera + 1.5-2h a San José." },
-  "Santa Teresa (sin ferry) → SJO": { min: 6.0, max: 8.0, rec: 7.0, notes: "Ruta por puente La Amistad. Caminos difíciles." },
-  
-  "SJO → Puerto Viejo": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). Últimos km con baches. NO conducir de noche." },
-  "Puerto Viejo → SJO": { min: 3.5, max: 5.0, rec: 4.5, notes: "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). NO conducir de noche." },
-  
-  "SJO → Monteverde": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada." },
-  "Monteverde → SJO": { min: 3.5, max: 5.0, rec: 4.0, notes: "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada." },
-  
-  "La Fortuna → Santa Teresa (con ferry)": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: La Fortuna → Puntarenas → Ferry Paquera → Santa Teresa. Incluye esperas." },
-  "La Fortuna → Santa Teresa (sin ferry)": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles y cruces de ríos (requiere 4x4)." },
-  "Santa Teresa (con ferry) → La Fortuna": { min: 5.0, max: 7.0, rec: 6.0, notes: "Ruta: Santa Teresa → Ferry Paquera → Puntarenas → La Fortuna." },
-  "Santa Teresa (sin ferry) → La Fortuna": { min: 5.5, max: 7.0, rec: 6.5, notes: "Ruta terrestre completa. Caminos difíciles." },
-  
-  "La Fortuna → Puerto Viejo": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo." },
-  "Puerto Viejo → La Fortuna": { min: 4.0, max: 6.0, rec: 5.0, notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo." },
-  
-  "La Fortuna → Monteverde": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar. Requiere 4x4 en lluvias." },
-  "Monteverde → La Fortuna": { min: 3.0, max: 4.5, rec: 3.5, notes: "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar." },
-  
-  "Santa Teresa (con ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país. Requiere volver hacia San José. No hay ruta directa." },
-  "Santa Teresa (sin ferry) → Puerto Viejo": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente." },
-  "Puerto Viejo → Santa Teresa (con ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga atravesando todo el país." },
-  "Puerto Viejo → Santa Teresa (sin ferry)": { min: 8.0, max: 10.0, rec: 9.0, notes: "Ruta larga. No hay ruta directa eficiente." },
-  
-  "Santa Teresa (con ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Desde Santa Teresa hacia el norte de la península, luego a Monteverde. Caminos mixtos." },
-  "Santa Teresa (sin ferry) → Monteverde": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos." },
-  "Monteverde → Santa Teresa (con ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos hacia península." },
-  "Monteverde → Santa Teresa (sin ferry)": { min: 4.5, max: 6.0, rec: 5.5, notes: "Caminos mixtos." },
-  
-  "Puerto Viejo → Monteverde": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José o rutas alternativas." },
-  "Monteverde → Puerto Viejo": { min: 7.0, max: 9.0, rec: 8.0, notes: "Ruta muy larga, requiere pasar por San José." },
+  "SJO → La Fortuna": {
+    min: 2.5,
+    max: 4.0,
+    rec: 3.0,
+    notes:
+      "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche.",
+  },
+  "La Fortuna → SJO": {
+    min: 2.5,
+    max: 4.0,
+    rec: 3.0,
+    notes:
+      "Ruta directa por Route 1 y 702. Tráfico en San José puede añadir 1h. Evitar conducir de noche.",
+  },
+
+  "SJO → Santa Teresa (con ferry)": {
+    min: 4.0,
+    max: 6.0,
+    rec: 5.0,
+    notes:
+      "Incluye: 1.5-2h a Puntarenas + 1.5h ferry + espera + 1.5h a Santa Teresa. Reservar ferry con anticipación.",
+  },
+  "SJO → Santa Teresa (sin ferry)": {
+    min: 6.0,
+    max: 8.0,
+    rec: 7.0,
+    notes:
+      "Ruta por puente La Amistad. Caminos difíciles. Solo considerar si se pierde ferry.",
+  },
+  "Santa Teresa (con ferry) → SJO": {
+    min: 4.0,
+    max: 6.0,
+    rec: 5.0,
+    notes:
+      "Incluye: 1.5h a Paquera + 1.5h ferry + espera + 1.5-2h a San José.",
+  },
+  "Santa Teresa (sin ferry) → SJO": {
+    min: 6.0,
+    max: 8.0,
+    rec: 7.0,
+    notes: "Ruta por puente La Amistad. Caminos difíciles.",
+  },
+
+  "SJO → Puerto Viejo": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.5,
+    notes:
+      "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). Últimos km con baches. NO conducir de noche.",
+  },
+  "Puerto Viejo → SJO": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.5,
+    notes:
+      "Ruta por Route 32 atravesando Braulio Carrillo (curvas y niebla). NO conducir de noche.",
+  },
+
+  "SJO → Monteverde": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.0,
+    notes:
+      "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada.",
+  },
+  "Monteverde → SJO": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.0,
+    notes:
+      "Route 606 pavimentada. Montañosa, sin luces. Última sección empinada.",
+  },
+
+  "La Fortuna → Santa Teresa (con ferry)": {
+    min: 5.0,
+    max: 7.0,
+    rec: 6.0,
+    notes:
+      "Ruta: La Fortuna → Puntarenas → Ferry Paquera → Santa Teresa. Incluye esperas.",
+  },
+  "La Fortuna → Santa Teresa (sin ferry)": {
+    min: 5.5,
+    max: 7.0,
+    rec: 6.5,
+    notes:
+      "Ruta terrestre completa. Caminos difíciles y cruces de ríos (requiere 4x4).",
+  },
+  "Santa Teresa (con ferry) → La Fortuna": {
+    min: 5.0,
+    max: 7.0,
+    rec: 6.0,
+    notes: "Ruta: Santa Teresa → Ferry Paquera → Puntarenas → La Fortuna.",
+  },
+  "Santa Teresa (sin ferry) → La Fortuna": {
+    min: 5.5,
+    max: 7.0,
+    rec: 6.5,
+    notes: "Ruta terrestre completa. Caminos difíciles.",
+  },
+
+  "La Fortuna → Puerto Viejo": {
+    min: 4.0,
+    max: 6.0,
+    rec: 5.0,
+    notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo.",
+  },
+  "Puerto Viejo → La Fortuna": {
+    min: 4.0,
+    max: 6.0,
+    rec: 5.0,
+    notes: "Via Sarapiquí y Route 4. Niebla en Braulio Carrillo.",
+  },
+
+  "La Fortuna → Monteverde": {
+    min: 3.0,
+    max: 4.5,
+    rec: 3.5,
+    notes:
+      "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar. Requiere 4x4 en lluvias.",
+  },
+  "Monteverde → La Fortuna": {
+    min: 3.0,
+    max: 4.5,
+    rec: 3.5,
+    notes:
+      "Route 142 alrededor del lago Arenal + Route 145. Parcialmente sin pavimentar.",
+  },
+
+  "Santa Teresa (con ferry) → Puerto Viejo": {
+    min: 8.0,
+    max: 10.0,
+    rec: 9.0,
+    notes:
+      "Ruta larga atravesando todo el país. Requiere volver hacia San José. No hay ruta directa.",
+  },
+  "Santa Teresa (sin ferry) → Puerto Viejo": {
+    min: 8.0,
+    max: 10.0,
+    rec: 9.0,
+    notes: "Ruta larga. No hay ruta directa eficiente.",
+  },
+  "Puerto Viejo → Santa Teresa (con ferry)": {
+    min: 8.0,
+    max: 10.0,
+    rec: 9.0,
+    notes: "Ruta larga atravesando todo el país.",
+  },
+  "Puerto Viejo → Santa Teresa (sin ferry)": {
+    min: 8.0,
+    max: 10.0,
+    rec: 9.0,
+    notes: "Ruta larga. No hay ruta directa eficiente.",
+  },
+
+  "Santa Teresa (con ferry) → Monteverde": {
+    min: 4.5,
+    max: 6.0,
+    rec: 5.5,
+    notes:
+      "Desde Santa Teresa hacia el norte de la península, luego a Monteverde. Caminos mixtos.",
+  },
+  "Santa Teresa (sin ferry) → Monteverde": {
+    min: 4.5,
+    max: 6.0,
+    rec: 5.5,
+    notes: "Caminos mixtos.",
+  },
+  "Monteverde → Santa Teresa (con ferry)": {
+    min: 4.5,
+    max: 6.0,
+    rec: 5.5,
+    notes: "Caminos mixtos hacia península.",
+  },
+  "Monteverde → Santa Teresa (sin ferry)": {
+    min: 4.5,
+    max: 6.0,
+    rec: 5.5,
+    notes: "Caminos mixtos.",
+  },
+
+  "Puerto Viejo → Monteverde": {
+    min: 7.0,
+    max: 9.0,
+    rec: 8.0,
+    notes:
+      "Ruta muy larga, requiere pasar por San José o rutas alternativas.",
+  },
+  "Monteverde → Puerto Viejo": {
+    min: 7.0,
+    max: 9.0,
+    rec: 8.0,
+    notes: "Ruta muy larga, requiere pasar por San José.",
+  },
+  "SJO → Atenas": {
+    min: 0.8,
+    max: 1.2,
+    rec: 1.0,
+    notes: "Ruta corta por autopista hacia el oeste. Tráfico en salida de SJO.",
+  },
+  "Atenas → SJO": {
+    min: 0.8,
+    max: 1.2,
+    rec: 1.0,
+    notes: "Ruta corta por autopista. Atención a horas pico.",
+  },
+  "Atenas → La Fortuna": {
+    min: 3.0,
+    max: 4.0,
+    rec: 3.5,
+    notes: "Ruta hacia el norte. Carreteras montañosas y clima variable.",
+  },
+  "La Fortuna → Atenas": {
+    min: 3.0,
+    max: 4.0,
+    rec: 3.5,
+    notes: "Ruta hacia el oeste. Posible niebla en tramos altos.",
+  },
+  "Atenas → Puerto Viejo": {
+    min: 4.0,
+    max: 5.5,
+    rec: 4.8,
+    notes: "Cruza el valle central y Ruta 32. Evitar conducir de noche.",
+  },
+  "Puerto Viejo → Atenas": {
+    min: 4.0,
+    max: 5.5,
+    rec: 4.8,
+    notes: "Ruta larga por la 32. Posibles cierres por clima.",
+  },
+  "Atenas → Monteverde": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.2,
+    notes: "Ruta montañosa con curvas. Mejor en horas de luz.",
+  },
+  "Monteverde → Atenas": {
+    min: 3.5,
+    max: 5.0,
+    rec: 4.2,
+    notes: "Ruta montañosa con curvas. Mejor en horas de luz.",
+  },
+  "Atenas → Santa Teresa (con ferry)": {
+    min: 3.8,
+    max: 5.8,
+    rec: 4.8,
+    notes:
+      "Ruta vía Puntarenas + ferry Paquera. Considerar espera y reservas.",
+  },
+  "Atenas → Santa Teresa (sin ferry)": {
+    min: 5.5,
+    max: 7.5,
+    rec: 6.5,
+    notes: "Ruta terrestre completa por puente La Amistad. Caminos mixtos.",
+  },
+  "Santa Teresa (con ferry) → Atenas": {
+    min: 3.8,
+    max: 5.8,
+    rec: 4.8,
+    notes: "Ruta vía ferry Paquera hacia Puntarenas y luego Atenas.",
+  },
+  "Santa Teresa (sin ferry) → Atenas": {
+    min: 5.5,
+    max: 7.5,
+    rec: 6.5,
+    notes: "Ruta terrestre completa. Requiere 4x4 en temporada lluviosa.",
+  },
 };
 
 const CORRECT_PASSWORD = "costarica2026";
 
+const stopDetails = {
+  SJO: {
+    name: "San José",
+    vibe: "Ciudad base con cafés, museos y logística",
+    highlights: [
+      "Museo del Oro",
+      "Barrio Escalante",
+      "Mercado Central",
+      "Teatro Nacional",
+    ],
+    activities: [
+      "Café de especialidad y brunch",
+      "Tour gastronómico nocturno",
+      "Fotografía urbana",
+    ],
+    emoji: "🏙️",
+    color: "from-cyan-400 to-blue-500",
+  },
+  "La Fortuna": {
+    name: "La Fortuna",
+    vibe: "Arenal, aguas termales, aventura",
+    highlights: [
+      "Volcán Arenal",
+      "Termales",
+      "Catarata La Fortuna",
+      "Puentes colgantes",
+    ],
+    activities: [
+      "Kayak al atardecer",
+      "Senderismo + cascadas",
+      "Tour nocturno de fauna",
+    ],
+    emoji: "🌋",
+    color: "from-amber-400 to-orange-500",
+  },
+  "Santa Teresa": {
+    name: "Santa Teresa",
+    vibe: "Surf, playas y desconexión total",
+    highlights: [
+      "Playa Carmen",
+      "Sunset en Playa Hermosa",
+      "Yoga al amanecer",
+      "Snorkel en Cabo Blanco",
+    ],
+    activities: [
+      "Clases de surf",
+      "Tour en quad",
+      "Cena frente al mar",
+    ],
+    emoji: "🏄",
+    color: "from-pink-400 to-fuchsia-500",
+  },
+  "Puerto Viejo": {
+    name: "Puerto Viejo",
+    vibe: "Caribe, reggae y biodiversidad",
+    highlights: [
+      "Playa Cocles",
+      "Jaguar Rescue Center",
+      "Manzanillo",
+      "Punta Uva",
+    ],
+    activities: [
+      "Bici + playa",
+      "Cacao tour",
+      "Snorkel en arrecifes",
+    ],
+    emoji: "🌴",
+    color: "from-emerald-400 to-teal-500",
+  },
+  "Monteverde": {
+    name: "Monteverde",
+    vibe: "Bosque nuboso + adrenalina",
+    highlights: [
+      "Reserva biológica",
+      "Canopy tour",
+      "Jardín de colibríes",
+      "Niebla mística",
+    ],
+    activities: [
+      "Puentes colgantes",
+      "Café tour",
+      "Avistamiento de quetzales",
+    ],
+    emoji: "🌫️",
+    color: "from-violet-400 to-indigo-500",
+  },
+  Atenas: {
+    name: "Atenas",
+    vibe: "Clima cálido, pausa tranquila y logística",
+    highlights: [
+      "Parque Central",
+      "Miradores al valle",
+      "Cafés de ruta",
+      "Mercado local",
+    ],
+    activities: [
+      "Brunch relajado",
+      "Compras de última hora",
+      "Mirador al atardecer",
+    ],
+    emoji: "🏞️",
+    color: "from-lime-400 to-emerald-500",
+  },
+};
+
 export default function CostaRicaPlanner() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
-  const [password, setPassword] = useState('');
+  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
-  const [error, setError] = useState('');
-  
+  const [error, setError] = useState("");
+
   const [stops, setStops] = useState([
-    { id: 1, location: 'SJO', ferryOption: 'con ferry' },
+    {
+      id: 1,
+      location: "SJO",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
+    {
+      id: 2,
+      location: "Atenas",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
+    {
+      id: 3,
+      location: "Santa Teresa",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
+    {
+      id: 4,
+      location: "La Fortuna",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
+    {
+      id: 5,
+      location: "Puerto Viejo",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
+    {
+      id: 6,
+      location: "SJO",
+      ferryOption: "con ferry",
+      lodgingName: "",
+      lodgingAddress: "",
+      lodgingCost: "",
+      plannedActivities: "",
+    },
   ]);
-  const [nextId, setNextId] = useState(2);
+  const [nextId, setNextId] = useState(7);
+  const [selectedStop, setSelectedStop] = useState("SJO");
+  const [season, setSeason] = useState("seca");
+  const [traffic, setTraffic] = useState("normal");
+  const [planName, setPlanName] = useState("");
+  const [savedPlans, setSavedPlans] = useState([]);
+  const [customMapEmbed, setCustomMapEmbed] = useState("");
+
+  const destinations = [
+    "SJO",
+    "Atenas",
+    "La Fortuna",
+    "Santa Teresa",
+    "Puerto Viejo",
+    "Monteverde",
+  ];
 
-  const destinations = ['SJO', 'La Fortuna', 'Santa Teresa', 'Puerto Viejo', 'Monteverde'];
+  const seasonFactor = season === "lluviosa" ? 1.25 : 1;
+  const trafficFactor = traffic === "pico" ? 1.2 : traffic === "noche" ? 1.35 : 1;
+  const totalFactor = seasonFactor * trafficFactor;
 
   const handleLogin = (e) => {
     e.preventDefault();
     if (password === CORRECT_PASSWORD) {
       setIsAuthenticated(true);
-      setError('');
+      setError("");
     } else {
-      setError('Contraseña incorrecta');
+      setError("Contraseña incorrecta");
     }
   };
 
   const addStop = () => {
-    setStops([...stops, { id: nextId, location: 'SJO', ferryOption: 'con ferry' }]);
+    setStops([
+      ...stops,
+      {
+        id: nextId,
+        location: "SJO",
+        ferryOption: "con ferry",
+        lodgingName: "",
+        lodgingAddress: "",
+        lodgingCost: "",
+        plannedActivities: "",
+      },
+    ]);
     setNextId(nextId + 1);
   };
 
   const removeStop = (id) => {
     if (stops.length > 1) {
-      setStops(stops.filter(stop => stop.id !== id));
+      setStops(stops.filter((stop) => stop.id !== id));
     }
   };
 
   const updateStop = (id, field, value) => {
-    setStops(stops.map(stop => 
-      stop.id === id ? { ...stop, [field]: value } : stop
-    ));
+    setStops(
+      stops.map((stop) =>
+        stop.id === id ? { ...stop, [field]: value } : stop
+      )
+    );
+    if (field === "location") {
+      setSelectedStop(value);
+    }
+  };
+
+  const savePlan = () => {
+    if (!planName.trim()) return;
+    setSavedPlans([
+      {
+        id: Date.now(),
+        name: planName.trim(),
+        season,
+        traffic,
+        dates: "14-28 Febrero",
+        stops,
+      },
+      ...savedPlans,
+    ]);
+    setPlanName("");
   };
 
   const getRouteKey = (from, to, ferryFrom, ferryTo) => {
     let fromKey = from;
     let toKey = to;
-    
-    if (from === 'Santa Teresa') {
+
+    if (from === "Santa Teresa") {
       fromKey = `Santa Teresa (${ferryFrom})`;
     }
-    if (to === 'Santa Teresa') {
+    if (to === "Santa Teresa") {
       toKey = `Santa Teresa (${ferryTo})`;
     }
-    
+
     return `${fromKey} → ${toKey}`;
   };
 
   const calculateTotals = () => {
-    let minTotal = 0, maxTotal = 0, recTotal = 0;
+    let minTotal = 0,
+      maxTotal = 0,
+      recTotal = 0;
     const legs = [];
 
-    for (let i = 0; i < stops.length - 1; i++) {
+    for (let i = 0; i < stops.length - 1; i += 1) {
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
 
+  const adjustedTotals = {
+    min: minTotal * totalFactor,
+    rec: recTotal * totalFactor,
+    max: maxTotal * totalFactor,
+  };
+
+  const mapQuery = `${selectedStop}, Costa Rica`;
+  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
+    mapQuery
+  )}&output=embed`;
+  const activeMapSrc = customMapEmbed.trim() ? customMapEmbed.trim() : mapSrc;
+  const directionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
+    stops.map((stop) => `${stop.location}, Costa Rica`).join("/")
+  )}`;
+  const atmBncrUrl = `https://www.google.com/maps/search/${encodeURIComponent(
+    `Banco Nacional de Costa Rica cajero ${selectedStop}`
+  )}`;
+  const atmBcrUrl = `https://www.google.com/maps/search/${encodeURIComponent(
+    `Banco de Costa Rica cajero ${selectedStop}`
+  )}`;
+
   if (!isAuthenticated) {
     return (
-      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
-        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
+      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0a0f1f,_#020307_55%)] flex items-center justify-center p-4">
+        <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-[0_0_60px_rgba(56,189,248,0.25)] p-8 w-full max-w-md text-white">
           <div className="text-center mb-8">
-            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
-              <Lock className="w-10 h-10 text-emerald-600" />
+            <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-4 shadow-[0_0_30px_rgba(34,211,238,0.6)]">
+              <Lock className="w-10 h-10 text-cyan-300" />
             </div>
-            <h1 className="text-3xl font-bold text-gray-800 mb-2">Costa Rica Trip Planner</h1>
-            <p className="text-gray-600">Planificador colaborativo de ruta en coche</p>
+            <h1 className="text-3xl font-bold mb-2 tracking-wide">
+              Costa Rica Trip Core
+            </h1>
+            <p className="text-cyan-200/80">
+              Acceso seguro al dashboard interactivo
+            </p>
           </div>
-          
+
           <form onSubmit={handleLogin} className="space-y-6">
             <div>
-              <label className="block text-sm font-medium text-gray-700 mb-2">
+              <label className="block text-sm font-medium text-cyan-100 mb-2">
                 Contraseña de acceso
               </label>
               <div className="relative">
                 <input
                   type={showPassword ? "text" : "password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
-                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
+                  className="w-full px-4 py-3 bg-black/40 border border-cyan-500/40 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                   placeholder="Introduce la contraseña"
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
-                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
+                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-200 hover:text-white"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
               </div>
-              {error && (
-                <p className="mt-2 text-sm text-red-600">{error}</p>
-              )}
+              {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
             </div>
-            
+
             <button
               type="submit"
-              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
+              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-[0_0_24px_rgba(34,211,238,0.6)]"
             >
-              Acceder
+              Acceder al sistema
             </button>
           </form>
-          
-          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
-            <p className="text-sm text-blue-800">
-              <strong>Nota:</strong> Comparte la contraseña con tus amigos de viaje para que puedan acceder al planificador.
+
+          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
+            <p className="text-sm text-cyan-100">
+              <strong>Nota:</strong> Comparte la contraseña con tus amigos de
+              viaje para colaborar en tiempo real.
             </p>
           </div>
         </div>
       </div>
     );
   }
 
+  const selectedDetails = stopDetails[selectedStop];
+  const selectedStopEntries = stops.filter(
+    (stop) => stop.location === selectedStop
+  );
+
   return (
-    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
-      <div className="max-w-6xl mx-auto">
-        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
-          {/* Header */}
-          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 md:p-8 text-white">
-            <h1 className="text-3xl md:text-4xl font-bold mb-2">🚗 Costa Rica Road Trip</h1>
-            <p className="text-emerald-100">Calculadora de tiempos de conducción</p>
+    <div className="min-h-screen bg-[#05070d] text-white px-4 py-6 md:px-10 md:py-10">
+      <div className="max-w-7xl mx-auto space-y-8">
+        <header className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0b1020] via-[#0a0f1f] to-[#04070d] p-8 shadow-[0_0_80px_rgba(34,211,238,0.2)]">
+          <div className="absolute -top-20 -right-10 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />
+          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
+          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
+            <div>
+              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
+                Dashboard futurista de ruta
+              </p>
+              <h1 className="mt-3 text-3xl md:text-5xl font-bold">
+                Costa Rica HyperDrive ✦
+              </h1>
+              <p className="mt-2 text-cyan-100/80 max-w-2xl">
+                Diseña tu itinerario, analiza tiempos, y explora cada parada con
+                detalle ultra-visual y en tiempo real.
+              </p>
+              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
+                14-28 Febrero
+              </div>
+            </div>
+            <div className="flex flex-wrap gap-4">
+              <div className="rounded-2xl border border-cyan-400/30 bg-black/40 px-4 py-3">
+                <p className="text-xs text-cyan-300">Paradas activas</p>
+                <p className="text-2xl font-semibold">{stops.length}</p>
+              </div>
+              <div className="rounded-2xl border border-fuchsia-400/30 bg-black/40 px-4 py-3">
+                <p className="text-xs text-fuchsia-300">Tiempo recomendado</p>
+                <p className="text-2xl font-semibold">
+                  {adjustedTotals.rec.toFixed(1)}h
+                </p>
+              </div>
+              <div className="rounded-2xl border border-emerald-400/30 bg-black/40 px-4 py-3">
+                <p className="text-xs text-emerald-300">Clima seleccionado</p>
+                <p className="text-2xl font-semibold capitalize">{season}</p>
+              </div>
+            </div>
           </div>
+        </header>
 
-          <div className="p-6 md:p-8">
-            {/* Warnings */}
-            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
-              <div className="flex items-start">
-                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
-                <div className="text-sm text-amber-800">
-                  <p className="font-semibold mb-1">Advertencias importantes:</p>
-                  <ul className="list-disc list-inside space-y-1">
-                    <li>NO conducir de noche (oscurece a las 6 PM todo el año)</li>
-                    <li>Tráfico en San José: añadir 30-60 min en horas pico</li>
-                    <li>Temporada de lluvias (Mayo-Nov): tiempos +20-30%</li>
-                  </ul>
-                </div>
+        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
+          <div className="space-y-6">
+            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl">
+              <div className="flex items-center gap-3 text-cyan-200">
+                <AlertTriangle className="h-5 w-5" />
+                <h2 className="text-lg font-semibold">Alertas inteligentes</h2>
               </div>
+              <ul className="mt-4 space-y-2 text-sm text-cyan-100/80">
+                <li>Evita conducir de noche (oscurece 6 PM todo el año).</li>
+                <li>Si llueve, considera un +20% en tiempo de ruta.</li>
+                <li>Horas pico en SJO suman 30-60 minutos extra.</li>
+              </ul>
             </div>
 
-            {/* Route Builder */}
-            <div className="mb-8">
-              <h2 className="text-2xl font-bold text-gray-800 mb-4">Selecciona tu ruta</h2>
-              
-              <div className="space-y-3">
+            <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0b1020] to-[#09111f] p-6">
+              <div className="flex items-center gap-3">
+                <Map className="h-5 w-5 text-cyan-300" />
+                <h2 className="text-xl font-semibold">Constructor de ruta</h2>
+              </div>
+
+              <div className="mt-4 grid gap-4 md:grid-cols-2">
+                <div className="space-y-3">
+                  <label className="text-xs uppercase tracking-widest text-cyan-200">
+                    Clima
+                  </label>
+                  <div className="flex gap-2">
+                    <button
+                      type="button"
+                      onClick={() => setSeason("seca")}
+                      className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
+                        season === "seca"
+                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
+                          : "border-white/10 bg-black/40 text-white/70 hover:border-emerald-400/40"
+                      }`}
+                    >
+                      <div className="flex items-center justify-center gap-2">
+                        <Sun className="h-4 w-4" />
+                        Seca
+                      </div>
+                    </button>
+                    <button
+                      type="button"
+                      onClick={() => setSeason("lluviosa")}
+                      className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
+                        season === "lluviosa"
+                          ? "border-blue-400 bg-blue-500/20 text-blue-200"
+                          : "border-white/10 bg-black/40 text-white/70 hover:border-blue-400/40"
+                      }`}
+                    >
+                      <div className="flex items-center justify-center gap-2">
+                        <CloudRain className="h-4 w-4" />
+                        Lluviosa
+                      </div>
+                    </button>
+                  </div>
+                </div>
+
+                <div className="space-y-3">
+                  <label className="text-xs uppercase tracking-widest text-cyan-200">
+                    Tráfico
+                  </label>
+                  <div className="grid grid-cols-3 gap-2">
+                    {[
+                      { value: "normal", label: "Normal" },
+                      { value: "pico", label: "Hora pico" },
+                      { value: "noche", label: "Nocturno" },
+                    ].map((option) => (
+                      <button
+                        key={option.value}
+                        type="button"
+                        onClick={() => setTraffic(option.value)}
+                        className={`rounded-xl border px-2 py-2 text-xs transition ${
+                          traffic === option.value
+                            ? "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200"
+                            : "border-white/10 bg-black/40 text-white/70 hover:border-fuchsia-400/40"
+                        }`}
+                      >
+                        <div className="flex items-center justify-center gap-2">
+                          <Clock className="h-3.5 w-3.5" />
+                          {option.label}
+                        </div>
+                      </button>
+                    ))}
+                  </div>
+                </div>
+              </div>
+
+              <div className="mt-6 space-y-3">
                 {stops.map((stop, index) => (
-                  <div key={stop.id} className="flex items-center gap-3">
-                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
+                  <div
+                    key={stop.id}
+                    className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"
+                  >
+                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-200">
                       {index + 1}
                     </div>
-                    
+
                     <select
                       value={stop.location}
-                      onChange={(e) => updateStop(stop.id, 'location', e.target.value)}
-                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
+                      onChange={(e) =>
+                        updateStop(stop.id, "location", e.target.value)
+                      }
+                      className="flex-1 min-w-[180px] rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
                     >
-                      {destinations.map(dest => (
-                        <option key={dest} value={dest}>{dest}</option>
+                      {destinations.map((dest) => (
+                        <option key={dest} value={dest}>
+                          {dest}
+                        </option>
                       ))}
                     </select>
 
-                    {stop.location === 'Santa Teresa' && (
+                    {stop.location === "Santa Teresa" && (
                       <select
                         value={stop.ferryOption}
-                        onChange={(e) => updateStop(stop.id, 'ferryOption', e.target.value)}
-                        className="px-4 py-2 border-2 border-blue-300 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                        onChange={(e) =>
+                          updateStop(stop.id, "ferryOption", e.target.value)
+                        }
+                        className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-3 py-2 text-sm text-blue-100"
                       >
                         <option value="con ferry">Con ferry</option>
                         <option value="sin ferry">Sin ferry</option>
                       </select>
                     )}
 
                     {stops.length > 1 && (
                       <button
                         onClick={() => removeStop(stop.id)}
-                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
+                        className="rounded-xl p-2 text-rose-400 hover:bg-rose-500/10"
                       >
-                        <Trash2 size={20} />
+                        <Trash2 size={18} />
                       </button>
                     )}
+
+                    <div className="w-full grid gap-3 md:grid-cols-2">
+                      <div className="space-y-2">
+                        <label className="text-xs uppercase tracking-widest text-cyan-200 flex items-center gap-2">
+                          <Building2 className="h-3.5 w-3.5" />
+                          Alojamiento
+                        </label>
+                        <input
+                          value={stop.lodgingName}
+                          onChange={(e) =>
+                            updateStop(stop.id, "lodgingName", e.target.value)
+                          }
+                          placeholder="Nombre del hotel / Airbnb"
+                          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80"
+                        />
+                        <input
+                          value={stop.lodgingAddress}
+                          onChange={(e) =>
+                            updateStop(stop.id, "lodgingAddress", e.target.value)
+                          }
+                          placeholder="Ubicación exacta (link o dirección)"
+                          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80"
+                        />
+                        <input
+                          value={stop.lodgingCost}
+                          onChange={(e) =>
+                            updateStop(stop.id, "lodgingCost", e.target.value)
+                          }
+                          placeholder="Costo total (USD / CRC)"
+                          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80"
+                        />
+                      </div>
+                      <div className="space-y-2">
+                        <label className="text-xs uppercase tracking-widest text-fuchsia-200 flex items-center gap-2">
+                          <Activity className="h-3.5 w-3.5" />
+                          Actividades contratadas
+                        </label>
+                        <textarea
+                          value={stop.plannedActivities}
+                          onChange={(e) =>
+                            updateStop(stop.id, "plannedActivities", e.target.value)
+                          }
+                          placeholder="Ej: canopy, surf, tour cacao..."
+                          className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80"
+                        />
+                      </div>
+                    </div>
                   </div>
                 ))}
               </div>
 
               <button
                 onClick={addStop}
-                className="mt-4 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition shadow-md"
+                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30"
               >
-                <Plus size={20} />
+                <Plus size={18} />
                 Añadir parada
               </button>
             </div>
 
-            {/* Results */}
-            {legs.length > 0 && (
-              <>
-                {/* Summary Cards */}
-                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
-                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
-                    <div className="text-sm font-semibold text-green-700 mb-1">Tiempo mínimo</div>
-                    <div className="text-3xl font-bold text-green-800">{minTotal.toFixed(1)}h</div>
-                  </div>
-                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
-                    <div className="text-sm font-semibold text-blue-700 mb-1">Tiempo recomendado</div>
-                    <div className="text-3xl font-bold text-blue-800">{recTotal.toFixed(1)}h</div>
+            <div className="grid gap-4 md:grid-cols-3">
+              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
+                <p className="text-xs uppercase tracking-widest text-emerald-200">
+                  Tiempo mínimo
+                </p>
+                <p className="mt-2 text-3xl font-semibold text-emerald-100">
+                  {adjustedTotals.min.toFixed(1)}h
+                </p>
+              </div>
+              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
+                <p className="text-xs uppercase tracking-widest text-cyan-200">
+                  Tiempo recomendado
+                </p>
+                <p className="mt-2 text-3xl font-semibold text-cyan-100">
+                  {adjustedTotals.rec.toFixed(1)}h
+                </p>
+              </div>
+              <div className="rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4">
+                <p className="text-xs uppercase tracking-widest text-fuchsia-200">
+                  Tiempo máximo
+                </p>
+                <p className="mt-2 text-3xl font-semibold text-fuchsia-100">
+                  {adjustedTotals.max.toFixed(1)}h
+                </p>
+              </div>
+            </div>
+          </div>
+
+          <div className="space-y-6">
+            <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#050a14] to-[#0a1322] p-6">
+              <div className="flex items-center gap-3">
+                <Navigation className="h-5 w-5 text-cyan-300" />
+                <h2 className="text-xl font-semibold">Google Maps interactivo</h2>
+              </div>
+              <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-500/20">
+                <iframe
+                  title="Google Maps"
+                  src={activeMapSrc}
+                  className="h-[360px] w-full"
+                  loading="lazy"
+                />
+              </div>
+              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
+                <p className="text-xs uppercase tracking-widest text-cyan-200 flex items-center gap-2">
+                  <MapPin className="h-3.5 w-3.5" />
+                  Embed personalizado (opcional)
+                </p>
+                <p className="mt-2 text-xs text-cyan-100/60">
+                  Si no se visualiza el mapa, pega aquí el link de “Insertar mapa”
+                  de Google Maps.
+                </p>
+                <input
+                  value={customMapEmbed}
+                  onChange={(e) => setCustomMapEmbed(e.target.value)}
+                  placeholder="https://www.google.com/maps/embed?pb=..."
+                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80"
+                />
+              </div>
+              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-cyan-100/70">
+                <span className="rounded-full border border-cyan-400/30 px-3 py-1">
+                  Ruta calculada x{totalFactor.toFixed(2)}
+                </span>
+                <span className="rounded-full border border-fuchsia-400/30 px-3 py-1">
+                  {season === "lluviosa"
+                    ? "+25% por lluvias"
+                    : "Clima seco óptimo"}
+                </span>
+                <span className="rounded-full border border-emerald-400/30 px-3 py-1">
+                  {traffic === "pico"
+                    ? "+20% tráfico"
+                    : traffic === "noche"
+                    ? "+35% nocturno"
+                    : "Tráfico normal"}
+                </span>
+                <a
+                  href={directionsUrl}
+                  target="_blank"
+                  rel="noopener noreferrer"
+                  className="rounded-full border border-cyan-400/30 px-3 py-1 text-cyan-200 underline"
+                >
+                  Abrir ruta completa en Google Maps
+                </a>
+              </div>
+            </div>
+
+            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl">
+              <div className="flex items-center gap-3">
+                <Sparkles className="h-5 w-5 text-fuchsia-300" />
+                <h2 className="text-xl font-semibold">Parada seleccionada</h2>
+              </div>
+
+              {selectedDetails ? (
+                <div className="mt-4 space-y-4">
+                  <div
+                    className={`rounded-2xl bg-gradient-to-r ${selectedDetails.color} p-4 text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
+                  >
+                    <p className="text-xs uppercase tracking-[0.3em] text-black/70">
+                      {selectedDetails.emoji} {selectedDetails.name}
+                    </p>
+                    <p className="mt-2 text-lg font-semibold">
+                      {selectedDetails.vibe}
+                    </p>
                   </div>
-                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200">
-                    <div className="text-sm font-semibold text-red-700 mb-1">Tiempo máximo</div>
-                    <div className="text-3xl font-bold text-red-800">{maxTotal.toFixed(1)}h</div>
+
+                  <div className="grid gap-3 md:grid-cols-2">
+                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
+                      <p className="text-xs uppercase tracking-widest text-cyan-200">
+                        Highlights
+                      </p>
+                      <ul className="mt-2 space-y-1 text-sm text-cyan-100/80">
+                        {selectedDetails.highlights.map((item) => (
+                          <li key={item}>• {item}</li>
+                        ))}
+                      </ul>
+                    </div>
+                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
+                      <p className="text-xs uppercase tracking-widest text-fuchsia-200">
+                        Actividades
+                      </p>
+                      <ul className="mt-2 space-y-1 text-sm text-fuchsia-100/80">
+                        {selectedDetails.activities.map((item) => (
+                          <li key={item}>• {item}</li>
+                        ))}
+                      </ul>
+                    </div>
                   </div>
-                </div>
 
-                {/* Detailed Legs */}
-                <div className="bg-gray-50 rounded-xl p-6">
-                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
-                    <MapPin size={24} className="text-emerald-600" />
-                    Desglose por tramo
-                  </h3>
-                  
-                  <div className="space-y-4">
-                    {legs.map((leg, index) => (
-                      <div key={index} className="bg-white p-5 rounded-lg border-2 border-gray-200 hover:border-emerald-300 transition">
-                        <div className="flex items-start justify-between mb-3">
-                          <div className="flex-1">
-                            <div className="font-bold text-gray-800 text-lg mb-1">
-                              {leg.from} → {leg.to}
-                              {(leg.from === 'Santa Teresa' || leg.to === 'Santa Teresa') && (
-                                <span className="ml-2 text-sm font-normal text-blue-600">
-                                  ({leg.from === 'Santa Teresa' ? leg.ferryFrom : leg.ferryTo})
-                                </span>
-                              )}
-                            </div>
-                            <div className="flex gap-4 text-sm">
-                              <span className="text-green-700">Min: {leg.min}h</span>
-                              <span className="text-blue-700 font-semibold">Rec: {leg.rec}h</span>
-                              <span className="text-red-700">Max: {leg.max}h</span>
-                            </div>
-                          </div>
-                        </div>
-                        
-                        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
-                          <Info size={16} className="mt-0.5 flex-shrink-0 text-blue-600" />
-                          <p>{leg.notes}</p>
+                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
+                    <p className="text-xs uppercase tracking-widest text-emerald-200 flex items-center gap-2">
+                      <Building2 className="h-3.5 w-3.5" />
+                      Alojamientos y planes confirmados
+                    </p>
+                    <div className="mt-3 space-y-3 text-sm text-white/80">
+                      {selectedStopEntries.length === 0 && (
+                        <p>Sin datos registrados todavía.</p>
+                      )}
+                      {selectedStopEntries.map((entry) => (
+                        <div
+                          key={entry.id}
+                          className="rounded-xl border border-white/10 bg-black/30 p-3"
+                        >
+                          <p className="font-semibold text-white">
+                            Parada #{entry.id}
+                          </p>
+                          <p>
+                            <span className="text-emerald-200">
+                              Alojamiento:
+                            </span>{" "}
+                            {entry.lodgingName || "Pendiente"}
+                          </p>
+                          <p>
+                            <span className="text-emerald-200">Ubicación:</span>{" "}
+                            {entry.lodgingAddress || "Pendiente"}
+                          </p>
+                          <p>
+                            <span className="text-emerald-200">Costo:</span>{" "}
+                            {entry.lodgingCost || "Pendiente"}
+                          </p>
+                          <p className="mt-2">
+                            <span className="text-fuchsia-200">
+                              Actividades:
+                            </span>{" "}
+                            {entry.plannedActivities || "Pendiente"}
+                          </p>
                         </div>
-                      </div>
-                    ))}
+                      ))}
+                    </div>
                   </div>
                 </div>
-              </>
-            )}
+              ) : (
+                <p className="mt-4 text-sm text-cyan-100/70">
+                  Selecciona una parada para ver detalles.
+                </p>
+              )}
 
-            {/* Ferry Info */}
-            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
-              <h3 className="font-bold text-blue-900 mb-3 text-lg">ℹ️ Info del Ferry Puntarenas-Paquera</h3>
-              <div className="text-sm text-blue-800 space-y-2">
-                <p><strong>Duración travesía:</strong> 70-80 minutos</p>
-                <p><strong>Llegar antes:</strong> 40-60 minutos</p>
-                <p><strong>Costo aprox:</strong> $24 USD vehículo + conductor</p>
-                <p><strong>Horarios:</strong> 6 salidas diarias</p>
-                <p className="pt-2 border-t border-blue-200"><strong>⚠️ Importante:</strong> Reservar con anticipación en temporada alta en <a href="https://www.quickpaycr.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">QuickPay</a></p>
+              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
+                <p className="text-xs uppercase tracking-widest text-cyan-200 flex items-center gap-2">
+                  <Wallet className="h-3.5 w-3.5" />
+                  Cajeros recomendados
+                </p>
+                <div className="mt-3 flex flex-wrap gap-2 text-xs">
+                  <a
+                    href={atmBncrUrl}
+                    target="_blank"
+                    rel="noopener noreferrer"
+                    className="rounded-full border border-cyan-400/30 px-3 py-1 text-cyan-200 underline"
+                  >
+                    Banco Nacional (BNCR)
+                  </a>
+                  <a
+                    href={atmBcrUrl}
+                    target="_blank"
+                    rel="noopener noreferrer"
+                    className="rounded-full border border-fuchsia-400/30 px-3 py-1 text-fuchsia-200 underline"
+                  >
+                    Banco de Costa Rica (BCR)
+                  </a>
+                </div>
               </div>
             </div>
           </div>
-        </div>
+        </section>
 
-        {/* Footer */}
-        <div className="text-center mt-6 text-gray-600 text-sm">
-          <p>Tiempos calculados en base a múltiples fuentes validadas • Última actualización: Enero 2025</p>
-        </div>
+        {legs.length > 0 && (
+          <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0a0f1f] to-[#05070d] p-6">
+            <div className="flex items-center gap-3">
+              <Activity className="h-5 w-5 text-cyan-300" />
+              <h2 className="text-xl font-semibold">Tramos y tiempos detallados</h2>
+            </div>
+
+            <div className="mt-4 grid gap-4 md:grid-cols-2">
+              {legs.map((leg, index) => (
+                <div
+                  key={`${leg.from}-${leg.to}-${index}`}
+                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
+                >
+                  <div className="flex items-start justify-between">
+                    <div>
+                      <p className="text-lg font-semibold text-white">
+                        {leg.from} → {leg.to}
+                      </p>
+                      {(leg.from === "Santa Teresa" || leg.to === "Santa Teresa") && (
+                        <p className="text-xs text-blue-200">
+                          ({leg.from === "Santa Teresa" ? leg.ferryFrom : leg.ferryTo})
+                        </p>
+                      )}
+                    </div>
+                    <span className="rounded-full border border-cyan-400/30 px-2 py-1 text-xs text-cyan-200">
+                      {((leg.rec || 0) * totalFactor).toFixed(1)}h
+                    </span>
+                  </div>
+                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
+                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-2 py-2 text-emerald-200">
+                      Min {(leg.min * totalFactor).toFixed(1)}h
+                    </div>
+                    <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-2 py-2 text-cyan-200">
+                      Rec {(leg.rec * totalFactor).toFixed(1)}h
+                    </div>
+                    <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-2 text-fuchsia-200">
+                      Max {(leg.max * totalFactor).toFixed(1)}h
+                    </div>
+                  </div>
+                  <div className="mt-3 flex gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
+                    <Info size={14} className="mt-0.5 text-cyan-300" />
+                    <p>{leg.notes}</p>
+                  </div>
+                </div>
+              ))}
+            </div>
+          </section>
+        )}
+
+        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
+          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">
+            <div className="flex items-center gap-3">
+              <MapPin className="h-5 w-5 text-emerald-300" />
+              <h2 className="text-xl font-semibold">Checklist de viaje</h2>
+            </div>
+            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-white/80">
+              {[
+                "Reserva de ferry confirmada",
+                "Seguro de coche + 4x4",
+                "Hoteles y check-ins listos",
+                "Equipo de lluvia",
+                "SIM local o eSIM",
+                "Lista de restaurantes",
+              ].map((item) => (
+                <div
+                  key={item}
+                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
+                >
+                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
+                  {item}
+                </div>
+              ))}
+            </div>
+          </div>
+
+          <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#0a1322] to-[#05070d] p-6">
+            <h2 className="text-xl font-semibold text-blue-100">Ferry Puntarenas ⟷ Paquera</h2>
+            <div className="mt-4 space-y-2 text-sm text-blue-100/80">
+              <p>Duración travesía: 70-80 minutos</p>
+              <p>Llegar antes: 40-60 minutos</p>
+              <p>Costo aprox: $24 USD vehículo + conductor</p>
+              <p>Horarios: 6 salidas diarias</p>
+              <p className="pt-2 border-t border-blue-400/20">
+                Reserva en{" "}
+                <a
+                  href="https://www.quickpaycr.com"
+                  target="_blank"
+                  rel="noopener noreferrer"
+                  className="text-blue-200 underline"
+                >
+                  QuickPay
+                </a>
+              </p>
+            </div>
+          </div>
+        </section>
+
+        <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0b1020] to-[#05070d] p-6">
+          <div className="flex items-center gap-3">
+            <Save className="h-5 w-5 text-cyan-300" />
+            <h2 className="text-xl font-semibold">Guardar ruta personalizada</h2>
+          </div>
+          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
+            <input
+              value={planName}
+              onChange={(e) => setPlanName(e.target.value)}
+              placeholder="Nombre de la ruta (ej. Costa Rica Febrero)"
+              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
+            />
+            <button
+              type="button"
+              onClick={savePlan}
+              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30"
+            >
+              <Landmark className="h-4 w-4" />
+              Guardar ruta
+            </button>
+          </div>
+
+          <div className="mt-6 grid gap-3 md:grid-cols-2">
+            {savedPlans.length === 0 && (
+              <p className="text-sm text-cyan-100/60">
+                Aún no hay rutas guardadas. Usa el botón para crear la primera.
+              </p>
+            )}
+            {savedPlans.map((plan) => (
+              <div
+                key={plan.id}
+                className="rounded-2xl border border-white/10 bg-black/40 p-4"
+              >
+                <p className="text-lg font-semibold text-white">{plan.name}</p>
+                <p className="text-xs text-cyan-200/70">
+                  {plan.dates} • {plan.season} • {plan.traffic}
+                </p>
+                <div className="mt-3 text-xs text-white/70">
+                  <p className="font-semibold text-cyan-200">
+                    Paradas ({plan.stops.length})
+                  </p>
+                  <ul className="mt-2 space-y-1">
+                    {plan.stops.map((stop) => (
+                      <li key={`${plan.id}-${stop.id}`}>
+                        • {stop.location} — {stop.lodgingName || "Alojamiento pendiente"}
+                      </li>
+                    ))}
+                  </ul>
+                </div>
+              </div>
+            ))}
+          </div>
+        </section>
+
+        <footer className="text-center text-xs text-cyan-200/60">
+          Dashboard interactivo • Última actualización: Enero 2025 • Datos
+          estimados con margen de seguridad.
+        </footer>
       </div>
     </div>
   );
 }
