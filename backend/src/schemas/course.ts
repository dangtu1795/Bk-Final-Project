import * as Sequelize from "sequelize"

export default function defineCourse(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Course = sequelize.define("Course", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        outline: DataTypes.STRING
    });

    Course.associate = function (schemas) {
      Course.belongsTo(schemas.Schedule);
      Course.belongsTo(schemas.Faculty);
      Course.belongsTo(schemas.Major);
      Course.hasMany(schemas.Lecture)
    };

    return Course;
}