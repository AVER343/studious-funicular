import { useRouter } from "next/router"

function HideRightLayout(){
  let router = useRouter()
  let routeRegex = [/\/signin\//]
  if(routeRegex.map(e=>router.asPath.match(e)).filter(e=>e).length>0)
  {
    return true
  }
  return false
}
export default HideRightLayout