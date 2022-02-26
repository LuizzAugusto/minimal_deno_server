const helloWorldElement = document.createElement("h2")
const errorMessageElement = document.createElement("h4")
helloWorldElement.innerHTML = "Hello World!"
errorMessageElement.innerHTML = "Error test message"
errorMessageElement.className = "text-color-red"
document.body.appendChild(helloWorldElement)
document.body.appendChild(errorMessageElement)