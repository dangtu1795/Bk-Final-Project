import * as Sequelize from "sequelize"

export default function defineStudentProfile(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var StudenProfile = sequelize.define("StudentProfile", {
        university: DataTypes.STRING,
        major: DataTypes.STRING,
        faculty: DataTypes.STRING,
    });

    return StudenProfile;
}