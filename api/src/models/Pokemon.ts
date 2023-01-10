import { DataTypes,Sequelize,Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';
import {sequelize} from '../db';

enum Origin{
  Api = "api+",
  Custom = "custom+",
}

class Pokemon extends Model{
  declare id:string;
  declare name:string;
  declare classes:string[];
  declare hp:number;
  declare attack:number;
  declare defense:number;
  declare specialAttack:number;
  declare specialDefense:number;
  declare speed:number;
  declare height:number;
  declare weight:number;
  declare img:string;
  declare origin:Origin;
  declare createdAt:CreationOptional<Date>;
  declare updateAt:CreationOptional<Date>;
}

Pokemon.init({
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
      isInsideLimit(value : string[] ){
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
  specialAttack:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      min:1,
    }
  },
  specialDefense:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      min:1,
    }
  },
  speed:{
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
},{
  sequelize,
  tableName:'pokemons'
});

export default Pokemon;