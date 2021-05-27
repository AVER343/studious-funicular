import React,{useEffect} from 'react'
import Image from 'next/image'
import SignInSignUp from './final_merge'
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  Grid
} from '@chakra-ui/react'
import {TouchableOpacity} from 'react-native-web'
const VARIANT_COLOR = 'teal'
import styles from './styles.module.css'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { ADD_RESPONSE } from '../../../src/redux/response-handler/actions/response.actions'
const App = (props) => {
  let router = useRouter()
  useEffect(()=>{
    if(props.user && props.user.email)
    {
      router.push('/');
      props.ADD_RESPONSE([{status:'error',message:'You are already logged in !'}])
    }
  },[router.asPath])
    return props.user && props.user.email?null:<SignInSignUp/>
}
let mapStateToProps=(state)=>({
  user:state.user.user
})
let mapDispatchToProps=(dispatch)=>({
  ADD_RESPONSE : (res)=>dispatch(ADD_RESPONSE(res))
})
export default connect(mapStateToProps,mapDispatchToProps)(App)