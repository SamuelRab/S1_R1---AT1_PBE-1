import express from "express";
import { produtoController } from "../controllers/produtoController.js";
import uploadImage from "../middlewares/uploadImage.middleware.js"

const produtoRoutes = express.Router();

produtoRoutes.get("/produtos", produtoController.buscarTodosProdutos);
produtoRoutes.get("/produtos/:idProduto", produtoController.buscarProdutoPorID);
produtoRoutes.get("/produtos/categoria/:idCategoria", produtoController.buscarProdutoPorCategoria);
produtoRoutes.get("/produtos/nome/:nomeProduto", produtoController.buscarProdutoPorNome);
produtoRoutes.post("/produtos", produtoController.incluirProduto);
produtoRoutes.put("/produtos/:idProduto", produtoController.atualizarProduto);
produtoRoutes.delete("/produtos/:idProduto", produtoController.excluirProduto);

export { produtoRoutes };