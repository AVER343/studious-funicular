import { useMediaQuery } from 'react-responsive'

  const ManageScreens=()=>{
    const Desktop = useMediaQuery({
      query: '(min-device-width: 1400px)'
    })
    const smallDesktop = useMediaQuery({
      query: '(min-device-width: 1265px)'
    })
    const tablet = useMediaQuery({
      query: '(min-device-width: 800px)'
    })
    const mobile = useMediaQuery({
      query: '(min-device-width: 440px)'
    })
    
  }
