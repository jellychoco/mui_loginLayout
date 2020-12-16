import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { alert, console, fetch } from 'window-or-global';
import { useRouter } from 'next/router';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  container:{
    height:"100vh",
    overflow:"auto"
  },
  appBar: {
    boxShadow: 'none'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  grid:{

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height:"80%"
  },
  button:{
    width:"100%",
    height:"100%"
  }
}));



export default function SignUp() {
  const classes = useStyles();
  const router = useRouter()
  /**
   * @var emailVerifyCode 이메일확인용 생성된 코드
   */
  const [emailVerifyCode, setEmailVerifyCode] = useState()
  /**
   * @var emailTypeCode 회원가입페이지에서 입력된 코드
   */
  const [emailTypedCode,setEmailTypedCode] = useState("")
  const [pwChecker, setPwChecker] = useState({
    pw1:"",
    pw2:""
  })
  const [signUpData,setSignUpData] = useState({
    id:"",
    name:"",
    phone:"",
    email:"",
    pw:"",
    referID:""
  })

  const [isSend,setIsSend]= useState({
    phone:false,
    email:false
  })

const [isDisabled,setIsDisabled] = useState({
  id:false,
  phone:false,
  email:false,
})


  /**
   * 
   * @param {*} isExisted true/false로 생성여부를 가립니다.
   * @param {*} type input or button 여부
   * @param {*} width mui width full=12 
   * @param {*} name id && name 
   * @param {*} label label
   * @param {*} func 넣고자 하는 함수 이름
   * @param {*} className 스타일 clssName
   * @param {*} disabled disabled status
   */
  const format = (isExisted,type,width,name,label,func,className,disabled)=>{
    return{
      isExisted:isExisted,
      type:type,
      width:width,
      name:name,
      label:label,
      func:func,
      className:className,
      disabled:disabled,
    }
  }

/**
 * @function validateEmail 이메일 유효성을 검증하는 함수
 * @param {*} email 
 */
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const emailChecker = () =>{
    if(!validateEmail(signUpData.email)){
      return alert("이메일 형식을 다시 확인해주세요")
    }
    //이메일인증
    setIsSend({...isSend,email:true})
     fetch('/api/email', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({email:signUpData.email}), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      setEmailVerifyCode(JSON.stringify(response.verifyCode))
    })
    .catch(error => console.error('Error:', error));
     
  }
  const handleRoute = ()=>{
    // router.replace('/login')
    console.log(signUpData)
  }
  const handleData = (e,key)=>{
    setSignUpData({...signUpData,key:e.currentTarget.value})
  }
/**
 * 비밀번호가 일치해야만 signupdata 에 비밀번호가 입력됩니다.
 */
useEffect(() => {
  if(pwChecker.pw1 === pwChecker.pw2){
    //일치한다면 비밀번화 확인란에 입력한 비밀번호를 스테이트에 업데이트 해줍니다
    setSignUpData({...signUpData,pw:pwChecker.pw2})
  }
},[pwChecker.pw1,pwChecker.pw2])


const idOverlapChecker = ()=>{
  //1.아이디를 서버로 전송하고, 결과값을 수신하여 
  //2.중복여부를 가리고, alert를 띄어주면 됌
  //3. 확인이 끝나면 아이디란은 disabled

  setIsDisabled({...isDisabled,id:true})
  alert("사용가능한 아이디입니다")
}

const phoneOverlapChecker = ()=>{
  //1.실행되면 서버로 코드요청을 하고 받은 코드와 대조하고
  //2. 일치하면 disalbed시키고 계속 진행

  //만약 코드가 일치한다면
  alert("확인되었습니다")
  //휴대폰란을 disabled 
  setIsDisabled({...isDisabled,phone:true})
  //코드입력란을 지움
  setIsSend({...isSend,phone:false})
}



const emailVerifyAction = ()=>{
  if(emailVerifyCode !== JSON.stringify(emailTypedCode)){
    alert("코드가 일치하지 않습니다")
  }
  //만약 코드가 일치한다면
  alert("확인되었습니다")
  //이메일란을 disalbed
  setIsDisabled({...isDisabled,email:true})
  //입력란을 지움
  setIsSend({...isSend,email:false})
}
  const data = [
    format(true,"input",8,"id","아이디",(e)=>{setSignUpData({...signUpData,id:e.target.value})},null,isDisabled.id),
    format(true,"button",4,"idCheck","중복확인",idOverlapChecker,classes.button,isDisabled.id,),
    format(true,"input",12,"name","이름",(e)=>{setSignUpData({...signUpData,name:e.target.value})},null),
    format(true,"input",8,"phone","휴대폰번호",(e)=>{
      const phoneNumberWithoutMinus = e.target.value.replace(/\-/g,'')
      setSignUpData({...signUpData,phone:phoneNumberWithoutMinus})
    },null,isDisabled.phone),
    format(true,"button",4,"phoneCheck","인증코드 요청",()=>{setIsSend({...isSend,phone:true})},classes.button,isDisabled.phone),
    format(isSend.phone,"input",8,"phone","코드",(e)=>{handleData(e,"phone")},null,null),
    format(isSend.phone,"button",4,"phoneCheck","코드확인",phoneOverlapChecker,classes.button),
    format(true,"input",8,"email","이메일",(e)=>{setSignUpData({...signUpData,email:e.target.value})},null,isDisabled.email),
    format(true,"button",4,"sendVerifyCode","인증코드 전송",emailChecker,classes.button,isDisabled.email),
    format(isSend.email,"input",8,"verifyCode","인증코드",(e)=>{setEmailTypedCode(e.target.value)},null,null),
    format(isSend.email,"button",4,"checkVerifyCode","인증코드 확인",emailVerifyAction,classes.button),
    format(true,"password",12,"pw1","비밀번호",(e)=>{setPwChecker({...pwChecker,pw1:e.target.value})},null),
    format(true,"password",12,"pw2","비밀번호 확인",(e)=>{setPwChecker({...pwChecker,pw2:e.target.value})},null),
    format(true,"input",9,"referID","추천인 ID",(e)=>{setSignUpData({...signUpData,referID:e.target.value})},null),
    format(true,"button",3,"searchID","검색",()=>{alert("존재하지 않는 아이디입니다")},classes.button),
    format(true,"submit",12,"pw1","회원가입",handleRoute,classes.submit),
  ]

 const signUpLists = data.map((value,key)=>{
     if(value.isExisted){
        if(value.type === "input"){
          return (
            <Grid key={key} item xs={value.width} sm={value.width}>
                <TextField
                onChange={value.func}
                autoComplete={value.name}
                name={value.name}
                variant="outlined"
                required
                fullWidth
                type={value.type}
                id={value.name}
                label={value.label}
                className={value.className}
                autoFocus
                disabled={value.disabled ? value.disabled : false}
               />
            </Grid>
          )
        } else if(value.type === "button"||value.type === "submit"){
          return (
                  <Grid  key={key} style={{height:""}} item xs={value.width}>
                   <Button
                      onClick={value.func} 
                      type={value.type}
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={value.disabled ? value.disabled : false}
                      onClick={value.func}
                      className={value.className} 
                      > 
                        <Typography variant="button">
                           {value.label}
                        </Typography>
                    </Button>
                  </Grid>
                  )
        } else if(value.type === "password"){
          return (
            <Grid key={key} item xs={value.width} sm={value.width}>
                <TextField
                onChange={value.func}
                autoComplete={value.name}
                name={value.name}
                variant="outlined"
                required
                fullWidth
                id={value.name}
                type={value.type}
                label={value.label}
                className={value.className}
                autoFocus
                error={value.name === "pw2" && pwChecker.pw1 !== pwChecker.pw2 && pwChecker.pw2 ? true : false }
                helperText={value.name === "pw2" && pwChecker.pw1 !== pwChecker.pw2 && pwChecker.pw2 ? "비밀번호가 일치하지 않습니다" : ""}
               />
            </Grid>
          )
        }
     }
   })

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            onClick={() => router.back()}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form}  required noValidate onSubmit={(e)=>{
          e.preventDefault()
          console.log(e)
        }}>
          <Grid container spacing={2}>
           {signUpLists}
          </Grid>
          
        </form>
      </div>
    </Container>
  );
}