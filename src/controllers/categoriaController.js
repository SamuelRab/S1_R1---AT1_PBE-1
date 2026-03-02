import { categoriaModel } from "../models/categoriaModel.js";

export const categoriaController = {

    async buscarTodasCategorias(req, res) {
        try {
            const resultado = await categoriaModel.selecionarTodasCategorias();

            return res.status(200).json({
                message: resultado.length === 0
                    ? "A tabela não contém dados"
                    : "Dados recebidos com sucesso",
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

    async buscarCategoriaPorID(req, res) {
        try {
            const id = Number(req.params.idCategoria);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const resultado = await categoriaModel.selecionarPorId(id);

            if (resultado.length === 0) {
                return res.status(404).json({
                    message: `Categoria com ID ${id} não encontrada`
                });
            }

            return res.status(200).json({
                message: "Categoria localizada",
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

    async incluirCategoria(req, res) {
        try {
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria || descricaoCategoria.trim().length < 3) {
                return res.status(400).json({
                    message: "Descrição obrigatória (mínimo 3 caracteres)"
                });
            }

            const resultado = await categoriaModel.inserirCategoria(
                descricaoCategoria.trim()
            );

            return res.status(201).json({
                message: "Categoria criada com sucesso",
                insertId: resultado.insertId
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    },

    async atualizarCategoria(req, res) {
        try {
            const id = Number(req.params.idCategoria);
            const { descricaoCategoria } = req.body;

            if (!Number.isInteger(id) || id <= 0 ||
                !descricaoCategoria || descricaoCategoria.trim().length < 3) {
                return res.status(400).json({
                    message: "Dados inválidos"
                });
            }

            const categoriaExiste = await categoriaModel.selecionarPorId(id);

            if (categoriaExiste.length === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            await categoriaModel.atualizarCategoria(id, descricaoCategoria.trim());

            return res.status(200).json({
                message: "Categoria atualizada com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    },

    async excluirCategoria(req, res) {
        try {
            const id = Number(req.params.idCategoria);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const categoriaExiste = await categoriaModel.selecionarPorId(id);

            if (categoriaExiste.length === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            await categoriaModel.excluirCategoria(id);

            return res.status(200).json({
                message: "Categoria excluída com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    }
};