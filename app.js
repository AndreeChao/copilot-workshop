const STORAGE_KEY = 'todo-list-items';
const THEME_KEY = 'todo-theme';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const pendingCount = document.getElementById('pending-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-btn');

// 讀取 localStorage 中的待辦資料；若資料格式不正確，回退成空陣列。
let todos = loadTodos();
let currentFilter = 'all';

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

function getDefaultTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (error) {
    // 若 localStorage 無法存取，就直接依照系統設定。
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  document.body.style.colorScheme = theme === 'dark' ? 'dark' : 'light';

  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-label', isDark ? '切換到淺色模式' : '切換到深色模式');
}

function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('儲存主題設定失敗:', error);
  }

  applyTheme(theme);
}

function updatePendingCount() {
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  pendingCount.textContent = remainingCount;
}

function getEmptyMessage() {
  if (todos.length === 0) {
    return '還沒有任何待辦事項,新增一個吧!';
  }

  if (currentFilter === 'active') {
    return '目前沒有未完成的待辦事項';
  }

  if (currentFilter === 'completed') {
    return '目前沒有已完成的待辦事項';
  }

  return '沒有符合條件的待辦事項';
}

function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function renderTodos() {
  const visibleTodos = getVisibleTodos();
  todoList.innerHTML = '';

  if (visibleTodos.length === 0) {
    emptyState.textContent = getEmptyMessage();
    emptyState.hidden = false;
    updatePendingCount();
    updateFilterButtons();
    return;
  }

  emptyState.hidden = true;

  visibleTodos.forEach((todo) => {
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
  updateFilterButtons();
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
  });
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

// 切換主題時，將使用者選擇存進 localStorage，重新整理後仍維持設定。
themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

applyTheme(getDefaultTheme());
renderTodos();
