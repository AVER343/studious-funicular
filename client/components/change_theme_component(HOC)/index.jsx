import { useColorMode } from '@chakra-ui/react'
import React from 'react'
function ChangeThemeComponent(WrappedComponent) {
  const {toggleColorMode} = useColorMode()
    return <div onClick={toggleColorMode}>
            {WrappedComponent.children}
          </div>
  }
  export default ChangeThemeComponent