document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addTask');
    const input = document.getElementById('TaskInput');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', () => {
        const taskText = input.value.trim();
        if (taskText !== '') {
            const timestamp = new Date().toLocaleString();
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span class="task-text">${taskText}</span>
                <span class="timestamp">${timestamp}</span>
                <button class="doneButton">Done</button>
                <button class="editButton">Edit</button>
                <button class="statusButton status-pending">Pending</button>
                <button class="removeButton">Remove</button>
            `;
            newTask.classList.add('task-item', 'status-pending');

            const doneButton = newTask.querySelector('.doneButton');
            doneButton.addEventListener('click', () => {
                newTask.classList.toggle('done');
            });

            const editButton = newTask.querySelector('.editButton');
            editButton.addEventListener('click', () => {
                const currentText = newTask.querySelector('.task-text').textContent;
                const newText = prompt('Edit your task:', currentText);
                if (newText !== null && newText.trim() !== '') {
                    newTask.querySelector('.task-text').textContent = newText.trim();
                }
            });

            const statusButton = newTask.querySelector('.statusButton');
            statusButton.addEventListener('click', () => {
                if (statusButton.textContent === 'Pending') {
                    statusButton.textContent = 'In-Progress';
                    newTask.classList.remove('status-pending');
                    newTask.classList.add('status-in-progress');
                    statusButton.classList.remove('status-pending');
                    statusButton.classList.add('status-in-progress');
                } else if (statusButton.textContent === 'In-Progress') {
                    statusButton.textContent = 'Complete';
                    newTask.classList.remove('status-in-progress');
                    newTask.classList.add('status-complete');
                    statusButton.classList.remove('status-in-progress');
                    statusButton.classList.add('status-complete');
                } else {
                    statusButton.textContent = 'Pending';
                    newTask.classList.remove('status-complete');
                    newTask.classList.add('status-pending');
                    statusButton.classList.remove('status-complete');
                    statusButton.classList.add('status-pending');
                }
            });

            const removeButton = newTask.querySelector('.removeButton');
            removeButton.addEventListener('click', () => {
                taskList.removeChild(newTask);
            });

            taskList.appendChild(newTask);
            input.value = '';
        }
    });

    const clearButton = document.getElementById('clearTasks');
    clearButton.addEventListener('click', () => {
        taskList.innerHTML = '';
    });
});