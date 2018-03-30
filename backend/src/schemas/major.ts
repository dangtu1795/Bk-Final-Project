import * as Sequelize from "sequelize"

export default function defineMajor(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Major = sequelize.define("Major", {
        title: DataTypes.STRING
    });

    Major.associate = function (schemas) {
        Major.belongsTo(schemas.Faculty, {as: 'faculty'})
    };
    return Major;
}