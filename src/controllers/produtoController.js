import { produtoModel } from "../models/produtoModel.js";

export const produtoController = {

    async buscarTodosProdutos(req, res) {
        try {
            const resultado = await produtoModel.selecionarTodos();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({
                    message: "A tabela selecionada não contém dados"
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
                errorMessage: error.message,
            });
        }
    },

    async buscarProdutoPorID(req, res) {
        try {
            const id = Number(req.params.idProduto);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Forneça um ID válido"
                });
            }

            const resultado = await produtoModel.selecionarPorId(id);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({
                    message: `Produto com ID ${id} não localizado.`
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
                errorMessage: error.message,
            });
        }
    },

    async buscarProdutoPorCategoria(req, res) {
        try {
            const id = Number(req.params.idCategoria);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Forneça um ID válido"
                });
            }

            const resultado = await produtoModel.selecionarPorCategoria(id);

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
                errorMessage: error.message,
            });
        }
    },

    async buscarProdutoPorNome(req, res) {
        try {
            const nome = req.params.nomeProduto;

            if (!nome || nome.trim().length < 2) {
                return res.status(400).json({
                    message: "Forneça um nome válido"
                });
            }

            const resultado = await produtoModel.selecionarPorNome(nome.trim());

            return res.status(200).json({
                message: "Resultado dos dados listados",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message,
            });
        }
    },

    async incluirProduto(req, res) {
        try {
            const { idCategoria, nome, valor } = req.body;

            if (!nome || isNaN(Number(valor))) {
                return res.status(400).json({
                    message: "Dados inválidos: Nome e valor do produto são obrigatórios"
                });
            }

            const vinculoImagem = `/uploads/images/${req.file.filename}`

            const resultado = await produtoModel.inserirProduto(
                idCategoria, nome, valor, vinculoImagem
            );

            if (!resultado || resultado.affectedRows !== 1) {
                return res.status(500).json({
                    message: "Erro ao incluir o registro"
                });
            }

            return res.status(201).json({
                message: "Registro incluído com sucesso",
                insertId: resultado.insertId
            });

        } catch (error) {
            console.error("Erro ao incluir produto:", error);

            return res.status(500).json({
                message: "Ocorreu um erro no servidor"
            });
        }
    },

    async atualizarProduto(req, res) {
        try {
            const id = Number(req.params.idProduto);
            const { nomeProduto, valorProduto } = req.body;

            if (!Number.isInteger(id) || id <= 0 ||
                !nomeProduto ||
                valorProduto === undefined ||
                isNaN(Number(valorProduto))) {
                return res.status(400).json({
                    message: "Verifique os dados enviados. Nome e valor são obrigatórios."
                });
            }

            const produtoAtual = await produtoModel.selecionarPorId(id);

            if (!produtoAtual || produtoAtual.length === 0) {
                return res.status(404).json({
                    message: `Registro com ID ${id} não localizado.`
                });
            }

            const resultado = await produtoModel.atualizarProduto(
                nomeProduto.trim(),
                Number(valorProduto),
                id
            );

            if (resultado.affectedRows > 0) {
                return res.status(200).json({
                    message: "Registro atualizado com sucesso",
                    data: { id, nomeProduto, valorProduto }
                });
            }

            return res.status(200).json({
                message: "Nenhuma alteração foi necessária."
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message,
            });
        }
    },

    async excluirProduto(req, res) {
        try {
            const id = Number(req.params.idProduto);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Forneça um ID válido"
                });
            }

            const produtoSelecionado = await produtoModel.selecionarPorId(id);

            if (!produtoSelecionado || produtoSelecionado.length === 0) {
                return res.status(404).json({
                    message: `Registro com ID ${id} não localizado.`
                });
            }

            const resultado = await produtoModel.excluirProduto(id);

            if (resultado.affectedRows === 1) {
                return res.status(200).json({
                    message: "Produto excluído com sucesso"
                });
            }

            throw new Error("Não foi possível excluir o produto");

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message,
            });
        }
    }
};