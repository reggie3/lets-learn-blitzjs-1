import { AppBar, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import * as React from "react"

interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
  return (
    <>
      <AppBar position="static">
        <Box display="flex" padding={1} flexDirection="row">
          <Box flex={1}>Navbar</Box>
        </Box>
      </AppBar>
    </>
  )
}
export default NavBar

const useStyles = makeStyles({})
