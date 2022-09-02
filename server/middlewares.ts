import { Request, Response, NextFunction} from "express"
import ErrorResponse from "./interfaces/ErrorResponse";
import RequestValidators from "./interfaces/RequestValidator";
import { ZodError } from "zod";



export function requestValidator(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if(validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }     
            if(validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }

            next();
        }
        catch(error) {
            if(error instanceof ZodError) {
                res.status(422);
                next(error);
            }
        }
    }
} 



export function NotFound(req: Request, res: Response, next: NextFunction){
    res.status(404);
    const error = Error(`Not found - ${req.originalUrl}`);
    next(error);
}


export function ErrorMessage(error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction){
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack 
    });
}