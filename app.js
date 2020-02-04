const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const places=require('./places')
const geocode=require('./geocode')
const viewsPath=path.join(__dirname,'/websites')
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(viewsPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Search Place',
        name:'Yong Choi'
    })
})
app.get('/search',(req,res)=>{
    var queryParameter=req.query;
    // res.json(queryParameter)
    if(!queryParameter.address&& !queryParameter.searchPlace){
        return res.send({
            error:'You must provide the detail'
        })
    }
    // else if(!queryParameter.address||!queryParameter.searchPlace){
    //     return res.send({
    //         error:'You must provide the detail2'
    //     })
    // }
    geocode(queryParameter.address,(error,{ minLatitude, minLongitude, maxLatitude, maxLongitude }={})=>{
        if(error){
            return res.send({ error })
        }
        places(queryParameter.searchPlace,minLatitude, minLongitude, maxLatitude, maxLongitude,(error,PlaceSearch)=>{//callback function can be used within the callback function and let you use data from the other callback function. Need to watch out which parameters are used for which as parameter used for one callback function is extended to the callback function within. 
            if(error){
                return res.send({ error })
            }
            // for(i=0;i<PlaceSearch().length;i++){
            //     res.send({
            //         place:PlaceSearch()
            //     })
            // }
            res.send({
                place:PlaceSearch()
            })
            
        })
    })
})

// const userInput=String(process.argv[2]) // this creates an input function or command line.
// const search=String(process.argv[3])
// if(!userInput){
//     console.log('Please provide the address !')
// }else{
//     geocode(userInput,(error,{ minLatitude, minLongitude, maxLatitude, maxLongitude }={})=>{
//         if(error){
//             return console.log(error)
//         }
//         places(search,minLatitude, minLongitude, maxLatitude, maxLongitude,(error,givePlace)=>{//callback function can be used within the callback function and let you use data from the other callback function. Need to watch out which parameters are used for which as parameter used for one callback function is extended to the callback function within. 
//             if(error){
//                 return console.log(error)
//             }
//             givePlace()
//         })
//     })
// }


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})