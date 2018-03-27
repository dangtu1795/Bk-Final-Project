import * as Sequelize from "sequelize"

export default function defineMasterProfile(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var MasterProfile = sequelize.define("MasterProfile", {
        degree: DataTypes.STRING,
        self_introduce: DataTypes.TEXT,
        rate: DataTypes.FLOAT,
        rate_count: DataTypes.INTEGER
    });

    return MasterProfile;
}