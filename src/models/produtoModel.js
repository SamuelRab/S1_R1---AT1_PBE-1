import pool from "../config/db.js";

const produtoModel = {

    async selecionarTodos() {
        const [rows] = await pool.query("SELECT * FROM Produto");
        return rows;
    },

    async selecionarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM Produto WHERE idProduto = ?",
            [id]
        );
        return rows;
    },

    async selecionarPorCategoria(idCategoria) {
        const [rows] = await pool.query(
            "SELECT * FROM Produto WHERE idCategoria = ?",
            [idCategoria]
        );
        return rows;
    },

    async inserirProduto(idCategoria, nomeProduto, valorProduto, vinculoImagem) {
        const [result] = await pool.query(
            "INSERT INTO Produto (idCategoria, nomeProduto, valorProduto, vinculoImagem) VALUES (?, ?, ?, ?)",
            [idCategoria, nomeProduto, valorProduto, vinculoImagem]
        );
        return result;
    },

    async atualizarProduto(nomeProduto, valorProduto, idCategoria) {
        const [result] = await pool.query(
            "UPDATE Produto SET nomeProduto = ?, valorProduto = ? WHERE idCategoria = ?",
            [nomeProduto, valorProduto, idCategoria]
        );
        return result;
    },

    async excluirProduto(idProduto) {
        const [result] = await pool.query(
            "DELETE FROM Produto WHERE idProduto = ?",
            [idProduto]
        );
        return result;
    }
};

export { produtoModel };