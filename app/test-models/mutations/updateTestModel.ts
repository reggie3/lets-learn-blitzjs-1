import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTestModel = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTestModel),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const testModel = await db.testModel.update({ where: { id }, data })

    return testModel
  }
)
