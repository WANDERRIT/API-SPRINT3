import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("order", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.BIGINT.UNSIGNED,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  plan: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
  },
  status:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  }
});
