import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true
  },
  nombreEmpresa: {
    type: String,
    required: true
  },
  messages: [{
    role: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Conversation', conversationSchema);

