import { Box, IconButton, List, ListItem, ListItemText } from "@material-ui/core"
import * as React from "react"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import getTodos from "app/todos/queries/getTodos"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import updateTodo from "app/todos/mutations/updateTodo"
import { Todo } from "db"
import { Suspense } from "react"

interface TodosListProps {}

const TodosList = (props: TodosListProps) => {
  const [updateTodoMutation] = useMutation(updateTodo)

  const [getTodosQuery] = useQuery(getTodos, {})
  const { todos } = getTodosQuery

  const onClickIsComplete = async (todo: Todo) => {
    await updateTodoMutation({
      ...todo,
      isComplete: !Boolean(todo.isComplete),
    })
    invalidateQuery(getTodos)
  }

  return (
    <Box border="1px dashed green">
      <List>
        {todos.map((todo) => {
          return (
            <ListItem key={todo.id}>
              <Box
                display={"flex"}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                border="1px dashed blue"
                width="100%"
              >
                <ListItemText primary={todo.taskName} />
                <IconButton onClick={() => onClickIsComplete(todo)}>
                  <>{todo.isComplete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</>
                </IconButton>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
export default TodosList
