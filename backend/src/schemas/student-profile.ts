import * as Sequelize from "sequelize"

export default function defineStudentProfile(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var StudenProfile = sequelize.define("StudentProfile", {
        name: DataTypes.STRING,
        overview: DataTypes.TEXT,
        display_name: DataTypes.STRING,
        student_id: DataTypes.STRING
    });

    StudenProfile.associate = function (schemas: any) {
        StudenProfile.belongsTo(schemas.User);
        StudenProfile.belongsToMany(schemas.Class, {through: "ClassMembers", as: 'Classes'});
    };

    return StudenProfile;
}