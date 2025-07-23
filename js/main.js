let usuarios_list = []
let saldos_list = []
// cree los vectores para usuarios y sus saldos

function ingreso_usuario (usuarios, saldos) {

    let nombre = prompt("ingrese nombre del usuario")
    let saldo = parseInt(prompt("ingrese saldo inicial"))
    if (isNaN(saldo) || saldo === "" || saldo === null || saldo < 0){ // comprueba que el saldo ingresado no sea un valor vacio un caracter o nan
        console.log("saldo ingresado no valido, volver a intentar")
    }
    else
    {
        if (usuarios.indexOf(nombre) === -1){ // comprueba si el usuario no fue ingresado anteriormente
            usuarios.push(nombre)
            saldos.push(saldo)
        }
        else
        {
            console.log("usuario ya existe, volver a intentar")
        } 
    }

}

function consultar_saldos (usuarios, saldos){

    let i = 0

    for (let usuario of usuarios) {

        console.log("El usuario "+usuario+" tiene un saldo de:"+saldos[i])

        i++

    }
}

function sumar_saldo (usuarios, saldos){
    let usuario = prompt("A que usuario decea agregar saldo")

    let find = usuarios.indexOf(usuario)

    if (find !== -1){
        let suma = parseInt(prompt("ingrese cuanto saldo decea sumar"))
        saldos[find] = saldos[find] + suma
        console.log("el saldo fue sumado al usuario: "+usuario+", Su saldo actual es de: "+saldos[find])
    }
    else
    {
        console.log("Usuario no encontrado")
    }


}

function restar_saldo (usuarios, saldos){
    let usuario = prompt("A que usuario decea restar saldo")

    let find = usuarios.indexOf(usuario)

    if (find !== -1){
        let resta = parseInt(prompt("ingrese cuanto saldo decea restar"))
        saldos[find] = saldos[find] - resta
        console.log("el saldo fue restado al usuario: "+usuario+", Su saldo actual es de: "+saldos[find])
    }
    else
    {
        console.log("Usuario no encontrado")
    }


}

function top_saldos (usuarios, saldos){
    let top = [...saldos]

    // procedo a realizar el metodo burbuja para realizar el ordenamiento mayor a menor, aclaro que debo utilizar esta forma de declarar el for ya que necesito iterar una cantidad de veces igual al tamaño del vector top y avaluar en sus diferentes indices

    for (let i = 0; i < top.length; i++){
        for (let i2 = 0; i2 < top.length ; i2++){
            if (top[i2] <= top[i2 + 1]){
                let aux = top[i2 + 1]
                top[i2 + 1] = top[i2]
                top[i2] = aux
            }
        }
    }   // definiendo el for de esta manera puedo declarar un i el cual va a estar indexando el array comparando todos los numeros con sus siguientes ordenandolo asi de mayor a menor, este metodo por lo que investigue se llama metodo burbuja

    // ahora recorro el array en busqueda de sus usuarios
    let usuarios_top = []
    for (let top_orden of top){

        for (let i = 0; i < top.length; i++){ // esto es por si hay usuarios con el mismo saldo repetido
            if (saldos[i] === top_orden && usuarios_top.indexOf(usuarios[i]) === -1){ // esto evalua en cada pasada cada posicion del array desordenado con la variable que rrecorre el vector ordenado y se cumple si al mismo tiempo el usuario en la misma posicion no fue agregado en la lista de usuarios ordenados
                usuarios_top.push(usuarios[i]) // agrega el usuario faltante
            }
        }
    }

    for (let i = 0; i < top.length; i++){ // corre ambos vectores con el i por esto lo declaro de esta menera y no como lo vimos en clase: for (let top_orden of top)
        console.log("Top "+(i + 1)+": usuario "+usuarios_top[i]+" con un saldo de: "+top[i])
    }

}

function baja_usuario (usuarios, saldos){
    let nombre = prompt("ingrese nombre del usuario a dar de baja")
    if (usuarios.indexOf(nombre) !== -1){ // comprueba si el usuario existe

        let confirmacion = parseInt(prompt("estas seguro de continuar?, presione 1 para continuar o presione cualquier otra tecla para cancelar"))
        
        if (confirmacion === 1 ){
            let indice = usuarios.indexOf(nombre)
            usuarios.splice(indice, 1)
            saldos.splice(indice, 1) // elimina el mismo indice en el array saldo que corresponde al mismo usuario
            console.log("usuario "+nombre+" eliminado")
        }
        else{
            console.log("operacion cancelada")
        }
        
    }
    else
    {
        console.log("Usuario no encontrado")
    }
}

let ops = parseInt(prompt("opciones:\nOps 1: Ingresar usuario\nOps 2: Consultar Saldo de usuarios\nOps 3: Sumar saldo a usuario\nOps 4: Restar saldo a usuario\nOps 5: Top mayores saldos\nOps 6: Dar de baja a usuario\n Ops 7: Salir del sistema"))

while (ops !== 7){
    switch (ops) {
        case 1:
            ingreso_usuario(usuarios_list, saldos_list)
            break
        case 2:
            consultar_saldos(usuarios_list, saldos_list)
            break
        case 3:
            sumar_saldo(usuarios_list, saldos_list)
            break
        case 4:
            restar_saldo(usuarios_list, saldos_list)
            break
        case 5:
            top_saldos(usuarios_list, saldos_list)
            break
        case 6:
            baja_usuario(usuarios_list, saldos_list)
            break
        default:
            alert("opcion incorrecta")
            break
    }

    ops = parseInt(prompt("opciones:\nOps 1: Ingresar usuario\nOps 2: Consultar Saldo de usuarios\nOps 3: Sumar saldo a usuario\nOps 4: Restar saldo a usuario\nOps 5: Top mayores saldos\nOps 6: Dar de baja a usuario\n Ops 7: Salir del sistema"))
}