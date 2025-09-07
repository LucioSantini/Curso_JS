const apidolarUrl = `https://dolarapi.com/v1/dolares/cripto`;
const sesion = JSON.parse(sessionStorage.getItem("session_activa"));

const h1 = document.getElementById("h1_usuario")
const nav_us = document.getElementById("usuario_nav")
const login = document.getElementById("nav_item1")
const registro = document.getElementById("nav_item2")
const Deslogeado = document.getElementById("deslogeado")
const interfaz = document.getElementById("interfaz")

if (sesion === null){
    nav_us.style.display = "none";
    interfaz.style.display = "none"
    h1.style.display = "none"
}
else{
    Deslogeado.style.display = "none"
    login.style.display = "none"
    registro.style.display = "none"

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

    h1.textContent = "bienvenido Señor/a "+ sesion.nombre

    const pesos_contenedor = document.getElementById("peso")

    pesos_contenedor.textContent = "$ "+sesion.saldo

    const dolares_contenedor = document.getElementById("dolar")
    let dolares = 0

    const compra_dolar = document.getElementById("boton_dolar")

    compra_dolar.addEventListener("click", () =>{
        fetch(apidolarUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error("Error en respuesta: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: "Compra Dolar Cripto",
                    imageUrl: "./img/dolar.png",
                    html: `<p>Compra: 1 Dolar = ${data.compra} Pesos</p>
                            <p>Venta: 1 Dolar = ${data.venta} Pesos</p>
                            <p>Ingrese la cantidad de pesos/dolares a convertir</p>`,
                    input: "text",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showDenyButton: true,
                    denyButtonText: `Vender`,
                    returnInputValueOnDeny: true,
                    showCancelButton: true,
                    confirmButtonText: "Comprar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const cantidad = Number(result.value)

                        if (cantidad > sesion.saldo){
                            Swal.fire({
                                title: "Cancelado",
                                text: "El saldo ingresado es mayor al disponible en la cuenta",
                                icon: "error"
                            })
                        }
                        else{
                        sesion.saldo = sesion.saldo - cantidad
                        let conversión = cantidad / data.compra
                        dolares = dolares + conversión
                        sesion.dolares = dolares
                        dolares_contenedor.textContent= "U$S "+ dolares
                        pesos_contenedor.textContent= "$ "+ sesion.saldo
                        sessionStorage.setItem("session_activa", JSON.stringify(sesion))
                        Swal.fire({
                        title: "Compra realizada",
                        text: `realizaste la compra de ${conversión} dolares`,
                        icon: "success"
                        });
                        }
                    }
                    else if (result.isDenied) {
                        const cantidad = Number(result.value)

                        if (cantidad > sesion.dolares || isNaN(sesion.dolares)){
                            Swal.fire({
                                title: "Cancelado",
                                text: "El saldo en dolares ingresado es mayor al disponible en la cuenta",
                                icon: "error"
                            })
                        }
                        else{
                        sesion.dolares = sesion.dolares - cantidad
                        let conversión = cantidad * data.venta
                        sesion.saldo = sesion.saldo + conversión
                        dolares_contenedor.textContent= "U$S "+ sesion.dolares
                        pesos_contenedor.textContent= "$ "+ sesion.saldo
                        sessionStorage.setItem("session_activa", JSON.stringify(sesion))
                        Swal.fire({
                        title: "Venta realizada",
                        text: `Realizaste la Venta de ${cantidad} dolares por ${conversión} pesos`,
                        icon: "success"
                        });
                        }
                    }
                });
            })
            .catch(error => {
                Swal.showValidationMessage(`
                    Request failed: ${error}
                `);
            });
    })

    const Ingresos = document.getElementById("ingreso_boton")

    Ingresos.addEventListener("click", () =>{
        Swal.fire({
                    title: "Ingresar Pesos",
                    imageUrl: "./img/dolar.png",
                    html: `<p>Ingrese la cantidad de pesos a ingresar a la cuenta</p>`,
                    input: "text",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Ingresar",
        }).then((result) =>{
            if(result.isConfirmed){
                const cantidad = Number(result.value)

                sesion.saldo = Number(sesion.saldo) + cantidad
                pesos_contenedor.textContent= "$ "+ sesion.saldo
                sessionStorage.setItem("session_activa", JSON.stringify(sesion))

                Swal.fire({
                    title: "Ingreso exitoso",
                    text: `has ingresado ${cantidad} pesos a tu cuenta, ahora tienes ${sesion.saldo} disponibles para usar`,
                    icon: "success"
                });

            }
        })
    })

    const servicios = document.getElementById("boton_servicios")

    servicios.addEventListener("click", () =>{
        window.location.href='./pages/servicios.html'
    })

    const egresos = document.getElementById("boton_egresos")

    egresos.addEventListener("click", () =>{
        Swal.fire({
                    title: "retirar Pesos",
                    imageUrl: "./img/dolar.png",
                    html: `<p>Ingrese la cantidad de pesos a retirar de la cuenta</p>`,
                    input: "text",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Retirar",
        }).then((result) =>{
            if(result.isConfirmed){
                const cantidad = Number(result.value)

                if(cantidad > sesion.saldo){
                    Swal.fire({
                        title: "Cancelado",
                        text: "No posees el suficiente saldo",
                        icon: "error"
                    })
                }
                else{
                sesion.saldo = Number(sesion.saldo) - cantidad
                pesos_contenedor.textContent= "$ "+ sesion.saldo
                sessionStorage.setItem("session_activa", JSON.stringify(sesion))

                Swal.fire({
                    title: "retiro exitoso",
                    text: `has retirado ${cantidad} pesos a tu cuenta, ahora tienes ${sesion.saldo} disponibles para usar`,
                    icon: "success"
                });
                }

            }
        })
    })    
    
    const plazo = document.getElementById("boton_plazo")
    
    plazo.addEventListener("click", () =>{
        Swal.fire({
            title: "Proximamente",
            imageUrl: "./img/castor_mantenimiento.png",
            html: `<p>a la espera del desarrollo de backend</p>`,
        })
    })

    const transferencias = document.getElementById("boton_tranferencias")

    transferencias.addEventListener("click", () =>{
            Swal.fire({
            title: "Proximamente",
            imageUrl: "./img/castor_mantenimiento.png",
            html: `<p>Proximamente tranferencias entre billeteras, a la espera de desarrollo de backend</p>`,
        })
    })


}