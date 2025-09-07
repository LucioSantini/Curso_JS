const url = '../db/data.json'
const sesion = JSON.parse(sessionStorage.getItem("session_activa"));
const Deslogeado = document.getElementById("deslogeado")
const h1 = document.getElementById("h1_usuario")
const nav_us = document.getElementById("usuario_nav")
const interfaz = document.getElementById("interfaz")

if (sesion === null){
    nav_us.style.display = "none";
    interfaz.style.display = "none"
    h1.style.display = "none"
}
else{
    Deslogeado.style.display = "none"

    const usuario_boton = document.createElement("div")
    usuario_boton.innerHTML= `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${sesion.nombre}</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" id="logoff">Logoff</a></li>
                            </ul>`
    nav_us.appendChild(usuario_boton)

    const logoff = document.getElementById("logoff")

    logoff.addEventListener("click", () =>{
        sessionStorage.removeItem("session_activa");
        location.reload();
    })

    carga_servicios()

    async function carga_servicios() {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error("Error en respuesta: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        render_servicios(data.servicios)
        return data.Servicios;
    })
    .catch(error => {
        console.error("Hubo un problema:", error);
    });
}

function render_servicios(servicios) {
    servicios.forEach(element => {
        const card = document.createElement("div")
        card.className = "card-group"
        card.innerHTML = `<div class="card">
                                <img src="../img/servicios.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${element.nombre}</h5>
                                <p class="card-text">Precio ${element.Precio}</p>
                                <button class="btn btn-primary btn-lg" id="${element.Id}">Pagar</button>
                                </div>`

        interfaz.appendChild(card)
    });
    Ops_seleccion(servicios)
}

function Ops_seleccion(servicios) {
    const seleccion = document.querySelectorAll(".btn.btn-primary.btn-lg")
    seleccion.forEach(ops => {
        ops.onclick = (e) => {
            const opcion = parseInt(e.currentTarget.id)
            const servicio = servicios.find(s => s.Id === opcion)

            Swal.fire({
                    title: `Pagar servicio ${servicio.nombre}`,
                    imageUrl: "../img/servicios.png",
                    html: `<p>Precio del servicio: ${servicio.Precio}, Saldo actual ${sesion.saldo}</p>`,
                    showCancelButton: true,
                    confirmButtonText: "Pagar",
            }).then((result) =>{
                if(result.isConfirmed){
                    if(servicio.Precio > sesion.saldo){
                        Swal.fire({
                            title: "Pago Cancelado",
                            text: "Saldo insuficiente",
                            icon: "error"
                        })
                    }
                    else{
                        sesion.saldo = sesion.saldo - servicio.Precio
                        sessionStorage.setItem("session_activa", JSON.stringify(sesion))
                        Swal.fire({
                            title: "Pago exitoso",
                            text: `has ingresado pagado el servicio de ${servicio.nombre} a ${servicio.Precio} pesos`,
                            icon: "success"
                        });
                    }

                }
            })
            
        }
    })
    }
}