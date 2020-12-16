import { AppBar, Button, Card, Container, Drawer, Grid, Hidden, SwipeableDrawer, Toolbar } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../Components/Sidebar/Sidebar'
import { MenuOpen } from '@material-ui/icons'
import { console } from 'window-or-global'
import Loading from 'react-loading'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    sidebarButton:{
        display:"inline-block",
        position:"sticky"
    },
    sidebar:{
        width:"196px"
    }
  }))

  const jsStyle = {
      header:{
          height:"10%"
      },
      body:{
          display:"flex",
          margin:"0",
          height:"100%",
          justifyContent:"center",
          backgroundColor:"#F5F5F5"
      },
      sidebar:{
          height:"100%",
          backgroundColor:"white",
          flexBasis:"200px",
          minWidth:"200px",
      }
  }

function LayoutWithAuth({children}) {
    const classes = useStyles()
    const router = useRouter()
    const cookie = "temp"
    const [toggle,setToggle] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
      console.log(router.pathname)
        if(!cookie){
          router.replace('/login') 
        }
    }, [])

    /**
     * 사이드바 클릭 후 url이 달라지는 경우 사이드바를 닫아줍니다
     */
    useEffect(() => {
      setToggle(false)
    },[children.type.name])
const pageName = {
home:"메인화면",
purchasedHistory:"구매내역",
hierarchy:"계보도",
myInfo:"나의정보",
purchage:"구매",
calculate:"정산내역",
withdraw:"출금신청",
support:"문의하기",
withdrawHistory:"출금내역"
}
    return (
      <Fragment>
        {children.type.name !== 'login' ?
         <>
          {/* 여기서부터 */}
          <Hidden xsDown>
            <div style={jsStyle.body}>
              
               <div style={jsStyle.sidebar}>
                   <Card >
                      <Sidebar/>
                   </Card>
                 </div>
                 <div style={{width:"100%"}}>
                 
                
                   {children}
                 </div>
            </div>
          </Hidden>
          {/* 여기까진 일반화면레이아웃 */}
  
          {/* 여기서부터 */}
          <Hidden  smUp>
            <header>
                <Button className={classes.sidebarButton} onClick={()=>{setToggle(!toggle)}}><MenuOpen fontSize="large"/></Button>
                <Drawer anchor="left" open={toggle} onClose={()=>{setToggle(false)}}>
                  <Sidebar/>
                </Drawer>
                {pageName[children.type.name]}
            </header>
               <div >

                  {children}
               </div> 
          </Hidden>
          {/* 여기까진 모바일레이아웃 */}
           
         </> :
          <Fragment>{children}</Fragment>}
      </Fragment>
)
}


export default LayoutWithAuth
