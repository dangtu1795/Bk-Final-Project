import * as Sequelize from 'sequelize';


export interface ScheduleAttributes {
}

export interface ScheduleInstance extends Sequelize.Instance<ScheduleAttributes> {

}

export default function defineSchedule(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Schedule = sequelize.define('Schedule', {
        title: DataTypes.STRING,
        from: DataTypes.DATE,
        to: DataTypes.DATE
    });

    Schedule.associate = function (schemas) {
        Schedule.belongsToMany(schemas.HourOfDay, {as: 'hour', through: 'ScheduleHour'});
    };

    return Schedule;
}
