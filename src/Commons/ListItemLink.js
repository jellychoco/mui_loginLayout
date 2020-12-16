import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from 'next/link'
import {useRouter} from 'next/router'


const ListItemLink = ({icon, label, to, style}) => {
  const router = useRouter()
  const selected = router.pathname === to
  return (
      <li  style={selected ? {...style,color:"#2196f3"}  :style} >
      <Link href={to} passHref>
        <ListItem button selected={selected}  >
          {icon ? <ListItemIcon style={selected ? {color:"#2196f3"}:{}} >{icon}</ListItemIcon> : null}
          <ListItemText primary={label}/>
        </ListItem>
      </Link>
      </li>
  )
}

export default ListItemLink