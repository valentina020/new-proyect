//Si el localStorage esta vacio, que mande a la persona directamente a el login
document.addEventListener("DOMContentLoaded", function(e) {
    if (!localStorage.getItem("login"))
    location.href = "login.html"
});