require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());


app.use(express.json());



// Connexion MongoDB
connectDB();

// Routes de test
app.get('/', (req, res) => {
  res.send('API EMR opérationnelle');
});
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const testRoutes = require('./routes/test');
app.use('/test', testRoutes);

const patientRoutes = require('./routes/patients');
app.use('/patients', patientRoutes);

const doctorRoutes = require('./routes/doctors');
app.use('/doctors', doctorRoutes);

const consultationRoutes = require('./routes/consultations');
app.use('/consultations', consultationRoutes);

const emrRoutes = require('./routes/emrs');
app.use('/emrs', emrRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);



const examRoutes = require('./routes/exams');
app.use('/exams', examRoutes);


const prescriptionRoutes = require('./routes/prescriptions');
app.use('/prescriptions', prescriptionRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
