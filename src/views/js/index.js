const socket = io();

const circle = document.querySelector("#circle");

const drawCircle = position => {
    circle.style.top = position.top;
    circle.style.left = position.left;
}

const drag = e => {

    const position =  {
        top: e.clientY + "px",
        left: e.clientX + "px"
    };

    drawCircle(position);
    socket.emit("circle position", position);

}

document.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", drag)
});

document.addEventListener("mouseup", e => {
    document.removeEventListener("mousemove", drag);
});

socket.on("move circle", position => {
    drawCircle(position);
});