import { onDameDocs } from "./fireBase.js";

let miWebSocket;

const miNuevoMensaje = document.getElementById("nuevo-mensaje");
const misRespuestas = document.getElementById("respuestas");
const botonAbrir = document.getElementById("abrirWs");
const botonCerrar = document.getElementById("cerrarWs");
const conexiones = document.getElementById("listaUrl");
const mostrarNuevos = document.getElementById("mostrarNuevos");
const nuevos = document.getElementById("nuevos");

//con axios
/*
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const respuesta = await axios.get(`http://localhost:3000/servidores`);
    respuesta.data.map((el) => {
      let option = document.createElement("option");
      option.text = el.url;
      conexiones.add(option);
    });
  } catch (e) {
    console.log(e);
  }
});
*/

//con firebase

window.addEventListener("DOMContentLoaded", async () => {
  await onDameDocs("URLS", (docs) => {
    docs.forEach((e) => {
      const { URL } = e.data();
      console.log(URL);
      const id = e.id;
      let option = document.createElement("option");
      option.text = URL;
      conexiones.add(option);
    });
  });
});

//Controlamos la conexión a nuestro servidor WebSocket

botonCerrar.addEventListener("click", () => miWebSocket.close());

botonAbrir.addEventListener("click", () => {
  //Volvemos a crear el objeto y volvemos a asignar los eventos al websocket
  miWebSocket = new WebSocket(conexiones.value);
  miWebSocket.addEventListener("open", open);
  miWebSocket.addEventListener("message", message);
  miWebSocket.addEventListener("error", error);
  miWebSocket.addEventListener("close", close);
});
// Funciones
const open = () => {
  // Abre conexión
  console.log("WebSocket abierto.");
};

let lista = [];

const message = async (evento) => {
  // Se recibe un mensaje
  console.log("WebSocket ha recibido un mensaje");
  // Mostrar mensaje en HTML
  const mensajeRecibido = await evento.data;
  lista.push(mensajeRecibido);
  nuevos.innerHTML = "Tienes mensajes nuevos";

  mostrarNuevos.addEventListener("click", () => {
    nuevos.innerHTML = "";
    lista.map((x) => {
      misRespuestas.innerHTML += x.concat("<br>");
    });
    lista = [];
  });
};

const error = (evento) => {
  // Ha ocurrido un error
  console.error("WebSocket ha observado un error: ", evento);
};

const close = () => {
  // Cierra la conexión
  console.log("WebSocket cerrado.");
};

const enviarNuevoMensaje = (evento) => {
  // Evento tecla Enter
  if (evento.code === "Enter") {
    // Envia mensaje por WebSockets
    miWebSocket.send(miNuevoMensaje.value);
    // Borra texto en el input
    miNuevoMensaje.value = "";
  }
};

// Evento para envia nuevo mensaje
miNuevoMensaje.addEventListener("keypress", enviarNuevoMensaje);
