const url="../data/servicios.json";
const cuadricula=document.getElementById("cuadricula");
let serv;
let servicios;
document.addEventListener("DOMContentLoaded",()=>{

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        servicios=data.length;
        createCard(data)
    })
    .catch(err=>console.log(err))

})

const createCard=(data)=>{
    //console.log(data)
    data.forEach(e=> {
        
        const div=document.createElement("div")
        const left=document.createElement("div")
        const img=document.createElement("img")
        const right=document.createElement("div")
        const p=document.createElement("p");
        const p2=document.createElement("p");
        const h3=document.createElement("h3");
        const button=document.createElement("button");
        const a=document.createElement("a");

        p.innerHTML=e.name;

        div.className="card-me";
        left.className="left";
        right.className="right";
        p.className="text";
        a.className="text-light text-decoration-none"

        p.innerHTML=e.name;
        a.innerHTML="Reservar";
        p2.innerHTML=e.desc;
        h3.innerHTML=e.title;
        
        
        img.setAttribute("src",`img/${e.img}`);
        button.setAttribute("data-id",e.id);
        a.setAttribute("href","#form-content")

        
        button.appendChild(a);
        left.appendChild(img);
        left.appendChild(p);
        right.appendChild(h3);
        right.appendChild(p2);
        right.appendChild(button);
        div.appendChild(left);
        div.appendChild(right);

        cuadricula.appendChild(div);
        
        
        button.onclick=()=>{
            getId(button.getAttribute("data-id"))
        }
    });


}

const getId=(id)=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(e=>{
            if(e.id==id){
                serv=e;
                setInputs();
                return
            }
        })
    })
    .catch(err=>console.log(err))
}


const select=document.getElementById("select");
const form=document.getElementById("form");
const aler=document.getElementById("alert");
const backAlert=document.getElementById("alert-back");
const campo=document.getElementById("campo");
const close=document.getElementById("close");


const setInputs=()=>{
        select.value=`${serv.title}`
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(e.target[0])
    const t=[e.target[0],e.target[1],e.target[2],e.target[3],e.target[4]];//estos son los datos escritos en el formulario
    t.forEach(i=>{
        if(i.value.length==0){
            aler.style.transform='scale(1)'
            backAlert.style.transform='scale(1)'
            campo.innerText=i.name;
        }
    })
    const data = new FormData(e.target)

            fetch('https://formspree.io/f/mbjqbppd',{

                method:'POST',
                body:data,
                headers:{
                    'Accept':'application/json'
                }
            })
            .then(res=>res.json())
            .then(dat=>{
              alert("mensaje enviado")
                console.log(dat)
            })
            .catch(err=>{
                console.log(err)
            })
})

close.addEventListener('click',()=>{
    aler.style.transform='scale(0)'
    backAlert.style.transform='scale(0)'  
})
