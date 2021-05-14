const defaultError =({res,e,status})=>{
    if(e.length && typeof e =='object')
    {
        console.log({e})
        // e = e.map(e=>({error:e.msg||'Something went wrong !'}))
        return res.status(status||400).send({errors:e})
    }
    res.status(status||400).send({errors:[{error:e.message||'Something went wrong !'}]})
}
module.exports = defaultError 