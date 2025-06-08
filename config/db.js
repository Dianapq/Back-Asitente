import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('La variable MONGO_URI no está definida en el archivo .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    // No lanzar el error, permitir que la aplicación continúe
    return null;
  }
};

export default connectDB;