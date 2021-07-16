import { AppBar, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import * as React from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import LoginIcon from "@material-ui/icons/Login"
interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
  const currentUser = useCurrentUser()

  return (
    <AppBar position="static">
      <Box display="flex" padding={1} flexDirection="row">
        <Box flex={1}></Box>
        <Box>{currentUser ? <AccountCircleIcon /> : <LoginIcon />}</Box>
      </Box>
    </AppBar>
  )
}
export default NavBar

const useStyles = makeStyles({})
