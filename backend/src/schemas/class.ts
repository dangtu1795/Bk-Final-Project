import * as Sequelize from "sequelize"

export default function defineClass(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Class = sequelize.define("Class", {
        name: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        note: DataTypes.TEXT,
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

    Class.associate = function (schemas: any) {
        Class.belongsTo(schemas.Course);
        Class.hasMany(schemas.Lecture);
        Class.belongsTo(schemas.Schedule);
        Class.belongsToMany(schemas.StudentProfile, {through: "ClassMembers", as: 'Members'})
    };

    return Class;
}