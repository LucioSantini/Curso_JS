const url = '../db/data.json'

async function carga_usuarios() {
return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error en respuesta: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    return data.usuarios;
  })
  .catch(error => {
    console.error("Hubo un problema:", error);
  });
}

carga_usuarios().then(usuarios =>{
    let boton = document.getElementById("Ingresar")

    boton.addEventListener("click", (e) =>{

        e.preventDefault();

        const nombre = document.getElementById("nombre").value
        const contraseña = document.getElementById("contraseña").value
        const span  = document.getElementById("span_form")

        if(usuarios.find(usuario => usuario.nombre === nombre) === undefined){
            span.textContent = "Usuario no existe"
        }
        else{
            let find = usuarios.find(usuario => usuario.nombre === nombre)
            if(find.password === contraseña){
                sessionStorage.setItem("session_activa",JSON.stringify(usuarios.find(usuario => usuario.nombre === nombre)))
                window.location.href = "../index.html";
            }
            else{
                span.textContent = "Contraseña incorrecta"
            }
        }
    })
})
