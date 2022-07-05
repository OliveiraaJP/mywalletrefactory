import connection from "../config/database.js";

async function hasUser(email){
   return await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );

}

async function signin(name,email,hashedPassword) {
return  await connection.query(
  `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
  [name, email, hashedPassword]
);
}

async function signup(email){
    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );

      const [user] = rows
      return user
}

const authRepositories = {
signin,
signup,
hasUser
};

export default authRepositories