import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTestModel = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTestModel), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testModel = await db.testModel.findFirst({ where: { id } })

  if (!testModel) throw new NotFoundError()

  return testModel
})
