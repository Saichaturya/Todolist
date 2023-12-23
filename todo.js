let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const task = {
    text: taskText,
    addedAt: new Date(),
    completed: false,
    completedAt: null,
  };

  tasks.push(task);
  displayTasks();
  taskInput.value = '';
}

function displayTasks() {
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');

  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.text} (Added: ${formatDate(task.addedAt)})`;

    if (task.completed) {
      li.classList.add('completed');
      li.innerHTML += ` - Completed: ${formatDate(task.completedAt)}`;
      completedTasksList.appendChild(li);
    } else {
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.onclick = () => completeTask(task);
      li.appendChild(completeButton);

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editTask(task);
      li.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTask(task);
      li.appendChild(deleteButton);

      pendingTasksList.appendChild(li);
    }
  });
}

function completeTask(task) {
  task.completed = true;
  task.completedAt = new Date();
  displayTasks();
}

function editTask(task) {
  const newText = prompt('Edit task:', task.text);
  if (newText !== null) {
    task.text = newText.trim();
    displayTasks();
  }
}

function deleteTask(task) {
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  displayTasks();
}

function formatDate(date) {
  return date.toLocaleString();
}

// Initial display
displayTasks();
