import * as Sequelize from "sequelize"

export default function defineLecture(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Lecture = sequelize.define("Lecture", {
        title: DataTypes.STRING,
        slideUrl: DataTypes.STRING,
        videoUrl: DataTypes.STRING,
    });

    Lecture.associate = function (schemas) {
      Lecture.belongsTo(schemas.Course);
    };

    return Lecture;
}