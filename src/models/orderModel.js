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
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  plan: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  //preferencia de horário
  time: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  status:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
    defaultValue: "Em andamento",
  },
  code:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },

//data da contratação
  service:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },

  adress:{
    type:Sequelize.STRING,
    allowNull:true,
  },
  street:{
    type:Sequelize.STRING,
    allowNull:true,
  }
});
