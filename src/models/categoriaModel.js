import pool from "../config/db.js";

const categoriaModel = {

    selecionarTodasCategorias: async () => {
        const sql = "SELECT * FROM Categoria";
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pId) => {
        const sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
        const [rows] = await pool.query(sql, [pId]);
        return rows;
    },

    selecionarPorDescricao: async (pDescricao) => {
        const sql = "SELECT * FROM Categoria WHERE descricaoCategoria = ?";
        const [rows] = await pool.query(sql, [pDescricao]);
        return rows;
    },

    inserirCategoria: async (pDescricao) => {
        const sql = "INSERT INTO Categoria (descricaoCategoria) VALUES (?)";
        const [result] = await pool.query(sql, [pDescricao]);
        return result;
    },

    atualizarCategoria: async (pId, pDescricao) => {
        const sql = "UPDATE Categoria SET descricaoCategoria = ? WHERE idCategoria = ?";
        const [result] = await pool.query(sql, [pDescricao, pId]);
        return result;
    },

    excluirCategoria: async (pId) => {
        const sql = "DELETE FROM Categoria WHERE idCategoria = ?";
        const [result] = await pool.query(sql, [pId]);
        return result;
    }

};

export { categoriaModel };