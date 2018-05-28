// import {sequelize} from "./schemas";
//
// try {
//     return sequelize.sync({force: true});
// } catch (e) {
//     console.error(e.stack);
// }
//
//
import {sequelize} from "./schemas"
function initDb(){
    try {
        sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(
            sequelize.sync({force: true})
        )
    } catch (e) {
        console.error(e.stack);
    }
}
initDb();
