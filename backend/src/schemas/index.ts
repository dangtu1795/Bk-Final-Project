'use strict';

import * as config from "../libs/config";

var fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize');

class Database {
    private _basename: string;
    private _models: any;
    private _sequelize: any;

    constructor() {
        this._basename = path.basename(module.filename);

        let dbConfig = config.database;
        console.log("DB CONFIG ", dbConfig);

        this._sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password,
            Object.assign({
                define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true}}, dbConfig.config)
        );
        this._sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && path.extname(file) != ".map" && file[0] != ".";
        }).forEach((file: string) => {
            console.log("import ", file);
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });

    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database();
export const schemas = database.getModels();
export const sequelize = database.getSequelize();
