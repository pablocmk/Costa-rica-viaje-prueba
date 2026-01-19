import '../styles/globals.css';

export const metadata = {
  title: 'Costa Rica Trip Planner',
  description: 'Planificador colaborativo de ruta en coche por Costa Rica',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
