import express from "express";
import router from './routes/routes.js'
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/", router);

const PORT = process.env.SERVER_PORT || 5500;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});