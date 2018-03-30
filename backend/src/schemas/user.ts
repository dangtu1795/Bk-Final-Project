import * as Sequelize from "sequelize"

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        role: DataTypes.ENUM('admin', 'master', 'student'),
    });

    User.associate = function (schemas) {
      User.hasOne(schemas.StudentProfile);
      User.hasOne(schemas.TeacherProfile);
      User.belongsTo(schemas.Image, {as: 'avatar'});
      User.belongsTo(schemas.Faculty, {as: 'faculty'});
      User.belongsTo(schemas.Major, {as: 'major'});
    };

    return User;
}