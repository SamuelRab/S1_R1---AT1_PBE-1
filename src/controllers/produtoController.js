import { produtoModel } from "../models/produtoModel.js";
import { categoriaModel } from "../models/categoriaModel.js";

export const produtoController = {

    async buscarTodosProdutos(req, res) {
        try {
            const resultado = await produtoModel.selecionarTodos();

            return res.status(200).json({
                message: resultado.length === 0
                    ? "Nenhum produto cadastrado"
                    : "Produtos listados com sucesso",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    },

    async buscarProdutoPorID(req, res) {
        try {
            const id = Number(req.params.idProduto);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const resultado = await produtoModel.selecionarPorId(id);

            if (resultado.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            return res.status(200).json({
                message: "Produto localizado",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    },

    async buscarProdutoPorCategoria(req, res) {
        try {
            const idCategoria = Number(req.params.idCategoria);

            if (!Number.isInteger(idCategoria) || idCategoria <= 0) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const resultado = await produtoModel.selecionarPorCategoria(idCategoria);

            return res.status(200).json({
                message: resultado.length === 0
                    ? "Nenhum produto encontrado para esta categoria"
                    : "Produtos listados com sucesso",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    },

    async incluirProduto(req, res) {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            if (!Number.isInteger(Number(idCategoria)) || Number(idCategoria) <= 0) {
                return res.status(400).json({ message: "ID da categoria inválido" });
            }

            if (!nomeProduto || isNaN(Number(valorProduto))) {
                return res.status(400).json({
                    message: "Nome e valor do produto são obrigatórios"
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem do produto é obrigatória"
                });
            }

            const categoriaExiste = await categoriaModel.selecionarPorId(idCategoria);

            if (categoriaExiste.length === 0) {
                return res.status(400).json({
                    message: "Categoria não existe"
                });
            }

            const vinculoImagem = `/uploads/images/${req.file.filename}`;

            const resultado = await produtoModel.inserirProduto(
                idCategoria,
                nomeProduto.trim(),
                Number(valorProduto),
                vinculoImagem
            );

            return res.status(201).json({
                message: "Produto cadastrado com sucesso",
                insertId: resultado.insertId
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    },

    async atualizarProduto(req, res) {
        try {
            const id = Number(req.params.idProduto);
            const { nomeProduto, valorProduto } = req.body;

            if (!Number.isInteger(id) || id <= 0 ||
                !nomeProduto ||
                isNaN(Number(valorProduto))) {
                return res.status(400).json({
                    message: "Dados inválidos"
                });
            }

            const produtoExiste = await produtoModel.selecionarPorId(id);

            if (produtoExiste.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            await produtoModel.atualizarProduto(
                nomeProduto.trim(),
                Number(valorProduto),
                id
            );

            return res.status(200).json({
                message: "Produto atualizado com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    },

    async excluirProduto(req, res) {
        try {
            const id = Number(req.params.idProduto);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const produtoExiste = await produtoModel.selecionarPorId(id);

            if (produtoExiste.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }

            await produtoModel.excluirProduto(id);

            return res.status(200).json({
                message: "Produto excluído com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }
};