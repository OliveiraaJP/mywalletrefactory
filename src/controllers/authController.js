import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepositories  from "../repositories/authRepositories.js";

export const postSignIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.sendStatus(422);
    }

    const existingUsers = await authRepositories.hasUser(email)

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    await authRepositories.signin(name,email,hashedPassword)

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const postSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(422);
    }

    const user = await authRepositories.signup(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    res.send({
      token,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
