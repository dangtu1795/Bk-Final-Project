import * as Sequelize from "sequelize"

export default function defineStudentProfile(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var StudenProfile = sequelize.define("StudentProfile", {
        major: DataTypes.STRING,
        faculty: DataTypes.STRING,
        student_id: DataTypes.STRING
    });

    return StudenProfile;
}