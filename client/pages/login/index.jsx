import React,{useEffect} from 'react'
import Image from 'next/image'
import SignInSignUp from './both_form'
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
const App = () => {
  useEffect(()=>{

  },[])
  return (
        <SignInSignUp/>
  )
}


export default App