import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import TodosList from "app/core/components/TodosList"
import TodoEntry from "app/core/components/TodoEntry"
import { Box } from "@material-ui/core"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return <div className="container">Home</div>
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <Layout title="Home">
    <Box display="flex" padding={2} justifyContent="center" flexDirection="column" width={"100%"}>
      <TodoEntry />
      <Suspense fallback={<div>Loading...</div>}>
        <TodosList />
      </Suspense>
    </Box>
  </Layout>
)

export default Home
