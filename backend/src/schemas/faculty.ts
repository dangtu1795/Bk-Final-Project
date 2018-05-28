import * as Sequelize from "sequelize"

export default function defineFaculty(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Faculty = sequelize.define("Faculty", {
        name: DataTypes.STRING,
        foundation_date: DataTypes.DATE,
        phone: DataTypes.STRING,
        wesite: DataTypes.STRING,
        email: DataTypes.STRING,
        overview: DataTypes.TEXT
    });

    Faculty.associate = function (schemas: any) {
        Faculty.hasMany(schemas.Major, {foreignKey: 'facultyId'})
    };

    return Faculty;
}