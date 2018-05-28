import * as Sequelize from "sequelize"

export default function defineMajor(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Major = sequelize.define("Major", {
        name: DataTypes.STRING,
        overview: DataTypes.TEXT,

    });

    Major.associate = function (schemas: any) {
        Major.belongsTo(schemas.Faculty, {as: 'faculty', foreignKey: 'facultyId'})
    };
    return Major;
}