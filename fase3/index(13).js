let miWebSocket 

const miNuevoMensaje = document.getElementById('nuevo-mensaje')
const misRespuestas = document.getElementById('respuestas')
const botonCierre = document.getElementById('cierraConexion')
const botonConecta = document.getElementById('abreConexion')
const conexiones = document.getElementById('conexiones')

const listaURL = ['ws:/localhost:8080','ws:/localhost:8080']

listaURL.map(el => {
            let option = document.createElement('option')
            option.text = el
            conexiones.add(option)
})                    

//Controlamos la conexión a nuestro servidor WebSocket

botonCierre.addEventListener("click" ,() => miWebSocket.close() )
botonConecta.addEventListener("click" ,() => {
    //Volvemos a crear el objeto y volvemos a asignar los eventos al websocket
    miWebSocket = new WebSocket(conexiones.value)
    miWebSocket.addEventListener('open', open);
    miWebSocket.addEventListener('message', message);
    miWebSocket.addEventListener('error', error);
    miWebSocket.addEventListener('close', close);

}
   )

// Funciones
const open = () => {
    // Abre conexión
    console.log("WebSocket abierto.");   
}

const  message = async (evento) => {
    // Se recibe un mensaje
    console.log("WebSocket ha recibido un mensaje");
    // Mostrar mensaje en HTML
    const mensajeRecibido = await evento.data 
    misRespuestas.innerHTML = misRespuestas.innerHTML.concat(mensajeRecibido, '<br>');
}

const  error =  (evento) => {
    // Ha ocurrido un error
    console.error("WebSocket ha observado un error: ", evento);
}

const close =  () =>  {
    // Cierra la conexión
    console.log("WebSocket cerrado.");
}

const enviarNuevoMensaje = (evento) => {
    // Evento tecla Enter
    if(evento.code === 'Enter') {
        // Envia mensaje por WebSockets
        miWebSocket.send(miNuevoMensaje.value);
        // Borra texto en el input
        miNuevoMensaje.value = '';
    }
}

// Evento para envia nuevo mensaje
miNuevoMensaje.addEventListener('keypress', enviarNuevoMensaje);
