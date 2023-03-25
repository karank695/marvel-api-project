let fav=(()=>{
  let cont=document.querySelector(".fav-container");
  //function to updata data in favourite list
 function updata(){
    let myfavouriteList=JSON.parse(localStorage.getItem("favourite"));
    cont.innerHTML="";
    let string=`<div class="row my-4">`
    for(let i=0;i<myfavouriteList.length;i++){
      let obj=myfavouriteList[i];
      let searchName=obj.searchName;
      let img=obj.img;
      let id=obj.id;
      string+=`<div data-id="${id}" class="col">
      <div class="imgContainer">
      <div data-id="${id}" class="char-img"><img src="${img}"></div>
      <div class="charName">"${searchName}"</div>
      </div>
      </div>`
      if((i+1)%4==0){
      string+=`</div>`
      string+=`<div class="row">`
      }
    }
    cont.innerHTML=string;
 
}
updata();
document.addEventListener('click',checkField);
function checkField(e){
  let target=e.target;
console.log(e.target);
console.log(target.className);
if(target.className=="char-img"){
let delId=target.dataset.id;
delFav(delId);
}
}
//function to delete data from the favourite list
function delFav(delId){
  let tar=document.querySelector(`[data-id="${delId}"]`);
  let predata=JSON.parse(localStorage.getItem("favourite"));
  let newdata=[];
  for(let i=0;i<predata.length;i++){
    let obj=predata[i];
    if(obj.id!=delId){
    newdata.push(predata[i]);
    
    }
  }
  localStorage.setItem("favourite",JSON.stringify(newdata));
  tar.style.display='none';
}

})();


 



