import * as Sequelize from "sequelize";


export interface HourOfDayAttributes {
}

export interface HourOfDayInstance extends Sequelize.Instance<HourOfDayAttributes> {
}

export default function defineHourOfDay(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var HourOfDay = sequelize.define('HourOfDay', {
        start: DataTypes.INTEGER,
        end: DataTypes.INTEGER,
        day_num: DataTypes.INTEGER
    });

    HourOfDay.associate = function (schemas) {
        HourOfDay.belongsToMany(schemas.Schedule, {
            through: 'ScheduleHour'
        });
    };

    return HourOfDay;
}