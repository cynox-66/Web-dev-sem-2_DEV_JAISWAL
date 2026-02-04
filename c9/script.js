let logContainer = document.querySelector("#log")
let lis = []

function addLog(message) {
    lis.push(message)

    let entry = document.createElement("p")
    entry.textContent = message
    logContainer.appendChild(entry)
}

let gpc = document.querySelector("#Grandparent")
gpc.addEventListener("click", () => {
    gpc.style.backgroundColor = "lightgreen"
    addLog("Grandparent clicked - Capturing")
}, true)

let gpb = document.querySelector("#Grandparent")
gpb.addEventListener("click", () => {
    gpb.style.backgroundColor = "lightgreen"
    addLog("Grandparent clicked - Bubbling")
}, false)

let pc = document.querySelector("#parent")
pc.addEventListener("click", () => {
    pc.style.backgroundColor = "lightblue"
    addLog("Parent clicked - Capturing")
}, true)

let pb = document.querySelector("#parent")
pb.addEventListener("click", () => {
    pb.style.backgroundColor = "lightblue"
    addLog("Parent clicked - Bubbling")
}, false)

let c = document.querySelector("#child")
c.addEventListener("click", () => {
    c.style.backgroundColor = "lightpink"
    addLog("Child clicked")
}, false)