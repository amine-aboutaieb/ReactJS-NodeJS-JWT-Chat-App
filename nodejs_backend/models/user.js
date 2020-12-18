const dbConnection = require("./dbCon").con;

module.exports = {
    checkAccountRegister : (email)=>{
        return new Promise((resolve, reject)=>{
            dbConnection.query(`SELECT COUNT(*) AS num FROM users WHERE email LIKE ${dbConnection.escape(email)}`, (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result[0]);
                }
            });
        });
    },
    register : ({firstName, lastName, email, pwd})=>{
        return new Promise((resolve, reject)=>{
            dbConnection.query(`INSERT INTO users VALUES(NULL, ${dbConnection.escape(firstName)}, ${dbConnection.escape(lastName)}, ${dbConnection.escape(email)}, ${dbConnection.escape(pwd)});`, (error)=>{
                if(error){
                    reject(error);
                }else{
                    resolve();
                }
            });
        });
    },
    login : ({email, pwd})=>{
        return new Promise((resolve, reject)=>{
            dbConnection.query(`SELECT * FROM users WHERE email LIKE ${dbConnection.escape(email)} AND pwd LIKE ${dbConnection.escape(pwd)};`, (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result[0]);
                }
            });
        });
    }
}