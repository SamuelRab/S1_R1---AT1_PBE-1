import { categoriaModel } from "../models/categoriaModel.js";

export const categoriaController = {

    buscarTodasCategorias: async (req, res) => {
        try {
            const resultado = await categoriaModel.selecionarTodasCategorias();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({
                    message: "A tabela selecionada não contém dados",
                    data: []
                });
            }

            return res.status(200).json({
                message: "Dados recebidos",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: error.message
            });
        }
    },

    buscarCategoriaPorID: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);

            if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Forneça um ID válido"
                });
            }

            const resultado = await categoriaModel.selecionarPorId(id);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({
                    message: `Categoria com ID ${id} não localizada.`
                });
            }

            return res.status(200).json({
                message: "Resultado dos dados listados",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    buscarCategoriaPorDescricao: async (req, res) => {
        try {
            const descricao = req.params.descricaoCategoria;

            if (!descricao || descricao.trim().length < 2) {
                return res.status(400).json({
                    message: "Forneça uma descrição válida"
                });
            }

            const resultado = await categoriaModel.selecionarPorDescricao(descricao);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({
                    message: "Nenhuma categoria encontrada com essa descrição."
                });
            }

            return res.status(200).json({
                message: "Resultado dos dados listados",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    incluirCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria || descricaoCategoria.trim().length < 3) {
                return res.status(400).json({
                    message: "Descrição da categoria é obrigatória (mínimo 3 caracteres)"
                });
            }

            const resultado = await categoriaModel.inserirCategoria(descricaoCategoria);

            if (resultado.affectedRows === 1) {
                return res.status(201).json({
                    message: "Registro incluído com sucesso",
                    insertId: resultado.insertId
                });
            }

            throw new Error("Ocorreu um erro ao incluir o registro");

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    atualizarCategoria: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);
            const { descricaoCategoria } = req.body;

            if (Number.isNaN(id) || id <= 0 || !descricaoCategoria || descricaoCategoria.trim().length < 3) {
                return res.status(400).json({
                    message: "Verifique os dados enviados"
                });
            }

            const categoriaAtual = await categoriaModel.selecionarPorId(id);

            if (!categoriaAtual || categoriaAtual.length === 0) {
                return res.status(404).json({
                    message: `Registro com ID ${id} não localizado.`
                });
            }

            const resultado = await categoriaModel.atualizarCategoria(id, descricaoCategoria);

            if (resultado.affectedRows > 0) {
                return res.status(200).json({
                    message: "Registro atualizado com sucesso",
                    data: { id, descricaoCategoria }
                });
            }

            return res.status(200).json({
                message: "Nenhuma alteração foi necessária."
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: error.message
            });
        }
    },

    excluirCategoria: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);

            if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Forneça um ID válido"
                });
            }

            const categoriaSelecionada = await categoriaModel.selecionarPorId(id);

            if (!categoriaSelecionada || categoriaSelecionada.length === 0) {
                return res.status(404).json({
                    message: `Registro com ID ${id} não localizado.`
                });
            }

            const resultado = await categoriaModel.excluirCategoria(id);

            if (resultado.affectedRows === 1) {
                return res.status(200).json({
                    message: "Categoria excluída com sucesso"
                });
            }

            throw new Error("Não foi possível excluir a categoria");

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    }
};