import * as Sequelize from "sequelize"

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        role: DataTypes.ENUM('admin', 'master', 'student'),
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

    User.associate = function (schemas: any) {
      User.hasOne(schemas.StudentProfile);
      User.hasOne(schemas.MasterProfile);
      User.belongsTo(schemas.Image, {as: 'avatar'});
      User.belongsTo(schemas.Faculty, {as: 'faculty'});
      User.belongsTo(schemas.Major, {as: 'major'});
    };

    return User;
}