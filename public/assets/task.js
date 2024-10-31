const taskList = document.getElementById("taskList");
let draggedTask = null;

taskList.addEventListener("dragstart", (e) => {
  draggedTask = e.target;
  e.target.classList.add("dragging");
});

taskList.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  draggedTask = null;
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(taskList, e.clientY);
  if (afterElement == null) {
    taskList.appendChild(draggedTask);
  } else {
    taskList.insertBefore(draggedTask, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
