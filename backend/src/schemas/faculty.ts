import * as Sequelize from "sequelize"

export default function defineFaculty(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Faculty = sequelize.define("Faculty", {
        title: DataTypes.STRING
    });

    Faculty.associate = function (schemas) {
    };

    return Faculty;
}