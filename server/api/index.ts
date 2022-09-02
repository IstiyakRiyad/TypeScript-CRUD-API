import { Router } from "express";

import todos from './todos/todos.route';


const router = Router();

router.use('/todo', todos);


export default router;