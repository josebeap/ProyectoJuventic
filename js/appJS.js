window.onload = function(){

const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
//const modal = document.getElementById('compraModal')
let b1 = document.getElementById('carousel');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;


const fragment = document.createDocumentFragment();
let carrito = {};

const bd = [
              {
                  id: 1,
                  nombre: 'Pie Floater',
                  precio: 1500,
                  imagen: 'images/1.jpg'
              },
              {
                  id: 2,
                  nombre: 'Cangrejo al chili',
                  precio: 1200,
                  imagen: 'images/2.jpg'
              },
              {
                  id: 3,
                  nombre: 'Zurek',
                  precio: 2000,
                  imagen: 'images/3.jpg'
              },
              {
                  id: 4,
                  nombre: 'Moros y Cristianos',
                  precio: 3000,
                  imagen: 'images/4.jpg'
              }

          ];


  /*cards.addEventListener('click', e =>{

      addCarrito(e);

  });*/
    $('.carousel').carousel({ /*detiene el deslizamiento automatico del carrousel*/
      interval: false,
    });

  b1.addEventListener('click', e =>{
   
        addCarrito(e);
        //console.log(e.target.dataset.id)
        //console.log(e.target.parentElement)
     
  });

  items.addEventListener('click', e => {

    btnSumRest(e);
  })


 const addCarrito = e =>{
   
   if (e.target.classList.contains('btn-dark')){
       setCarrito(e.target.parentElement);
   }

   e.stopPropagation();
  }

  const setCarrito = objeto =>{

  const producto = {
    
    id: objeto.querySelector('.btn-dark').dataset.id,
    nombre: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('span').textContent,
    cantidad: 1

  }

  if (carrito.hasOwnProperty(producto.id)){
    producto.cantidad = carrito[producto.id].cantidad + 1
  
  }

  carrito[producto.id] = {...producto}
  
  pintarCarrito();

  }

 const pintarCarrito = () => {


 items.innerHTML = ''; //limpia el html para que no se duplique los items
 Object.values(carrito).forEach(it =>{

  templateCarrito.querySelector('th').textContent = it.id;
  templateCarrito.querySelectorAll('td')[0].textContent = it.nombre;
  templateCarrito.querySelectorAll('td')[1].textContent = "$ "+it.precio;
  templateCarrito.querySelectorAll('td')[2].textContent = it.cantidad;
  templateCarrito.querySelector('.btn-info').dataset.id = it.id;
  templateCarrito.querySelector('.btn-danger').dataset.id = it.id;
  templateCarrito.querySelectorAll('td')[4].textContent = "$ "+it.cantidad * it.precio;
  templateCarrito.querySelector('#quitItem').dataset.id = it.id;

  const clone = templateCarrito.cloneNode(true);
  fragment.appendChild(clone);

 })
  items.appendChild(fragment);

  pintarFooter();


  localStorage.setItem('carrito', JSON.stringify(carrito));
 
 }

 const pintarFooter = () =>{
  footer.innerHTML ='';

  if(Object.keys(carrito).length === 0){
  footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío, empiece agregar platillos!</th>'
  
    return;
  }

  const nCantidad = Object.values(carrito).reduce((i, {cantidad}) => i + cantidad, 0)
  const nPrecio = Object.values(carrito).reduce((i, {cantidad, precio}) => i + cantidad * precio, 0)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () => {

    carrito = {};
    document.getElementById("p2").innerHTML='';
    pintarCarrito();

     })
  }
 
  const btnCompra = document.getElementById('confirmar-compra')

  btnCompra.addEventListener('click', () => {

    document.getElementById("p1").innerHTML ='';  
        Object.values(carrito).forEach(it =>{

         document.getElementById("p1").innerHTML += it.cantidad+" x "+it.nombre+" = "+"$"+it.cantidad*it.precio+"<br>"
         document.getElementById("p2").innerHTML = "Total: "+"$"+Object.values(carrito).reduce((i, {cantidad, precio}) => i + cantidad * precio, 0)

         return;

       })
   })
 

 const btnSumRest = e =>{
   
   //console.log(e.target); //btn sumar y restar
   if(e.target.classList.contains('btn-info')){
     
     const producto = carrito[e.target.dataset.id]
     producto.cantidad++
     carrito[e.target.dataset.id] = {...producto}
     pintarCarrito()
   }
   
   if(e.target.classList.contains('btn-danger')){
     
     const producto = carrito[e.target.dataset.id]
     producto.cantidad--

     if(producto.cantidad === 0){
       delete carrito[e.target.dataset.id]
     }

     pintarCarrito();
   }

   if(e.target.classList.contains('btn-outline-danger')){

      let id = e.target.dataset.id;
      
      delete carrito[id]

      pintarCarrito();
      
     
   }

   e.stopPropagation();

 }

    /*const pintarCard = () =>{
      bd.forEach(plato =>{
      templateCard.querySelector('h5').textContent = plato.nombre;
      templateCard.querySelector('p').textContent = plato.precio;
      templateCard.querySelector('img').setAttribute("src", plato.imagen);
      templateCard.querySelector('.btn-dark').dataset.id = plato.id;

      const clone = templateCard.cloneNode(true);
      fragment.appendChild(clone);
      });
      cards.appendChild(fragment);
    };
  
  pintarCard();*/

  if(localStorage.getItem('carrito')){
   
    carrito = JSON.parse(localStorage.getItem('carrito'))
     pintarCarrito(); 
   }
 }

 function sendEmail() {
  

  let correo = document.getElementById("recipient-correo").value
  let nombre = document.getElementById("recipient-name").value
  let mensaje = document.getElementById("p1").innerHTML
  mensaje += document.getElementById("p2").innerHTML

  sendEmailCliente(correo,nombre,mensaje)
  sendEmailRestaurante(correo,nombre,mensaje)
  carrito = {};
  localStorage.clear();
  location.reload();
  alert("Pedido realizado con exito")
  

}

function sendEmailCliente(correo,nombre,mensaje){

    
  Email.send({
      Host: "smtp.gmail.com",
      Username: "josebeap11@gmail.com",
      Password: "vvtgsyoewgtiafmg",
      To: correo,
      From: "josebeap11@gmail.com",
      Subject: nombre + ", este es tu pedido",
      Body: mensaje,
  })
}

function sendEmailRestaurante(correo,nombre,mensaje){

  
  Email.send({
      Host: "smtp.gmail.com",
      Username: "josebeap11@gmail.com",
      Password: "vvtgsyoewgtiafmg",
      To: "jose.1701710903@ucaldas.edu.co",
      From: "josebeap11@gmail.com",
      Subject: nombre + " Ha realizado una compra",
      Body: nombre+"<br>"+ correo + "<br> "+mensaje,
  })
}
