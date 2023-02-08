// Importaciones
//Instalamos la versión 7.5.0 de ws npm i ws@7.5.0 
//Para evitar los errores de <Buffer xxxx>
const WebSocket = require('ws');
const http = require('http');

// Creamos una instacia del servidor HTTP (Web)
const server = http.createServer();
// Creamos y levantamos un servidor de WebSockets a partir del servidor HTTP
const wss = new WebSocket.Server({ server });

// Escuchamos los eventos de conexión
wss.on('connection', (ws) => {

    // Escuchamos los mensajes entrantes
    ws.on('message', (data) => {
        console.log('Se ha enviado %s', data)
        // Iteramos todos los clientes que se encuentren conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                // Enviamos la información recibida
                client.send(data);
            }
        });

    });
  
});

// Levantamos servidor HTTP
server.listen(8080);
console.log('Servidor funcionando. Utiliza ws://localhost:8080 para conectar.')





