import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestModel from "app/test-models/queries/getTestModel"
import deleteTestModel from "app/test-models/mutations/deleteTestModel"

export const TestModel = () => {
  const router = useRouter()
  const testModelId = useParam("testModelId", "number")
  const [deleteTestModelMutation] = useMutation(deleteTestModel)
  const [testModel] = useQuery(getTestModel, { id: testModelId })

  return (
    <>
      <Head>
        <title>TestModel {testModel.id}</title>
      </Head>

      <div>
        <h1>TestModel {testModel.id}</h1>
        <pre>{JSON.stringify(testModel, null, 2)}</pre>

        <Link href={Routes.EditTestModelPage({ testModelId: testModel.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTestModelMutation({ id: testModel.id })
              router.push(Routes.TestModelsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTestModelPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TestModelsPage()}>
          <a>TestModels</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TestModel />
      </Suspense>
    </div>
  )
}

ShowTestModelPage.authenticate = true
ShowTestModelPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTestModelPage
