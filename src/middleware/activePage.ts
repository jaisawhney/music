import {NextFunction, Request, Response} from 'express';

export const activePage = (req: Request, res: Response, next: NextFunction) => {
    res.locals.active = req.path.split('/')[1];
    next();
};

export default activePage;