import * as Sequelize from "sequelize"

export default function defineMasterProfile(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var MasterProfile = sequelize.define("MasterProfile", {
        name: DataTypes.STRING,
        self_introduction: DataTypes.TEXT,
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        rate_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        master_id: DataTypes.STRING
    });

    MasterProfile.associate = function (schemas: any) {
        MasterProfile.hasMany(schemas.Course);
    };

    return MasterProfile;
}