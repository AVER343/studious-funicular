const responseHanding =({res,e,status=400,type='error'})=>{
    let obj =[]
    let overall_obj ={}
    let types = type=='error'?'errors':type
     if(e.message)
    {
        overall_obj[types] =[{status:type,message:e.message}]
        return res.status(status).send(overall_obj)
    }
    if(e.detail)
        {
            overall_obj[types] = [{status:type,message:e.detail}]
            return res.swtatus(status).send(overall_obj)
        }
    if(e.length>0 && typeof e =='object')
    {
        overall_obj[types] = e.map(e=>({status:type,message:e.msg}))
        return res.status(status).send(overall_obj)
    }
   
    obj[type] = [{message:e.message||'Something went wrong !',status:type}]
    return res.status(status).send(obj)
}
module.exports = responseHanding 