// get the draggable elements
const draggables = document.querySelectorAll(".draggable-item");

// get the containers
const containers = document.querySelectorAll(".container");

// setup the event listeners

// for draggables
draggables.forEach(draggable => {
  // fires when we start a drag, won't fire again until a new drag is begun
  draggable.addEventListener("dragstart", () => {
    // console.log("dragging started");
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    // console.log("dragging eneded");
    draggable.classList.remove("dragging");
  });
});

// for containers
containers.forEach(container => {
  container.addEventListener("dragover", () => {
    console.log("dragging over container");

    // if it has the dragging class, we're currently manipulating it - add it to the container it intersects
    const draggable = document.querySelector(".dragging");
    container.appendChild(draggable);
  });
});
