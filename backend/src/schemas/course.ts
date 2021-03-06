import * as Sequelize from "sequelize"

export default function defineCourse(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Course = sequelize.define("Course", {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        outline: DataTypes.TEXT,
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

    Course.associate = function (schemas: any) {
      Course.belongsTo(schemas.MasterProfile, {as: 'Master', foreignKey: 'MasterProfileId'});
      Course.hasMany(schemas.Class);
      Course.belongsTo(schemas.Image, {as: 'cover'});
    };

    return Course;
}