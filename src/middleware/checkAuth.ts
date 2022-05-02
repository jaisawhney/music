import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string);
        return next();
    } catch {
        return res.redirect('/login');
    }
};

export default checkAuth;