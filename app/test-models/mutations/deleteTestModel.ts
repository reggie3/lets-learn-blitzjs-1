import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTestModel = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTestModel),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const testModel = await db.testModel.deleteMany({ where: { id } })

    return testModel
  }
)
