import {z} from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description : z.string({
        required_error: 'Description is a string'
    }),
    date: z.string().datetime().optional(),
    // user: z.string({
    //     required_error: 'User is required'
    // })
})