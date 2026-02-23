import express from "express";
import { produtoRoutes } from "./produto.routes.js";
import { categoriaRoutes } from "./categoria.routes.js";

const router = express.Router();

router.use("/", produtoRoutes);
router.use("/", categoriaRoutes);

export default router;