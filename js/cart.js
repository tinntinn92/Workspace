let carrito= {};
let cartDes="https://japdevdep.github.io/ecommerce-api/cart/654.json";
let costo=0;
let moneda='';
let subTot=0;

const showCart=(array)=>{


    let contenido='';
    
        document.getElementById('producto').innerHTML=`
       
       <br>
       <div class="container">
        <div class="row justify-content-center align-item-center">
            <div class='col-3'>
            </div>
            <div class='col-3'>
                <b>Producto</b>
            </div>
            <div class='col-3'>
                <b>Cantidad</b>
            </div>
            <div class='col-3'>
                <b>Precio unitario</b>
            </div>
        </div>
        </div>
        <br>
        `
        
        for(let i=0; i<array.articles.length; i++){
    
            
            array.articles[i].id=i;
            
            
            

            if(array.articles[i].currency==='UYU'){
                costo=parseInt(array.articles[i].unitCost)/40;
                moneda='USD'
                
                
            }else{
                costo=parseInt(array.articles[i].unitCost);
                moneda=array.articles[i].currency;
            }

            subTot+=costo*array.articles[i].count;

        contenido+=`
        <div class=" row  ">
            <div class='col-3 '>
                <img class="img-fluid img-thumbnail text-center " src="${array.articles[i].src}">
            </div>
            <div class='col-3'>
                <p>${array.articles[i].name}</p>
            </div>
            <div class='col-3'>
                <input class="cantidad" type="number" id="${array.articles[i].id}" value="${array.articles[i].count}" min="0" onclick="subTotal()">
                
            </div>
            <div class='col-3 align-content-center'>
            <b>${moneda}$<span class="costo" >${costo}</span></b>
            </div>
        </div>
      
            `
            
        }

        
    
        document.getElementById('producto').innerHTML+=contenido;
        document.getElementById('productCostText').innerHTML=`
        
        <b>${moneda}$<span id='subtotal'>${subTot}</span></b>
        `
    }
    
    const subTotal= () =>{

      let cantidad=document.getElementsByClassName('cantidad');
      console.log(cantidad[0].value);
      
      let unidad=document.getElementsByClassName('costo');
      console.log(unidad[0].innerHTML)
      

      for(let i=0; i<cantidad.length; i++){

        carrito.articles[i].subTot= cantidad[i].value * parseFloat(unidad[i].innerHTML);
     
        
      }
      let arrSub=[];

      for(let i=0; i<cantidad.length; i++){

        arrSub.push(carrito.articles[i].subTot)

      }

      console.log(arrSub)

     const reducer=(acc, curr)=> acc+curr;

     subTot=arrSub.reduce(reducer);

      

      console.log(carrito.articles[0].subTot)
      console.log(carrito.articles[1].subTot)

      

      document.getElementById('subtotal').innerHTML=subTot;
        

        
        
    
    }
        
    



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(cartDes).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito= resultObj.data;

            showCart(carrito)
            
        }
    });

});