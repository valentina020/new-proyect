var minCount = undefined;
var maxCount = undefined;
var productsArray = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Muestro los productos.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
});
//Muestro de menor a mayor
document.getElementById("sortAsc").addEventListener("click", function () {
    productsArray = ordenAsc(productsArray);
    showProductsList(productsArray);
});

//Muestro de mayor a menor
document.getElementById("sortDesc").addEventListener("click", function () {
    productsArray = ordenDesc(productsArray);
    showProductsList(productsArray);
});

//Muestro en orden descendente segun la cantidad de productos vendidos
document.getElementById("sortBySoldOuts").addEventListener("click", function () {
    productsArray = relevancia(productsArray);
    showProductsList(productsArray);
});
//Para limpiar filtro
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    minCount = undefined;
    maxCount = undefined;
    showProductsList(productsArray);
});

document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Minimos y Maximos para filtrar productos
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }

    showProductsList(productsArray)
});

   document.getElementById("buscar").addEventListener('keyup', filtrarProductos); //Buscador
});

function filtrarProductos() {
    const texto = document.getElementById("buscar").value;
    const agregar = document.getElementById("list-container");
    agregar.innerHTML ='';
    for (let producto of productsArray) {
        let name = product.name;
        let description = product.description;
        if (nombre.indexOf(texto) !== -1 || description.indexOf(texto) !== -1) {
            agregar.innerHTML += `
            <div class="list-group-item list-group-item-action">        
              <div class="row">                 
                  <div class="col-3">                     
                   <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">                 
                  </div>                 
                 <div class="col">                     
                   <div class="d-flex w-100 justify-content-between">                         
                      <h4 class="mb-1">` + product.name + `</h4>                         
                      <small class="text-muted">` + product.soldCount + ` artículos</small>                     
                   </div>    
                     <p class="text-muted">` + product.description + ` </p>
                     <p class="mb-1 price">  `+ product.currency + `   ` + product.cost + `  </p>           
                </div>             
                </div>         
              </div> 
           </div>       
         `  
        }
    }
    if(agregar.innerHTML === "") {
        agregar.innerHTML += `<p> No hay resultados para su busqueda </p>`;
    }
}

//Orden por relevancia
function relevancia(array) {
    let result = [];
    result = array.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
        if (aCount > bCount)
            return -1;
        if (aCount < bCount)
            return 1;
        else 
            return 0;

    });
    return result;
}

//Orden ascendente
function ordenAsc(array) {
    let result = [];
    result = array.sort(function (a, b) {
        return a.cost - b.cost;
    });
    return result;
}

//Orden descendente
function ordenDesc(array) {
    let result = [];
    result = array.sort(function (a, b) {
        return b.cost - a.cost;
    });
    return result;
}



//Funcion para mostrar productos
function showProductsList(array){
    
    let htmlContentToAppend = "";     
    for (let i = 0; i < array.length; i++) {
        var product = array[i];
        
        //Si existen filtros de precio, se muestran los productos, si no existe entonces se muestran todos los productos.
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

               htmlContentToAppend += `  
        <a href="category-info.html" class="list-group-item-action">       
        <div class="list-group-item list-group-item-action">        
            <div class="row">                 
                <div class="col-3">                     
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">                 
                </div>                 
                <div class="col">                     
                     <div class="d-flex w-100 justify-content-between">                         
                        <h4 class="mb-1">` + product.name + `</h4>                         
                        <small class="text-muted">` + product.soldCount + ` artículos</small>                     
                        </div>    
                        <p class="text-muted">` + product.description + ` </p>
                        <p class="mb-1 price">  `+ product.currency + `   ` + product.cost + `  </p>           
                 
                </div>             
            </div>         
        </div> 
        </a>       
        `  

           document.getElementById("list-container").innerHTML = htmlContentToAppend;
        }
    }
}






