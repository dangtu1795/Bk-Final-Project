import * as Sequelize from 'sequelize';


export default function defineImage(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  var Image = <any> sequelize.define('Image', {
    title: DataTypes.STRING,
    src: DataTypes.STRING,
  });

  return Image;
}
