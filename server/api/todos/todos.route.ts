import { Router } from "express";
import * as TodosHandlers from './todos.handlers';
import { Todo } from "./todos.model";
import { requestValidator } from "../../middlewares";
import { IdParams } from "../../interfaces/IdParams";

const router = Router();



router.get('/', TodosHandlers.findAll);
router.get(
    '/:id',
    requestValidator({
        params: IdParams
    }),
    TodosHandlers.findOne
);

router.post(
    '/', 
    requestValidator({
        body: Todo
    }), 
    TodosHandlers.createOne
);


router.put(
    '/:id', 
    requestValidator({
        params: IdParams,
        body: Todo
    }), 
    TodosHandlers.updateOne
);


router.delete(
    '/:id', 
    requestValidator({
        params: IdParams,
    }), 
    TodosHandlers.deleteOne
);

export default router;