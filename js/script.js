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
  //   console.log(container.children[0]);
  container.addEventListener("dragover", e => {
    // console.log("dragging over container");
    e.preventDefault(); // by default, dropping inside of an element is disabled

    // if it has the dragging class, we're currently manipulating it - add it to the container it intersects
    const draggable = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(container, e.clientY);

    console.log(afterElement);

    // if we're below everything, place it at the end. If we're above an element, drag it into place above THAT element
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

// determine mouse position of draggable, return element that we're placing before, after or between
function getDragAfterElement(container, y) {
  // ignore the element in container that we're actually draggin
  const draggableEls = [
    ...container.querySelectorAll(".draggable-item:not(.dragging)")
  ];

  return draggableEls.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      //   console.log(box);
      const offset = y - box.top - box.height / 2;
      console.log(offset);

      //   neg offset is above the element, positive is below that element
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }

      // offset = offset between cursor, element before, element after - start at an impossibly high distance so that every possible element is closer to our cursor than our start value
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
