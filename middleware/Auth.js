import jwt from 'jsonwebtoken';

export const Auth = (req, res, next) => {
    // AMBIL TOKEN
    const authHeader = req.headers['authorization'];
    // JIKA TOKEN KOSONG
    // JIKA TOKEN ADA / DIAMBIL
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // UNAUTHORIZE
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // FORBIDDEN
        next();
    });
}