import { Box, Button, TextField } from "@material-ui/core"
import * as React from "react"
import { ChangeEvent, useState } from "react"
import { invalidateQuery, useMutation } from "blitz"

import createTodo from "app/todos/mutations/createTodo"
import getTodos from "app/todos/queries/getTodos"

interface TodoEntryProps {}

const TodoEntry = (props: TodoEntryProps) => {
  const [taskName, setTaskName] = useState<string>("")
  const [createTodoMutation] = useMutation(createTodo)

  const onTaskNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTaskName(event.target.value)
  }

  const onSaveTaskClick = async () => {
    const project = await createTodoMutation({ taskName })
    invalidateQuery(getTodos)
    setTaskName("")
  }

  return (
    <Box display="flex">
      <TextField variant="standard" value={taskName} onChange={onTaskNameChange} />
      <Button onClick={onSaveTaskClick}>Save</Button>
    </Box>
  )
}
export default TodoEntry
