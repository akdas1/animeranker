const listContainer = document.getElementById('list-container');
let draggedItem = null;

listContainer.addEventListener('dragstart', dragStart);
listContainer.addEventListener('dragover', dragOver);
listContainer.addEventListener('drop', drop);
listContainer.addEventListener('touchstart', touchStart);
listContainer.addEventListener('touchmove', touchMove);
listContainer.addEventListener('touchend', touchEnd);

function dragStart(event) {
    draggedItem = event.target.closest('.list-item');
    event.dataTransfer.setData('text/plain', event.target.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const targetItem = event.target.closest('.list-item');
    if (targetItem) {
        const targetIndex = Array.from(listContainer.children).indexOf(targetItem);
        const draggedIndex = Array.from(listContainer.children).indexOf(draggedItem);
        if (targetIndex === 0) {
            listContainer.insertBefore(draggedItem, targetItem);
        } else {
            targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        }
        updateNumbers();
    }
    draggedItem = null;
}

function touchStart(event) {
    draggedItem = event.target.closest('.list-item');
    const touch = event.touches[0];
    const offsetX = touch.clientX - draggedItem.getBoundingClientRect().left;
    const offsetY = touch.clientY - draggedItem.getBoundingClientRect().top;
    draggedItem.dataset.offsetX = offsetX;
    draggedItem.dataset.offsetY = offsetY;
}

function touchMove(event) {
    if (!draggedItem) return;
    event.preventDefault();
    const touch = event.touches[0];
    draggedItem.style.position = 'fixed';
    draggedItem.style.left = touch.clientX - draggedItem.dataset.offsetX + 'px';
    draggedItem.style.top = touch.clientY - draggedItem.dataset.offsetY + 'px';
}

function touchEnd(event) {
    if (!draggedItem) return;
    const targetItem = document.elementFromPoint(
        draggedItem.getBoundingClientRect().left + draggedItem.offsetWidth / 2,
        draggedItem.getBoundingClientRect().top + draggedItem.offsetHeight / 2
    );
    const targetContainer = targetItem.closest('#list-container');
    if (targetContainer) {
        const targetIndex = Array.from(listContainer.children).indexOf(targetItem.closest('.list-item'));
        const draggedIndex = Array.from(listContainer.children).indexOf(draggedItem);
        if (targetIndex === 0) {
            listContainer.insertBefore(draggedItem, targetItem);
        } else {
            targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        }
        updateNumbers();
    }
    draggedItem.style.position = '';
    draggedItem.style.left = '';
    draggedItem.style.top = '';
    draggedItem = null;
}

// Function to update numbers
function updateNumbers() {
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((item, index) => {
        item.querySelector('.number').textContent = (index + 1) + '.';
    });
}

