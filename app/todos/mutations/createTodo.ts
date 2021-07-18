import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTodo = z.object({
  taskName: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTodo), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log(db)
  const todo = await db.todo.create({ data: input })

  return todo
})
