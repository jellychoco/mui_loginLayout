import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'


const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))

const AuthLayout = props => {
  // const { children } = props
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    
  }, [])


  return (
    <Container maxWidth="sm" className={classes.root}>
      {props.children}
    </Container>
  )
}

export default AuthLayout
