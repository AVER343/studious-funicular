const pool = require('../../../postgres')
async function checkRoleTypeExists(role){
    let role_type = await pool.query(`SELECT user_role_type 
                            FROM  USER_ROLE_TYPE URT 
                            WHERE user_role_type=$1 and user_role_type != 'admin';
        `,[role])
        if(role_type.rowCount==0)
        {
            throw new Error(`Role type doesn't exists !`)
        }
}
module.exports = checkRoleTypeExists