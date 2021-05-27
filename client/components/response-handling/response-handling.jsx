import {useToast,WrapItem,Wrap} from '@chakra-ui/react'
import {connect} from 'react-redux'
import React from 'react'
import {DELETE_ONE_RESPONSE} from '../../src/redux/response-handler/actions/response.actions'
function ResponseHandler({responses,DELETE_ONE_RESPONSE}) {
        const toast = useToast()
        return (
          <Wrap>
            {responses.map(({variant='solid',message,status,duration=2500}, i) => {
                    DELETE_ONE_RESPONSE(0)
                return !toast.isActive(message) 
                && 
                <WrapItem  key={i}>
                        { toast({ duration,status ,position:'bottom' ,id:message,title:message, variant, isClosable: true }) }
                </WrapItem> 
                ? null:null })}
          </Wrap>)
}
const mapDispatchToProps=(dispatch)=>({
        DELETE_ONE_RESPONSE:(index)=>dispatch(DELETE_ONE_RESPONSE(index))
})
export default connect(null,mapDispatchToProps)(ResponseHandler)