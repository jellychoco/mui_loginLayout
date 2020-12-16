import { Button, Container, Grid,Hidden,Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, Typography, useMediaQuery } from '@material-ui/core'
import React from 'react'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router';
import LayoutWithAuth from '../src/Layout/LayoutWithAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3%",
    justifyContent:"center"
  },
  grid:{
    justifyContent:"center"},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    alignContent:"center",
    color: theme.palette.text.secondary,
    cursor:"pointer",
  },
  headerPaper:{
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    cursor:"pointer",
  } 
  
}));

const jsStyle = {
    mainMoney:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:"20px",
        fontSize:"2rem"
    }
}

const sorting = (jsonData,key)=>{
    return jsonData.sort((a,b)=>{
        if(a[key]<b[key]){
            return 1
        } else {
            return -1
        }
        return 0
    })
}

function home() {
    const classes = useStyles();
    const router = useRouter()
    const matches = useMediaQuery("(min-width:425px)")
    const dummyData = [{
        date:'2020/10/20',
        dailyBonus:287.5,
        savingsBonus:556.7,
        totalBonus:844
    },{
        date:'2019/10/20',
        dailyBonus:287.5,
        savingsBonus:556.7,
        totalBonus:423
    }]
    const webOptions = {
      textLabels:{
      pagination: {
        next: "다음",
        previous: "이전",
        rowsPerPage: "페이지당 행",
        displayRows: "의",
        jumpToPage:"이동"
      },      
    },
    download:false,
    print:false,
    responsive:"standard",
    filter:false,
    viewColumns:false,
    checkbox:false,
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [30, 50, 100, 200],
    jumpToPage: true,
    search:true,
    }

    const mobileOptions = {
      download:false,
      print:false,
      responsive:"standard",
      filter:false,
      viewColumns:false,
      checkbox:false,
      selectableRows: 'none',
      search:false,
      customFooter:()=>{
        return (<></>)
      }

    }
    const columns = [{
      name:"date",
      label:"일자",
      options:{sort:true}
    },{
      name:"dailyBonus",
      label:"데일리보너스",
      options:{sort:true}
      },{
      name:"savingsBonus",
      label:"적금보너스",
      options:{sort:true}
      },{
      name:"totalBonus",
      label:"보너스합계",
      options:{sort:true}
      }]


    return (
     <div className={classes.root}>
      hello world
  </div>
    )
}
home.Layout = LayoutWithAuth

export default home
