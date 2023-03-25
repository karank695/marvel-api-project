
const characterContainer=document.getElementById("characterContainer");
const search=document.querySelector(".search-container .search");
const searchResult=document.getElementById("search-result");
let faHearts=document.querySelectorAll(".fav-heart");
let cross=document.getElementById("cross");
let searchData;//it is an array which is used to store objects of search characters
let marvelData;// these are the data fetch through api




//asynchronous function to get data from marvel api
async function fetchText(){
  let startdata;
  let response= await fetch(`https://gateway.marvel.com/v1/public/characters?limit=40&ts=1&apikey=f7ea062d9217e7f99222795238db1761&hash=f527f8aca4ff4f7b7388521c555857de`);
  if(response.status>=400){
    throw error("try again....");
  }
  let data=await response.json();
  startdata=data;
  let string="";
  string+=`<div class="row">`;
  for(let i=0;i<data.data.results.length;i++){
    let charName=data.data.results[i].name;
    let path=data.data.results[i].thumbnail.path;
    let extension=data.data.results[i].thumbnail.extension;
    let id=data.data.results[i].id;
    path=`${path}/landscape_amazing.${extension}`

    string+=`<div class=" img-container col-sm-6 col-md-3 my-3 d-flex flex-column align-items-center">
    <div data-id="${id}" class="hero-img"><img src="${path}"></div>
    <div class="hero-name text-center">${charName}</div></div>`;
    if(i+1%4==0){
      string+=`</div>`;
      string+=`<div class="row">`
    }
  }
  string+=`</div>`;
  characterContainer.innerHTML=string;
   return startdata;
}

marvelData= await fetchText();

  //function show result for search
  function ShowResult(text){
    let objs=[];
    console.log("hi");
    async function getResult(){
      let rs=await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${text}&limit=60&ts=1&apikey=f7ea062d9217e7f99222795238db1761&hash=f527f8aca4ff4f7b7388521c555857de`);
      if(rs.status>400){
        throw error("try again later");
      }
      console.log("hi");
      let obj;
      let data=await rs.json();
      let element=data.data.results;
      let searchName;
      let img;
      searchResult.innerHTML="";
      for(let i=0;i<element.length;i++){
        text=text.toLowerCase().trim();
        let m=element[i].name.toLowerCase();
        if(text==""){
          searchResult.style.display="none";
          cross.style.display="none";
        }
        if(m.startsWith(`${text}`) && text!=""){
        let dataId=element[i].id;
        searchName=element[i].name;
        let path=element[i].thumbnail.path;
        let extension=element[i].thumbnail.extension;
        let urls=element[i].urls;
        console.log(urls);
        let url;
        for(let j=0;j<urls.length;j++){
          if(urls[j].type=="comiclink"){
            url=urls[j].url;
          }
        }
        img=`${path}/standard_medium.${extension}`;
        let img1=`${path}/landscape_amazing.${extension}`;
        obj={
          searchName:searchName,
          img:img1,
          id:dataId
        }
        objs.push(obj);
        searchResult.innerHTML+=`<div data-id="${dataId}" class="fav-container my-2 row">
       <div data-id="${dataId}" class="fav-img col-2 d-flex align-items-center"><a href="${url}"><img src="${img}"></a></div>
        <div class="col-8 fav-name d-flex align-items-center justify-content-center">${searchName}</div>
        <div class="col-2 fav-heart d-flex align-items-center"><span  class="fav-heart" ><i data-id="${dataId}" class=" fa-heart bi bi-heart-fill"></i></span></div>
        </div>`;
        searchResult.style.display="block";
        cross.style.display='block';
        }
      }
    }
    getResult();
    faHearts=document.querySelectorAll(".fav-heart");
    return objs;
  }
//function to add data to localstorage to add favourite list
function addToStorage(id){
  for(let i=0;i<searchData.length;i++){
    let obj=searchData[i];
    if(obj.id==id){
     let favouriteListData=JSON.parse(localStorage.getItem("favourite"));
      if(favouriteListData==null){
        favouriteListData=[];
      }
      let find=false;
      for(let i=0;i<favouriteListData.length;i++){
        let cobj=favouriteListData[i];
        if(cobj.id==id){
          find=true;
        }
      }
      if(!find){
        favouriteListData.push(obj);
        localStorage.setItem("favourite",JSON.stringify(favouriteListData));
      }
      
    }
  }
  }
  //function to add favouritelist
  function addToFavouriteList(id){
    let tar=document.querySelector(` #search-result [data-id="${id}"]`);
    tar.style.display="none";
    addToStorage(id);
    }
  
  //applying event listener to documen.
  document.addEventListener('click',checkField);
  function checkField(e){
    let target=e.target;
    let cname=target.className.trim();
    if(cname=="fa-heart bi bi-heart-fill"){
      let id=target.dataset.id;
      addToFavouriteList(id);
    }
    else if(target.className=="hero-img"|| target.className=="fav-img col-2 d-flex align-items-center"){
      console.log("bye");
     let pid=target.dataset.id;
     let details=getDetails(pid);
     console.log(details);
     localStorage.setItem("details",JSON.stringify(details));
     landToPage();
    }
  }
  function landToPage(){
    window.location.href="./character.html";
  }
  function getDetails(pid){
  let details;
  let elementdata=marvelData.data.results;
  for(let i=0;i<elementdata.length;i++){
    if(elementdata[i].id==pid){
      let charName=elementdata[i].name;
      let id=pid;
      let path=elementdata[i].thumbnail.path;
      let extension=elementdata[i].thumbnail.extension;
      let img=`${path}/portrait_incredible.${extension}`;
      let description=elementdata[i].description;
      let url=elementdata[i].urls[1].url;
      details={
        charName:charName,
        id:id,
        img:img,
        description:description,
        url:url,
      }
      break;
    }
  }
  return details;
  }
  
  
  
  
  
  cross.addEventListener('click',hide);
  function hide(){
    searchResult.style.display="none";
    cross.style.display="none";
  }
  search.addEventListener('keyup',captureWord);
  function captureWord(e){
    let text=search.value;
    if(text!=""){
      searchData=ShowResult(text);
    }
    
  } 



