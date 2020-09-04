# Algoritmos-De-Ruteo

## Requisitos

* Node JS: versión 10 o superior

## Instalación previa

1. Clonar este repositorio
2. Dentro del directorio, correr el comando `npm install`

## Ejecución del server

El servidor se debe correr con el comando `npm run server` para iniciar un URL con WebSocket local en el puerto **4200**. Se puede especificar el puerto adjuntándolo en la línea de comando de la siguiente forma: `npm run server [puerto]`.

Una vez levantado el servidor, se debe especificar el algoritmo a utilizar para luego poder conectar los nodos.

## Ejecución de un nodo

El nodo se debe correr con el comando `npm run client` para establecer una conexión con el servidor en el puerto **4200**. Si se posee un server con un URL específico, se puede adjuntar en la línea de comando de la siguiente forma: `npm run client [URL]:[port]`

Luego, se debe escoger el nombre de un nodo de la A - I, sin repetirse, para levantar una conexión como cliente. 

### ¿Cómo se envía un mensaje?

Una vez conectados los 9 nodos (de la A a la I), se podrá escribir en la terminal. En ella, se debe usar la siguiente estructura para enviar un mensaje entre nodos:

- Mensaje personalizado > nodo

Ejemplo:

- Este es un mensaje de prueba > F

Enviará *Este es un mensaje de prueba* desde el nodo que está activo, hasta el nodo F usando el algoritmo seleccionado al inicio

## Desarrolladores

* Oscar Juárez
* José Cifuentes
* Raúl Monzón

Universidad del Valle de Guatemala - 2020