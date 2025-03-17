import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import trainerRoutes from './routes/trainer.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/home', express.static(path.join(__dirname, 'public')));
app.use('/api/trainers', trainerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});