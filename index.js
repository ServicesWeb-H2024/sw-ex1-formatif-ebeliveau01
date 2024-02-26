const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT | 3000;

app.use('/api/titres/', require('./src/routes/netflix-serie.routes'));

app.get('/', (req, res) => {
    res.send('salut');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré ${PORT}`);
});
