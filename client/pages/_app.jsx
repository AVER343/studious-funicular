import {useEffect,useState} from 'react'
import { ChakraProvider,Flex } from "@chakra-ui/react"
import { store ,persistor} from '../src/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/index.css'
import ManageScreens from '../components/manage-screens/manage.screens'
import LeftLayout from '../components/left-layout/left.layout';
import CenterLayoutComponent from '../components/center-layout/center.layout.component';
import RightLayoutComponent from '../components/right-layout/right.layout.component.tsx';
import HeaderComponent from '../components/header/index'
import HideLeftLayout from '../components/hide-left-layout/hide.left.layout';
import HideRightLayout from '../components/hide-right-layout/hide.right.layout';
function MyApp({ Component, pageProps }){
  let screenType= ManageScreens()
  
  useEffect(()=>{

  },[screenType])
  return  <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ChakraProvider>
                <HeaderComponent/>
                <Flex style={{columnGap:screenType.columnGap,
                              alignItems:'center',
                              justifyContent:'center'}} 
                              margin={screenType.margin}>
                    { screenType.left?<LeftLayout flexLeft={screenType.left}/>:null}
                    <CenterLayoutComponent center={screenType.center} children={<Component {...pageProps} />}/>
                    { screenType.right?<RightLayoutComponent flexRight={screenType.right}/>:null}
                </Flex>
              </ChakraProvider>
            </PersistGate>
        </Provider>
}
export default MyApp
