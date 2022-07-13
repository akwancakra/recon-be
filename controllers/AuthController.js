import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) return res.status(400).json({ msg: "Password dan Password Konfirmasi tidak cocok!" });

    // HASING PASSWORD
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword,
        });
        res.status(201).json({ msg: "Akun berhasil dibuat!" })
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: { email: req.body.email }
        });

        // CHECK PASSWORD SAMA OR TIDAK
        const match = await bcrypt.compare(req.body.password, user[0].password);
        // JIKA PASSWORD SALAH
        if (!match) return res.status(400).json({ msg: "Password salah!" });

        // INITIATE THE VARIABLES
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '120s'
        });
        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30d'
        });

        // PUT REFRESH TOKEN TO USER
        await Users.update({
            refresh_token: refreshToken
        }, { where: { id: userId } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 2592000000
                // secure: true
        });

        res.json({ accessToken });
    } catch (error) {
        // JIKA EMAIL TIDAK ADA
        res.status(404).json({ msg: "Email tidak ditemukan!" });
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    const user = await Users.findAll({
        where: { refresh_token: refreshToken }
    });

    if (!user[0]) return res.sendStatus(204);

    const userId = user[0].id;

    await Users.update({
        refresh_token: null
    }, {
        where: { id: userId }
    });

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
}