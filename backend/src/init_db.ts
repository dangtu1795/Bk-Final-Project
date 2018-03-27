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
        return sequelize.sync({force: true});
    } catch (e) {
        console.log("========== init migration and clear database!");
        console.error(e.stack);
    }
}
initDb();
