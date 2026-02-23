import pool from "../config/db.js";

const produtoModel = {

    selecionarTodos: async () => {
        const sql = "SELECT * FROM Produto";
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pId) => {
        const sql = "SELECT * FROM Produto WHERE idProduto = ?";
        const [rows] = await pool.query(sql, [pId]);
        return rows;
    },

    selecionarPorCategoria: async (pIdCategoria) => {
        const sql = "SELECT * FROM Produto WHERE idCategoria = ?";
        const [rows] = await pool.query(sql, [pIdCategoria]);
        return rows;
    },

    selecionarPorNome: async (pNome) => {
        const sql = "SELECT * FROM Produto WHERE nomeProduto = ?";
        const [rows] = await pool.query(sql, [pNome]);
        return rows;
    },

    inserirProduto: async (pNome, pValor) => {
        const sql = "INSERT INTO Produto (nomeProduto, valorProduto) VALUES (?, ?)";
        const [result] = await pool.query(sql, [pNome, pValor]);
        return result;
    },

    atualizarProduto: async (pNome, pValor, pId) => {
        const sql = "UPDATE Produto SET nomeProduto = ?, valorProduto = ? WHERE idProduto = ?";
        const [result] = await pool.query(sql, [pNome, pValor, pId]);
        return result;
    },

    excluirProduto: async (pId) => {
        const sql = "DELETE FROM Produto WHERE idProduto = ?";
        const [result] = await pool.query(sql, [pId]);
        return result;
    }

};

export { produtoModel };