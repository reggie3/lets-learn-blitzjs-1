import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestModels from "app/test-models/queries/getTestModels"

const ITEMS_PER_PAGE = 100

export const TestModelsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ testModels, hasMore }] = usePaginatedQuery(getTestModels, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {testModels.map((testModel) => (
          <li key={testModel.id}>
            <Link href={Routes.ShowTestModelPage({ testModelId: testModel.id })}>
              <a>{testModel.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TestModelsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>TestModels</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTestModelPage()}>
            <a>Create TestModel</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TestModelsList />
        </Suspense>
      </div>
    </>
  )
}

TestModelsPage.authenticate = true
TestModelsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestModelsPage
