import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTestModel = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTestModel), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testModel = await db.testModel.create({ data: input })

  return testModel
})
