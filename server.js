// Ruta base para verificar que el backend esté activo
app.get('/', (req, res) => {
  res.send('✅ API del Asistente activa');
});

// Servir favicon.ico desde la carpeta public
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

