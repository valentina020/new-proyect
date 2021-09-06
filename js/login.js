function iniciar(){
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    if((usuario !=="")&& (password !=="")){
        window.location.href="./index.html";
    } 
    else{
      alert("Usuario y/o Contraseña incorrecto.")
    }

}

  var array = [];
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("iniciar").addEventListener("click", function() {
        iniciar();
     
    //Guardar valores en el localStorage
    var usuariovalue = document.getElementById("usuario").value;
    var passwordvalue = document.getElementById("password").value;
    array.push({usuariovalue,passwordvalue});
    localStorage.setItem("login",JSON.stringify(array));
 });

});