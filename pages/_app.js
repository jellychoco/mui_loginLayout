import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import {HttpLink} from '@apollo/client/link/http'
import {ApolloClient, InMemoryCache} from '@apollo/client'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../styles/theme'
import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { console, fetch, JSON } from 'window-or-global'

const Noop = ({ children }) => children

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop
  const [test,setTest] = useState("")
  const router = useRouter()
  const httpLink = new HttpLink({                       
    uri: 'http://localhost:4000'                          
  })                                                      
  const client = new ApolloClient({
    link: httpLink,                                       
    cache: new InMemoryCache()                            
  })
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  useEffect(()=>{
    if(router.pathname === '/'){
      router.replace('/login')
    }
  },[])
  
  useEffect(() => {
      (async function(){
         fetch(`https://api.bithumb.com/public/ticker/all`).then((res)=>{
           return res.json()
         }).then((responsse)=>{
             console.log(JSON.stringify(responsse.data.BTC))
         })
      })()
  }, [])
  

  return(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
        <Layout>
          <Component {...pageProps} /> 
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
    )


}

export default MyApp
