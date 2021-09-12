let productInfo = {};
let productComent = [];

const showProduct = (producto) => {


    document.getElementById('producto').innerHTML = `
    <div class="list-group-item ">
        <div class="row">
            <div class="col-3">
                <img src="` + producto.images[0] + `" alt="" class="img-thumbnail">
            </div>
            <div class="col-6">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ producto.name + `</h4>
                   
                </div>
           
                <p class="mb-1">` + producto.description + `</p>
            </div>
            <div class="col-3">
            <h4 class='mb-1'> `+ ` $` + producto.currency + " " + producto.cost + ` <h4> 
            
        </div>
        </div>
    </div>
    
   `

}


const showGaleria = (producto) => {

    document.getElementById('galeria').innerHTML = `
<div class="tz-gallery">    
    <div class="row">
        <div class="col-sm-3 col-md-3">
            <a href="`+ producto.images[1] +`" target="_blank"><img src="`+ producto.images[1] + `" class="img-thumbnail"></a>
        </div>
        <div class="col-sm-3 col-md-3">
            <a href="`+ producto.images[2] +`" target="_blank"><img src="`+ producto.images[2] + `" class="img-thumbnail"></a>
        </div>
        <div class="col-sm-3 col-md-3">
            <a href="`+ producto.images[3] +`" target="_blank"><img src="`+ producto.images[3] + `" class="img-thumbnail"></a>
        </div>
        <div class="col-sm-3 col-md-3">
            <a href="`+ producto.images[4] +`" target="_blank"><img src="`+ producto.images[4] + `" class="img-thumbnail"></a>
        </div>
    
    </div>
</div>
`
}

const showComents = () => {

    document.getElementById('comentarios').innerHTML = `
    <div class="row">
    `
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;

            showProduct(productInfo);
            showGaleria(productInfo);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prductComent = resultObj.data;
        }
    })


});