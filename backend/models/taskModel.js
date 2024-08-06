// models/taskModel.js
const { pool } = require("../config/database");

const taskModel = {
  create: async (userId, title, description) => {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, description]
    );
    return result.rows[0];
  },

  findByUserId: async (userId) => {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 AND deleted_at IS NULL",
      [userId]
    );
    return result.rows;
  },

  update: async (id, userId, title, description) => {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, id, userId]
    );
    return result.rows[0];
  },

  softDelete: async (id, userId) => {
    const result = await pool.query(
      "UPDATE tasks SET deleted_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    return result.rows[0];
  },
};

module.exports = taskModel;
