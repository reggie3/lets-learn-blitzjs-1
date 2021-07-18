import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTestModel from "app/test-models/mutations/createTestModel"
import { TestModelForm, FORM_ERROR } from "app/test-models/components/TestModelForm"

const NewTestModelPage: BlitzPage = () => {
  const router = useRouter()
  const [createTestModelMutation] = useMutation(createTestModel)

  return (
    <div>
      <h1>Create New TestModel</h1>

      <TestModelForm
        submitText="Create TestModel"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTestModel}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const testModel = await createTestModelMutation(values)
            router.push(Routes.ShowTestModelPage({ testModelId: testModel.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TestModelsPage()}>
          <a>TestModels</a>
        </Link>
      </p>
    </div>
  )
}

NewTestModelPage.authenticate = true
NewTestModelPage.getLayout = (page) => <Layout title={"Create New TestModel"}>{page}</Layout>

export default NewTestModelPage
