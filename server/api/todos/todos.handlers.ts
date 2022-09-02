import { Request, Response, NextFunction} from "express";
import {TodoWithId, Todos, Todo} from "./todos.model";
import { IdParams } from "../../interfaces/IdParams";
import { ObjectId, WithId } from "mongodb";


export async function findAll (req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        // 3 dot because it is a cursor
        const result = await Todos.find({}).toArray();

        res.json(result);  
    }
    catch (error) {
        next(error);
    }
}


export async function findOne (req: Request<IdParams, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOne({_id: new ObjectId(req.params.id)});
        
        if(!result) {
            res.status(404);
            throw new Error(`Todos with id ${req.params.id} found`);
        }
        
        res.json(result);  
    }
    catch (error) {
        next(error);
    }
}

export async function createOne (req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const insertResult = await Todos.insertOne(req.body);

        if(!insertResult.acknowledged) throw new Error('Error inserting to the database');

        res.status(201);

        res.json({
            _id : insertResult.insertedId,
            ...req.body
        })
    }
    catch (error) {
        next(error);
    }
}


export async function updateOne(req: Request<IdParams, WithId<Todo>, Todo>, res: Response<WithId<Todo>>, next: NextFunction) {
    try {
        const insertResult = await Todos.findOneAndUpdate(
            {_id: new ObjectId(req.params.id)},
            {
                $set: req.body
            },
            {returnDocument: 'after'}
        );

        if(!insertResult.value){
            res.status(404);
            throw new Error(`Todos with id ${req.params.id} found`);
        }
        
        res.status(200);

        res.json(insertResult.value);
    }
    catch (error) {
        next(error);
    }
}



export async function deleteOne(req: Request<IdParams, {}, Todo>, res: Response<{}>, next: NextFunction) {
    try {
        const deletedResult = await Todos.findOneAndDelete(
            {_id: new ObjectId(req.params.id)},
            {}
        );

        if(!deletedResult.value) {
            res.status(404);
            throw new Error(`Todos with id ${req.params.id} found`);
        }

        res.status(200).end();
    }
    catch (error) {
        next(error);
    }
}