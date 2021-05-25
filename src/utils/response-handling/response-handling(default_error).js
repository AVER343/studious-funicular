const defaultError =({res,e,status=400,type='error'})=>{
    let obj =[]
    let overall_obj ={}
    let types = type+'s'
    console.log({e,status,type})
    if(!['success','error','info'].includes(type))
    {
        return res.send(400)
    }
    if(e.detail)
        {
            overall_obj[types] = [{type,message:e.detail}]
            return res.status(status).send(overall_obj)
        }
    if(e.length>0 && typeof e =='object')
    {
        console.log({e})
        overall_obj[types] = e.map(e=>({type,message:e.msg}))
        return res.status(status).send(overall_obj)
    }
    if(e.message)
    {
        overall_obj[types] =[{type,message:e.message}]
        return res.status(status).send(overall_obj)
    }
    obj[type] = [{message:e.message||'Something went wrong !',type:type}]
    return res.status(status).send(obj)
}
module.exports = defaultError 