import {InputRightElement,InputLeftElement, Box, Flex, Input,InputGroup,InputLeftAddon} from "@chakra-ui/react"
import ManageScreens from "../manage-screens/manage.screens"
import { SearchIcon,CheckIcon } from '@chakra-ui/icons'

const CenterLayoutComponent=(props)=>{
    return <Box flex={props.center} height='100vh'>
            <InputGroup style={{marginBottom:'60px'}}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input variant='filled' type="text" placeholder="Search" />
              {/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
            </InputGroup>
            <Box height='100%' width='100%'>
              {props.children}
            </Box>
          </Box>
}
export default CenterLayoutComponent