
let tar=document.querySelector(".character-detail");
let details=JSON.parse(localStorage.getItem("details"));
if(details!=null){
    let charName=details.charName;
    let id=details.id;
    let img=details.img;
    let description=details.description;
    if(description==""){
        description=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis ullam sequi dolorum minus suscipit
         soluta accusantium dicta, optio, incidunt commodi obcaecati deleniti quas unde.`
    }

    let url=details.url;
    console.log(details);
    tar.innerHTML="";
    let string=`<div class="row">
    <div class="col">
    <img src="${img}"><br>
    <span id="char-name">${charName}</span><br>
    <span id="id">${id}</span>
    </div>
    <div class=" description col">
    <p>${description}</p>
    </div>
    </div>`
    tar.innerHTML=string;
}

