import { useRouter } from "next/router"

function HideLeftLayout(){
  let router = useRouter()
  let routeRegex = [/\/signin\//]
  console.log(routeRegex.map(e=>router.asPath.match(e)).filter(e=>e))
  if(routeRegex.map(e=>router.asPath.match(e)).filter(e=>e).length>0)
  {
    return true
  }
  return false
}
export default HideLeftLayout