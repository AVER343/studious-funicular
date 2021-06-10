import { useMediaQuery } from "@chakra-ui/react"
import HideLeftLayout from "../hide-left-layout/hide.left.layout"
import HideRightLayout from "../hide-right-layout/hide.right.layout"
function ManageScreens(){
    let SHOW_LEFT_LAYOUT = HideLeftLayout()
    let SHOW_RIGHT_LAYOUT = HideRightLayout()
    let [isDesktop] = useMediaQuery("(min-width: 1400px)")
    const [isSmallerDesktop] = useMediaQuery("(min-width: 1265px)")
    const [isTablet] = useMediaQuery("(min-width: 800px)")
    //change flex values of `left` ,`right` and `center`
    console.log(isDesktop)
    if(isDesktop && !SHOW_LEFT_LAYOUT && !SHOW_RIGHT_LAYOUT)
    {
        return {
                left:'0 0 235px',
                right:'0 0 325px',
                center:'0 0 640px',
                columnGap:'60px',
                margin:'30px 60px 60px 60px !important'
            }
    }
    else if(isSmallerDesktop && !SHOW_LEFT_LAYOUT && !SHOW_RIGHT_LAYOUT){
        return {
            left:'0 0 60px',
            right:'0 0 325px',
            center:'0 0 640px',
            columnGap:'60px',
            margin:'30px 60px 60px 60px '
        }
    }
    else if(isTablet && !SHOW_LEFT_LAYOUT && !isSmallerDesktop ){
        return {
            left:'0 0 60px',
            center:'0 0 640px',
            columnGap:'60px',
            margin:'30px 0px 0px 0px'
        }
    }
    else {
        return {
                center:'1',
                margin:'60px'
            }
    }
}
export default ManageScreens