const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
     type:DataTypes.STRING,
     primaryKey:true,
     unique:true,
     allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isAlpha:true,
      },
    },
    classes:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
      validate:{
        notEmpty:true,
        isInsideLimit(value){
          if(value.length > 2){
            throw new Error('Maximum of two types is allowed');
          }
        }
      }
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1,
      },
    },img:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        is:/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp)/,
      },
    },origin:{
      type:DataTypes.ENUM("api+","custom+"),
      defaultValue:"custom+",
    }
  });
};
