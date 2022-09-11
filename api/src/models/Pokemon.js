const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
     type:DataTypes.INTEGER,
     allowNull:false,
     primaryKey:true, 
     unique:'compositeIndex',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type:DataTypes.INTEGER,
    },
    attack:{
      type:DataTypes.INTEGER,
    },
    defense:{
      type:DataTypes.INTEGER,
    },
    speed:{
      type:DataTypes.INTEGER,
    },
    height:{
      type:DataTypes.INTEGER,
    },
    weight:{
      type:DataTypes.INTEGER,
    },custom:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      unique:'compositeIndex',
    }
  });
};
