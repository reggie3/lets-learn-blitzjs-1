import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTestModelsInput
  extends Pick<Prisma.TestModelFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTestModelsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: testModels,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.testModel.count({ where }),
      query: (paginateArgs) => db.testModel.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      testModels,
      nextPage,
      hasMore,
      count,
    }
  }
)
