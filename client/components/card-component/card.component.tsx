import {Box,Badge,Image,useColorModeValue,Flex, useColorMode, Avatar} from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'
import React from 'react'
interface CardProps{
    property:property;
}
interface property{
  imageUrl: string;
    imageAlt: string;
    beds?:number;
    baths?: number;
    title: string;
    formattedPrice: string;
    reviewCount: number;
    rating: number;
}
function CardComponent({property}:CardProps) {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
    return (
    <Box maxW="sm"  bg={backgroundColor} borderWidth="3px" padding='5px' borderRadius='5px' overflow="hidden">
      <Image height='80px' width='80px' borderRadius='50px' src={property.imageUrl} alt={property.imageAlt} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge px="2" colorScheme="teal" color={textColor}>
            New
          </Badge>
          <Box
            color={textColor}
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          color={textColor}
        >
          {property.title}
        </Box>

        <Box color={textColor}>
          {property.formattedPrice}
          <Box as="span" color="gray.500" fontSize="sm" >
            / wk
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={ i < property.rating
                  ? useColorModeValue('teal.600','teal.300')
                  : "gray.400"
                }
              />
            ))}
          <Box as="span" ml="2" color={textColor} fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default CardComponent