import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestModel from "app/test-models/queries/getTestModel"
import updateTestModel from "app/test-models/mutations/updateTestModel"
import { TestModelForm, FORM_ERROR } from "app/test-models/components/TestModelForm"

export const EditTestModel = () => {
  const router = useRouter()
  const testModelId = useParam("testModelId", "number")
  const [testModel, { setQueryData }] = useQuery(
    getTestModel,
    { id: testModelId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTestModelMutation] = useMutation(updateTestModel)

  return (
    <>
      <Head>
        <title>Edit TestModel {testModel.id}</title>
      </Head>

      <div>
        <h1>Edit TestModel {testModel.id}</h1>
        <pre>{JSON.stringify(testModel)}</pre>

        <TestModelForm
          submitText="Update TestModel"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTestModel}
          initialValues={testModel}
          onSubmit={async (values) => {
            try {
              const updated = await updateTestModelMutation({
                id: testModel.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTestModelPage({ testModelId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTestModelPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTestModel />
      </Suspense>

      <p>
        <Link href={Routes.TestModelsPage()}>
          <a>TestModels</a>
        </Link>
      </p>
    </div>
  )
}

EditTestModelPage.authenticate = true
EditTestModelPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTestModelPage
