import pool from "../config/db.js";

const categoriaModel = {

    async selecionarTodasCategorias() {
        const [rows] = await pool.query("SELECT * FROM Categoria");
        return rows;
    },

    async selecionarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM Categoria WHERE idCategoria = ?",
            [id]
        );
        return rows;
    },

    async inserirCategoria(descricao) {
        const [result] = await pool.query(
            "INSERT INTO Categoria (descricaoCategoria) VALUES (?)",
            [descricao]
        );
        return result;
    },

    async atualizarCategoria(id, descricao) {
        const [result] = await pool.query(
            "UPDATE Categoria SET descricaoCategoria = ? WHERE idCategoria = ?",
            [descricao, id]
        );
        return result;
    },

    async excluirCategoria(id) {
        const [result] = await pool.query(
            "DELETE FROM Categoria WHERE idCategoria = ?",
            [id]
        );
        return result;
    }
};

export { categoriaModel };