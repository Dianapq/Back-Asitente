import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const handleChat = async (req, res) => {
  try {
    const { message, nombreUsuario, nombreEmpresa } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'El mensaje es requerido' 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente amable que está hablando con ${nombreUsuario} de la empresa ${nombreEmpresa}. Proporciona respuestas claras y profesionales.`
        },
        { 
          role: "user", 
          content: message 
        }
      ],
    });

    res.json({
      success: true,
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error en el chat:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar el mensaje'
    });
  }
};
