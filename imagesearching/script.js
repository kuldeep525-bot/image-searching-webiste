let input=document.querySelector("#input")
let btn=document.querySelector(".btn button")
let image=document.querySelector(".imageIs")
let load=document.querySelector("#load")


// unplash.com used for fetch the api
const access="rRQDqk7KP8VfkIw0tEByadreRnaNoTqw3TzKxZ3GHqM"
let page=1
let keyword=""

//function for downloading the images

function download(imgurl){
fetch(imgurl).then(res=>res.blob()).then(file=>{
  let a=document.createElement("a")
  a.href=URL.createObjectURL(file)
  a.download=new Date().getTime()
  a.click()


}).catch(()=>alert("failed download"))
}

async function getresponse() 
{

  keyword=input.value
  let url=`https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${access}&per_page=50`

  //now fecth the url

  let response=await fetch(url)
  let data=await response.json()
  // console.log(data)

  let results=data.results
  if(page==1)
    {
      image.innerHTML=""
      // load.style.display=
    }

    load.style.display="block"
    
  // console.log(results)
  results.map((result)=>
    {
    let li=document.createElement("li")
    li.classList.add("image")

    let htmls= 
    `  
     <img src="${result.preview_photos[0].urls.small}" alt="image" class="photo">
      <div class="details">
        <div class="user">
          <!---<img src="camera.svg" alt="img">-->
          <!--<span>${result.title}</span>-->
        </div>
        <!--<div class="download" onclick=download("${result.preview_photos[0].urls.small}")>
          <img src="down.svg" alt="img" >-->
        </div>
      </div>
    `

      li.innerHTML=htmls
      image.appendChild(li)
  })
}

btn.addEventListener("click",()=>{
  page=1
  getresponse()
})

load.addEventListener("click",()=>{

  page=page+1
  getresponse()
})


// when we click enter the automatically search

input.addEventListener("keyup",(e)=>{
  page=1;
  if(e.key=="Enter")
  {
    getresponse();
  }
})