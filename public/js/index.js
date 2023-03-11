const socket = io();

let username;

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "Es obligatorio instroducir un nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  username = result.value;
  socket.emit("new-user", username);
});

const chatInput = document.getElementById("chat-input");

chatInput.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    const inputMessage = chatInput.value;
    if (inputMessage.trim().length > 0) {
      socket.emit("chat-message", { username, message: inputMessage });
    }
  }
});

const messageElement = document.getElementById("messages-panel");
socket.on("messages", (data) => {
  let messages = "";

  data.forEach((m) => {
    messages += `<b>${m.username}:</b> ${m.message}</br>`;
  });

  messageElement.innerHTML = messages;
});

socket.on("new-user", (username) => {
  Swal.fire({
    title: `${username} se ha unido al chat`,
    toast: true,
    position: "top-end",
  });
});
