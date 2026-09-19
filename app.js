const STORAGE_KEY = 'todo-list-items';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const pendingCount = document.getElementById('pending-count');

// 讀取 localStorage 中的待辦資料；若資料格式不正確，回退成空陣列。
let todos = loadTodos();

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];

    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('儲存待辦資料失敗:', error);
  }
}

function updatePendingCount() {
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  pendingCount.textContent = remainingCount;
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.hidden = false;
    updatePendingCount();
    return;
  }

  emptyState.hidden = true;

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `完成 ${todo.text}`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除 ${todo.text}`);

    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id);
    });

    deleteButton.addEventListener('click', () => {
      removeTodo(todo.id);
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  });

  updatePendingCount();
}

function addTodo(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  todos.unshift({
    id: Date.now(),
    text: trimmedText,
    completed: false,
  });

  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  saveTodos();
  renderTodos();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

// 提交表單時，避免新增空白內容，並保留輸入框焦點方便連續新增。
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = todoInput.value;
  addTodo(value);
  todoInput.value = '';
  todoInput.focus();
});

renderTodos();
