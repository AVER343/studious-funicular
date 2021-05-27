import {useEffect} from 'react'
import {GridItem,Grid,Square,SimpleGrid,Box ,useColorMode} from '@chakra-ui/react' 
function Home(props) {
  return (<SimpleGrid columns={3} columns={[2, null, 3]} spacing={10}>
    <Box bg="tomato" height='100vh' ></Box>
    <Box bg="tomato" height='100vh'></Box>
    <Box bg="tomato" height='100vh'></Box>
  </SimpleGrid>)
}

export default Home