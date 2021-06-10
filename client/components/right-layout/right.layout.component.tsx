import { Avatar, Box,Flex } from "@chakra-ui/react"
import CardComponent from '../card-component/card.component'
function RightLayoutComponent(props:any){
    return   <Box height='100vh' flex={props.flexRight}>
      <Flex direction='column' alignContent='flex-end' alignItems='flex-end' marginBottom={'60px'}>
            <Avatar style={{width:'40px',height:'40px',marginBottom:'60px !important'}}/>
      </Flex>
      <Flex>
          <Box>
            <CardComponent  property={{
                                imageUrl: "https://bit.ly/2Z4KKcF",
                                imageAlt: "Rear view of modern home with pool",
                                beds: 3,
                                baths: 2,
                                title: "Modern home in city center in the heart of historic Los Angeles",
                                formattedPrice: "$1,900.00",
                                reviewCount: 34,
                                rating: 4,
                              }}/>
          </Box>
        </Flex>
  </Box>
}
export default RightLayoutComponent