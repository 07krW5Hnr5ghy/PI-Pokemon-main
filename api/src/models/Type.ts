import { DataTypes,Sequelize,Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';
import {sequelize} from '../db';

class Type extends Model{
  declare id:string;
  declare type:string;
  declare createdAt:CreationOptional<Date>;
  declare updateAt:CreationOptional<Date>;
}

Type.init({
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull:false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  }
},{
  sequelize,
  tableName:'types',
});

export default Type;
/*module.exports = (sequelize:Sequelize) => {
  // Types model
  sequelize.define('type', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    }
  });
};*/