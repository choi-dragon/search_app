const searchEngine=document.querySelector('form')
const places=document.querySelector('#places')
const address=document.querySelector('#address')
const searchResult=document.querySelector('#searchResult')

searchResult.textContent=''

searchEngine.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=address.value
    const place=places.value
    fetch('/search?address='+location+'&searchPlace='+place).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                searchResult.textContent=data.error
            }else{
                // for(i=0;i<data.place.length;i++){
                //     return searchResult.textContent=data.place[i].Place
                // }
                searchResult.textContent=data.place
                console.log(data.place)
            }
        })
    })
})