var categoriesArray = [];
var minCount = undefined;
var maxCount = undefined;

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col-3">
            <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ category.name + `</h4>
                <h6 class='mb-1'> ` + category.cost + category.currency + ` <h4> 
                <small class="text-muted">` + category.soldCount + ` artículos</small>
            </div>
            <p class="mb-1">` + category.description + `</p>
        </div>
    </div>
        </div>
        `

            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }
    }
}

const ordRel = () => {
    categoriesArray.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    });

    showCategoriesList(categoriesArray);
}

const ordPrecio = () => {
    categoriesArray.sort(function (a, b) {
        return b.cost - a.cost;
    });

    showCategoriesList(categoriesArray)
}

const ordPrecioDes = () => {
    categoriesArray.sort(function (a, b) {
        return a.cost - b.cost;
        
    })
    showCategoriesList(categoriesArray) 
}


document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesList(categoriesArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList(categoriesArray);
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});


