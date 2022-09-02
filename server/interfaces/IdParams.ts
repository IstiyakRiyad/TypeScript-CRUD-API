import { ObjectId } from 'mongodb';
import * as z from 'zod';


export const IdParams = z.object({
    id: z.string().refine(id => {
        try {
            return new ObjectId(id);
        }
        catch(error) {
            return false;
        }
    },
    {
        message: 'Invalid ID'
    })
});

export type IdParams = z.infer<typeof IdParams>;

