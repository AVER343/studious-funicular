import HeaderComponent from '../components/header/index'
import { ChakraProvider } from "@chakra-ui/react"
import { store ,persistor} from '../src/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/index.css'
function MyApp({ Component, pageProps }){
  return  <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ChakraProvider>
                      <HeaderComponent/>
                      <Component {...pageProps} /> 
              </ChakraProvider>
            </PersistGate>
        </Provider>
}

export default MyApp
