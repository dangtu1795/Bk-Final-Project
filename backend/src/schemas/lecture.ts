import * as Sequelize from "sequelize"

export default function defineLecture(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Lecture = sequelize.define("Lecture", {
        title: DataTypes.STRING,
        slideUrl: DataTypes.STRING,
        videoUrl: DataTypes.STRING,
        exUrl: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        defaultScope: {
            where: {
                active: true
            }
        }, scopes: {
            deleted: {
                where: {
                    deleted: true
                }
            }
        }
    });

    Lecture.associate = function (schemas: any) {
      Lecture.belongsTo(schemas.Class);
    };

    return Lecture;
}