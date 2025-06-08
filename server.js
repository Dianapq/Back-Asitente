import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Verificar variables de entorno
if (!process.env.MONGO_URI) {
  console.error('❌ Error: MONGO_URI no está definida en el archivo .env');
  process.exit(1);
}

// Conectar a MongoDB
connectDB().catch(err => {
  console.warn('⚠️ Aplicación funcionando sin MongoDB:', err.message);
});

// Rutas
app.use('/api', chatRoutes);

// Middleware de errores mejorado
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
