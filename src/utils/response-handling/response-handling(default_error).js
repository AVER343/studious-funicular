const defaultError =({res,e,status,type='error'})=>{
    let obj ={}
    if(!['success','error','info'].includes(type))
    {
        console.log('invalid response type')
        return res.send(400)
    }
    obj[type] = [{message:e.message||'Something went wrong !',type:type||'error'}]
    if(e.length && typeof e =='object')
    {
        return res.status(status||400).send({errors:e.map(er=>({...er,type:type||'error'}))})
    }
    res.status(status||400).send(obj)
}
module.exports = defaultError 