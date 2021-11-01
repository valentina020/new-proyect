//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
   "use strict;"
let container = document.getElementById("container");
let inputs = document.getElementsByClassName("inputs")
let alertas = document.getElementById("alert");
let usuario = JSON.parse(localStorage.getItem("login"));
let input = document.getElementById("submit");
let btn = document.getElementById("btn");

function controlF() {

    if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == "" || inputs[6].value == "") {
       alertas.innerHTML = `<div class="alert alert-danger role="alert">
         <strong> Por favor llenar todos los campos.</strong>`
       setTimeout(() => {
           alertas.innerHTML = "";
       }, 3000)
    } else {
        let info = {
            Nombre: inputs[0].value,
            Apellido: inputs[1].value,
            Edad: inputs[2].value,
            Email: inputs[3].value,
            Telefono: inputs[4].value,
            Direccion: inputs[5].value,
            Pais: inputs[6].value
        };
        localStorage.setItem("Perfil", JSON.stringify(info));
        alertas.innerHTML = `<div class="alert alert-success" role="alert">
        <strong>Se actualizo su perfil.</strong>
        </div>`
        setTimeout(() => {
            alertas.innerHTML = "";
        }, 3000);

        perfilUser();
    }
}

function perfilUser() {
    container.innerHTML = "";
    if (!localStorage.getItem("Perfil")) {
        container.innerHTML = `<div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column aling-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="130px"
              src="img/foto-no-foto.jpg">
              <span class="font-weight-bold">${usuario[0].emvalue}</span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                  <div class="d-flex justify-content-between aling-items-center mb-3">
                     <h4 class="text-center">Información del Perfil</h4>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Nombre</lable><input type="text" class="form-control inputs"
                       placeholder="Nombre">
                    </div>
                    <div class="col-md-6"><label class="labels">Apellido</lable><input type="text" class="form-control inputs"
                       placeholder="Apellido">
                    </div>
                  </div>
                  <div class="row mt-3">
                     <div class="col-md-12"><label class="labels">Numero de Telefono</label><input type="text" class="form-control inputs" placeholder="Numero de Telefono">
                     </div>
                     <div class="col-md-12"><label class="labels">Edad</label><input type="number" class="form-control inputs" placeholder="Edad" min="18">
                     </div>
                     <div class="col-md-12"><label class="labels">Direccion</label><input type="text" class="form-control inputs" placeholder="Direccion">
                     </div>
                     <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control inputs" placeholder="Email">
                     </div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-6"><label class="labels">Pais</label><input type="text" class="form-control inputs" placeholder="Pais">
                      </div>
                  </div
                  <p></p>
                  <div class="mt-5 text-center"><button class="btn btn-primary perfil-button" id="btn" onclick="controlF()" type="button">Guardar</button>
                  </div>
                </div>
            </div>
          </div>
        </div>`;
    } else {
        let data = JSON.parse(localStorage.getItem("Perfil"));
        container.innerHTML = `<div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                    <div class="col-md-3 border right">
                      <div class="d-flex flex-column align-items-center p-3 py-5"><img class="rounded-circle mt-5" width="130px" 
                        src="img/foto-no-foto.jpg">
                        <span class="font-weight-bold">${usuario[0].emvalue}</span></div>
                    </div>
                    <div class="col-md-5 border-right">
                       <div class="p-3 py-5">
                          <div class="d-flex justify-content-between aling-items-center mb-3">
                            <h4 class="text-center">Informacion del Perfil</h4>
                          </div>
                          <div class="row mt-2">
                             <div class="col-md-6"><label class="labels">Nombre</label><inpu value="${data.Nombre}" type="text" class="form-control inputs"
                                placeholder="Nombre"></div>
                                <div class="col-md-6"><label class="labels">Apellido</lable><input  value="${data.Apellido}" type="text" class="form-control inputs"
                                placeholder="Apellido">
                             </div>
                          </div>
                          <div class="row mt-3">
                             <div class="col-md-12"><label class="labels">Numero de Telefono</label><input  value="${data.Telefono}" type="number" class="form-control inputs" placeholder="Numero de Telefono">
                             </div>
                             <div class="col-md-12"><label class="labels">Edad</label><input  value="${data.Edad}" type="number" class="form-control inputs" placeholder="Edad" min="18">
                             </div>
                             <div class="col-md-12"><label class="labels">Direccion</label><input  value="${data.Direccion}" type="text" class="form-control inputs" placeholder="Direccion">
                             </div>
                             <div class="col-md-12"><label class="labels">Email</label><input  value="${data.Email}" type="text" class="form-control inputs" placeholder="Email">
                             </div>
                           </div>
                          <div class="row mt-3">
                             <div class="col-md-6"><label class="labels">Pais</label><input value="${data.Pais}" type="text" class="form-control inputs" placeholder="Pais">
                          </div>
                          <div class="mt-5 text-center"><button class="btn btn-primary perfil-button" id="btn" onclick="controlF()" type="button">Guardar</button>
                          </div>
                        </div>
                    </div>
                </div>`

    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    perfilUser();
})
