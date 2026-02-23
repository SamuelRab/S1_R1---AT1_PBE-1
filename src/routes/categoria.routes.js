import express from "express";
import { categoriaController } from "../controllers/categoriaController.js";

const categoriaRoutes = express.Router();

categoriaRoutes.get("/categorias", categoriaController.buscarTodasCategorias);
categoriaRoutes.get("/categorias/:idCategoria", categoriaController.buscarCategoriaPorID);
categoriaRoutes.get("/categorias/descricao/:descricaoCategoria", categoriaController.buscarCategoriaPorDescricao);
categoriaRoutes.post("/categorias", categoriaController.incluirCategoria);
categoriaRoutes.put("/categorias/:idCategoria", categoriaController.atualizarCategoria);
categoriaRoutes.delete("/categorias/:idCategoria", categoriaController.excluirCategoria);

export { categoriaRoutes };