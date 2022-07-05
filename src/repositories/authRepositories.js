import connection from "../config/database.js";

async function signin() {

}

async function signup(){
    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );

      const [user] = rows
      return user
}

const authRepositories = {
signin,
signup
};

export default authRepositories