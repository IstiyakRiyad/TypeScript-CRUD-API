import { AnyZodObject, ZodError } from "zod";


export default interface RequestValidators {
    params?: AnyZodObject,
    body?: AnyZodObject,
    query?: AnyZodObject
};