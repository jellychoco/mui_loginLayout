import React, { Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {
    CreditCard,
    MonetizationOn,
    AccountCircle,
    Group,
    SettingsApplications,
    StarBorder,
    AccountBalance,
    AddShoppingCart,
    Share,
    Receipt,
    Home,
    ContactSupport,
    Help,
    Email
} from '@material-ui/icons'
import {
    Collapse,
    Divider,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from '@material-ui/core'
import ListItemLink from '../../Commons/ListItemLink';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "inline-block"
    },
    title: {
        fontSize: "20px"
    }
}));

const menu = [{
    categori:"메인화면",
    icon:<Home fontSize="large" />,
    to:"/home",
    items:[]
}, {
        categori: '상품구매',
        icon: <CreditCard fontSize="large"/>,
        items: [
            {
                label: '신규구매 ',
                to: '/purchage',
                icon: <AddShoppingCart/>
            }
        ]
    }
]
function Sidebar(props) {
    const classes = useStyles()
    return (
        <>
        {/* <Link href="/home" style={{textAlign:"center",margin:"10px",fontFamily:"inherit",fontSize:"1.5rem"}}>
            KlinkLaps Staking</Link> */}
            {/* <Divider/> */}
            {menu.map((v,key) => {
                    return (
                     <Fragment key={key}> 
                        <List >
                            {v.to ? <ListItemLink
                                            icon={v.icon}
                                            label={v.categori}
                                            to={v.to} /> :
                                     <ListItemLink
                                            to={''}
                                            icon={v.icon}
                                            label={v.categori}
                                            />
                                            }
                            
                            {v.items
                             .map((item) => {
                                    return (
                                        <ListItemLink
                                            style={{
                                                padding: '0px 0px 10px 40px'
                                            }}
                                            key={item.to}
                                            icon={item.icon}
                                            label={item.label}
                                            to={item.to}/>
                                    )
                                })
                        } {menu.length - 1  !== key ? <Divider/> : "" }  
                        </List>
                     </Fragment>)
                })
          }
         </>
    )
}

export default Sidebar
