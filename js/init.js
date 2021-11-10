const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

const mostrarBarra = () => {

  let local = JSON.parse(localStorage.getItem('datos'));

  let innerHTML = `
  <a class="py-3 d-none d-md-inline-block" href="index.html">Inicio</a>
  <a class="py-3 d-none d-md-inline-block" href="categories.html">Categorías</a>
  <a class="py-3 d-none d-md-inline-block" href="products.html">Productos</a>
  <a class="py-3 d-none d-md-inline-block" href="sell.html">Vender</a>
  
  
  
  <div class="dropdown " >
    
    <a href="#" class=" d-none d-md-inline-block dropdown-toggle" role="button" id="nombreUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <div class="circulo ">
    ${local.usuario} <img src="${local.img}" id="userImg" class="img-fluid"> 
  </div>
      
    </a>
    <div class="dropdown-menu dropdown-menu-dark" id="dropdownUser" aria-labelledby="nombreUser">
      <a class="dropdown-item dropMenu" href="cart.html"><p class="dropMenu"><i class="fas fa-shopping-cart"></i> Mi carrito </p></a>
      <a class="dropdown-item" href="my-profile.html"><p class="dropMenu"> <i class="fas fa-id-card"></i>  Mi perfil  </p></a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item "><input type="button" class="btn btn-danger" id="desconectar" onclick="desconectar()" value='Desconectar'></input></a>
    </div>
     
          
    
  
 
`

  document.getElementById('barra').innerHTML = innerHTML;
}

function convertir(img) {
  img.crossOrigin="anonymous";
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var contexto = canvas.getContext("2d");
  contexto.drawImage(img, 0, 0,img.width, img.height);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL;
}




const checkStatus = () => {

  let conectado = false;

  if (localStorage.length === 0 && !conectado) {
    

    
    conectado = true;
    console.log(conectado)
    location.href = 'login.html';
  }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  checkStatus();
  mostrarBarra();


});


