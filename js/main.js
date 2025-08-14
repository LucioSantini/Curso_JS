// let usuarios_list = []
// let saldos_list = []
// cree los vectores para usuarios y sus saldos

let Usuarios = []

class Cuenta {
    static id = 0
    constructor (nombre, saldo){
        this.id = ++Cuenta.id
        this.nombre = nombre
        this.saldo = saldo
    }
}


const usuariosGuardados = localStorage.getItem("usuarios");
if (usuariosGuardados) {

    const us_storage = JSON.parse(usuariosGuardados);

    for(let i = 0; i < us_storage.length; i++){
        let us = us_storage[i]
        Usuarios.push(new Cuenta(us.nombre, us.saldo))
    }

    // Actualizar el contador estático para que no repita IDs
    if (Usuarios.length > 0) {
        let ultimo_id = 0 
        for (let i = 0; i < Usuarios.length; i++){
            if(Usuarios[i].id > ultimo_id)
            {
                ultimo_id = Usuarios[i].id
            }
        }
        Cuenta.id = ultimo_id
    }
}


let span_alert = document.createElement("span")
document.body.appendChild(span_alert)

const Ops = [
    {
        id : 1,
        nombre : "Ingreso Usuario",
    },
    {
        id : 2,
        nombre : "Consultar saldo",
    },
    {
        id : 3,
        nombre : "Sumar saldo",
    },
    {
        id : 4,
        nombre : "Restar saldo",
    },
    {
        id : 5,
        nombre : "Tops saldo",
    },
    {
        id : 6,
        nombre : "Baja Usuario",
    }
]

// funcion que crea input para solicitar datos usuario y saldo
function Show_inputs (text){

    let titulo = document.createElement("h2")
    titulo.textContent = text
    titulo.id = "titulo"

    let contenedor_imput = document.getElementById("imput_container")
    let nombre_label = document.createElement("label")
    let input_nombre = document.createElement("input")
    let saldo_label = document.createElement("label")
    let input_saldo = document.createElement("input")
    let ingresar_boton = document.createElement("button")

    nombre_label.textContent = "Nombre"
    saldo_label.textContent = "Saldo"
    ingresar_boton.textContent = "ingresar"
    nombre_label.id = "label_nombre"
    input_nombre.id = "input_nombre"
    saldo_label.id = "label_saldo"
    input_saldo.id = "input_saldo"
    ingresar_boton.id = "boton_send"

    
    contenedor_imput.append(titulo,nombre_label,input_nombre, saldo_label, input_saldo, ingresar_boton)
}

// funcion para remover los elementos antes creados cuando no se utilizen
function remove_inputs (){
    document.getElementById("titulo").remove();
    document.getElementById("label_nombre").remove();
    document.getElementById("input_nombre").remove();
    document.getElementById("label_saldo").remove();
    document.getElementById("input_saldo").remove();
    document.getElementById("boton_send").remove();
}

// funcion para eliminar de la pantalla la lista de usuarios creadas en consultar saldo y top saldos
function remove_userlist (){
    let card = document.querySelectorAll(".cards")
    card.forEach(element =>{
        element.remove()
    })
}

// funcion de creacion de usuarios
function ingreso_usuario () {
    document.querySelectorAll(".ops").forEach(ops => {
        ops.style.display = "none"
    })

    Show_inputs("Ingreso usuario")
    let boton = document.getElementById("boton_send")

    boton.addEventListener("click", () => {
        const nombre = document.getElementById("input_nombre").value
        const saldo = parseInt(document.getElementById("input_saldo").value)


        if (isNaN(saldo) || saldo < 0){ // comprueba que el saldo ingresado no sea un valor vacio un caracter o nan
        console.log("saldo ingresado no valido, volver a intentar")
        span_alert.textContent = "saldo ingresado no valido, volver a intentar"
        }
        else
        {
            if (Usuarios.find(usuario => usuario.nombre === nombre) === undefined){ // comprueba si el usuario no fue ingresado anteriormente

                let cuenta = new Cuenta(nombre, saldo)
                Usuarios.push(cuenta)
                localStorage.setItem("usuarios", JSON.stringify(Usuarios))

                remove_inputs ()

                document.querySelectorAll(".ops").forEach(ops => {
                ops.style.display = "block"
                })
                span_alert.textContent = "usuario creado correctamente"
            }
            else
            {
                console.log("usuario ya existe, volver a intentar")
                span_alert.textContent = "usuario ya existe, volver a intentar"
            }
        }
    })
    // -------------------------------------------- Metodo por consola de referencia ---------------------
    // let nombre = prompt("ingrese nombre del usuario")
    // let saldo = parseInt(prompt("ingrese saldo inicial"))
    // if (isNaN(saldo) || saldo === "" || saldo === null || saldo < 0){ // comprueba que el saldo ingresado no sea un valor vacio un caracter o nan
    //     console.log("saldo ingresado no valido, volver a intentar")
    // }
    // else
    // {
    //     if (usuarios.indexOf(nombre) === -1){ // comprueba si el usuario no fue ingresado anteriormente
    //         usuarios.push(nombre)
    //         saldos.push(saldo)

    //         let cuenta = new Cuenta(nombre, saldo)
    //         Usuarios.push(cuenta)

    //     }
    //     else
    //     {
    //         console.log("usuario ya existe, volver a intentar")
    //     } 
    // }

}

function consultar_saldos (){

    let contenedor_us = document.getElementById("List_users")

    Usuarios.forEach(element => {
        let card = document.createElement("div")
        card.innerHTML = `<h3>${element.nombre}</h3>
                          <p>Saldo: ${element.saldo} </p>`
        
        card.className = "cards"
        contenedor_us.appendChild(card)
    })
    // -------------------------------------------- Metodo por consola de referencia ---------------------

    // let i = 0

    // for (let usuario of usuarios) {

    //     console.log("El usuario "+usuario+" tiene un saldo de:"+saldos[i])

    //     i++

    // }

    console.log("\n\n probando clases \n")
    console.log(Usuarios)
}

function sumar_saldo (){

    document.querySelectorAll(".ops").forEach(ops => {
        ops.style.display = "none"
    })

    Show_inputs("sumar saldo a usuario")
    let boton = document.getElementById("boton_send")

    boton.addEventListener("click", () => {
        const nombre = document.getElementById("input_nombre").value
        const suma = parseInt(document.getElementById("input_saldo").value)
    
        let find = Usuarios.find(usuario => usuario.nombre === nombre);
        if (isNaN(suma) || suma < 0){
            console.log("saldo ingresado no valido, volver a intentar")
            span_alert.textContent = "saldo ingresado no valido, volver a intentar"
        }
        else{
            if (find !== undefined){
                find.saldo = find.saldo + suma
                localStorage.setItem("usuarios", JSON.stringify(Usuarios))
                console.log("el saldo fue sumado al usuario: "+find.nombre+", Su saldo actual es de: "+find.saldo)
                span_alert.textContent = "el saldo fue sumado al usuario: "+find.nombre+", Su saldo actual es de: "+find.saldo

                remove_inputs ()

                document.querySelectorAll(".ops").forEach(ops => {
                ops.style.display = "block"
                })

            }
            else
            {
                console.log("Usuario no encontrado")
                span_alert.textContent = "Usuario no encontrado"
            }
        }
    })

    // let usuario = prompt("A que usuario decea agregar saldo")

    // let find = usuarios.indexOf(usuario)

    // if (find !== -1){
    //     let suma = parseInt(prompt("ingrese cuanto saldo decea sumar"))
    //     saldos[find] = saldos[find] + suma
    //     console.log("el saldo fue sumado al usuario: "+usuario+", Su saldo actual es de: "+saldos[find])
    // }
    // else
    // {
    //     console.log("Usuario no encontrado")
    // }


}

function restar_saldo (){
    
    document.querySelectorAll(".ops").forEach(ops => {
        ops.style.display = "none"
    })

    Show_inputs("Restar saldo a usuario")
    let boton = document.getElementById("boton_send")

    boton.addEventListener("click", () => {
        const nombre = document.getElementById("input_nombre").value
        const resta = parseInt(document.getElementById("input_saldo").value)
    
        let find = Usuarios.find(usuario => usuario.nombre === nombre);
        if (isNaN(resta) || resta < 0){
            console.log("saldo ingresado no valido, volver a intentar")
            span_alert.textContent = "saldo ingresado no valido, volver a intentar"
        }
        else{
            if (find !== undefined){
                find.saldo = find.saldo - resta
                localStorage.setItem("usuarios", JSON.stringify(Usuarios))
                console.log("el saldo fue restado al usuario: "+find.nombre+", Su saldo actual es de: "+find.saldo)
                span_alert.textContent = "el saldo fue restado al usuario: "+find.nombre+", Su saldo actual es de: "+find.saldo

                remove_inputs ()

                document.querySelectorAll(".ops").forEach(ops => {
                ops.style.display = "block"
                })

            }
            else
            {
                console.log("Usuario no encontrado")
                span_alert.textContent = "Usuario no encontrado"
            }
        }
    })


    // let usuario = prompt("A que usuario decea restar saldo")

    // let find = usuarios.indexOf(usuario)

    // if (find !== -1){
    //     let resta = parseInt(prompt("ingrese cuanto saldo decea restar"))
    //     saldos[find] = saldos[find] - resta
    //     console.log("el saldo fue restado al usuario: "+usuario+", Su saldo actual es de: "+saldos[find])
    // }
    // else
    // {
    //     console.log("Usuario no encontrado")
    // }


}

function top_saldos (){
    
    // metodo visto en clase 6
    
    let top = [...Usuarios].sort((a,b) => b.saldo - a.saldo) // de esta manera crea una copia y no modifica el original

    let contenedor_us = document.getElementById("List_users")

    top.forEach(element => {
        let card = document.createElement("div")
        card.innerHTML = `<h3>${element.nombre}</h3>
                          <p>Saldo: ${element.saldo} </p>`
        
        card.className = "cards"
        contenedor_us.appendChild(card)
    })



    // ----------------------- metodo antiguo ------------------

    // procedo a realizar el metodo burbuja para realizar el ordenamiento mayor a menor, aclaro que debo utilizar esta forma de declarar el for ya que necesito iterar una cantidad de veces igual al tamaño del vector top y avaluar en sus diferentes indices

    // for (let i = 0; i < top.length; i++){
    //     for (let i2 = 0; i2 < top.length ; i2++){
    //         if (top[i2] <= top[i2 + 1]){
    //             let aux = top[i2 + 1]
    //             top[i2 + 1] = top[i2]
    //             top[i2] = aux
    //         }
    //     }
    // }    definiendo el for de esta manera puedo declarar un i el cual va a estar indexando el array comparando todos los numeros con sus siguientes ordenandolo asi de mayor a menor, este metodo por lo que investigue se llama metodo burbuja

    // ahora recorro el array en busqueda de sus usuarios
    // let usuarios_top = []
    // for (let top_orden of top){

    //     for (let i = 0; i < top.length; i++){ // esto es por si hay usuarios con el mismo saldo repetido
    //         if (saldos[i] === top_orden && usuarios_top.indexOf(usuarios[i]) === -1){ // esto evalua en cada pasada cada posicion del array desordenado con la variable que rrecorre el vector ordenado y se cumple si al mismo tiempo el usuario en la misma posicion no fue agregado en la lista de usuarios ordenados
    //             usuarios_top.push(usuarios[i]) // agrega el usuario faltante
    //         }
    //     }
    // }

    // for (let i = 0; i < top.length; i++){ corre ambos vectores con el i por esto lo declaro de esta menera y no como lo vimos en clase: for (let top_orden of top)
    //     console.log("Top "+(i + 1)+": usuario "+usuarios_top[i]+" con un saldo de: "+top[i])
    // }

}

function baja_usuario (){

    document.querySelectorAll(".ops").forEach(ops => {
        ops.style.display = "none"
    })

    Show_inputs("Baja de usuario")
    document.getElementById("label_saldo").remove();
    document.getElementById("input_saldo").remove(); // borro los inpust que carge por defecto pero para esta funcion no sirven}

    let boton = document.getElementById("boton_send")

    boton.addEventListener("click", () => {
        const nombre = document.getElementById("input_nombre").value


        let indice = Usuarios.findIndex(usuario => usuario.nombre === nombre)
        if (indice !== -1){ // comprueba si el usuario existe

            let contenedor_imput = document.getElementById("imput_container")
            let confirmacion = document.createElement("div")
            confirmacion.innerHTML = `<button class="confirmacion_v" id="confirmar"> Confirmar </button>
                                      <button class="confirmacion_r" id="cancelar"> Cancelar </button>`

            contenedor_imput.append(confirmacion)

            seleccion = confirmacion.querySelectorAll("button")

            seleccion.forEach(ops => {
                ops.onclick = (e) => {
                    if (e.currentTarget.id === "confirmar" ){
                        Usuarios.splice(indice, 1)
                        localStorage.setItem("usuarios", JSON.stringify(Usuarios))
                        console.log("usuario "+nombre+" eliminado")
                        span_alert.textContent = "usuario eliminado correctamente"
                    }
                    else if (e.currentTarget.id === "cancelar"){
                        console.log("operacion cancelada")
                        span_alert.textContent = "operacion cancelada"
                    }

                    confirmacion.remove()
                    document.getElementById("titulo").remove();
                    document.getElementById("label_nombre").remove();
                    document.getElementById("input_nombre").remove();
                    document.getElementById("boton_send").remove();// remuevo manualmente los demas inpust por que si llamo remove_inputs se rompe al ya haber elemento eliminados al principio de la funcion
                    document.querySelectorAll(".ops").forEach(ops => {
                    ops.style.display = "block"
                    })
                    
                }
            })
        }
        else
        {
            console.log("Usuario no encontrado")
            span_alert.textContent = "Usuario no encontrado"
        }
    })

//     let nombre = prompt("ingrese nombre del usuario a dar de baja")
//     if (usuarios.indexOf(nombre) !== -1){ // comprueba si el usuario existe

//         let confirmacion = parseInt(prompt("estas seguro de continuar?, presione 1 para continuar o presione cualquier otra tecla para cancelar"))
        
//         if (confirmacion === 1 ){
//             let indice = usuarios.indexOf(nombre)
//             usuarios.splice(indice, 1)
//             saldos.splice(indice, 1) // elimina el mismo indice en el array saldo que corresponde al mismo usuario
//             console.log("usuario "+nombre+" eliminado")
//         }
//         else{
//             console.log("operacion cancelada")
//         }
        
//     }
//     else
//     {
//         console.log("Usuario no encontrado")
//     }
}


let contenedor_ops = document.getElementById("ops_container")

function render_ops(ops) {
    ops.forEach(element => {
        const boton = document.createElement("div")
        boton.innerHTML = `<button class="ops" id="${element.id}"> ${element.nombre} </button>`

        contenedor_ops.appendChild(boton)
    });
    Ops_seleccion()
}

render_ops(Ops)

function Ops_seleccion() {
    const seleccion = document.querySelectorAll(".ops")
    seleccion.forEach(ops => {
        ops.onclick = (e) => {
            let opcion = parseInt(e.currentTarget.id)

            console.log(opcion)
            span_alert.textContent = ""
            remove_userlist ()

            switch (opcion) {
                case 1:
                    ingreso_usuario()
                    break
                case 2:
                    consultar_saldos()
                    break
                case 3:
                    sumar_saldo()
                    break
                case 4:
                    restar_saldo()
                    break
                case 5:
                    top_saldos()
                    break
                case 6:
                    baja_usuario()
                    break
                default:
                    alert("opcion incorrecta")
                    break
            }
            
        }
    })

}

// let ops = parseInt(prompt("opciones:\nOps 1: Ingresar usuario\nOps 2: Consultar Saldo de usuarios\nOps 3: Sumar saldo a usuario\nOps 4: Restar saldo a usuario\nOps 5: Top mayores saldos\nOps 6: Dar de baja a usuario\n Ops 7: Salir del sistema"))

// while (ops !== 7){
//     switch (ops) {
//         case 1:
//             ingreso_usuario(usuarios_list, saldos_list)
//             break
//         case 2:
//             consultar_saldos(usuarios_list, saldos_list)
//             break
//         case 3:
//             sumar_saldo(usuarios_list, saldos_list)
//             break
//         case 4:
//             restar_saldo(usuarios_list, saldos_list)
//             break
//         case 5:
//             top_saldos(usuarios_list, saldos_list)
//             break
//         case 6:
//             baja_usuario(usuarios_list, saldos_list)
//             break
//         default:
//             alert("opcion incorrecta")
//             break
//     }

//     ops = parseInt(prompt("opciones:\nOps 1: Ingresar usuario\nOps 2: Consultar Saldo de usuarios\nOps 3: Sumar saldo a usuario\nOps 4: Restar saldo a usuario\nOps 5: Top mayores saldos\nOps 6: Dar de baja a usuario\n Ops 7: Salir del sistema"))
// }