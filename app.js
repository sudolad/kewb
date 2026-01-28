// App State
const appState = {
    currentPage: 'wiki',
    currentTaskTab: 'todo',
    theme: 'light',
    tasks: {
        todo: [
            { id: 1, text: 'Practice 3-4 PLL cases daily', completed: false },
            { id: 2, text: 'Work on finger tricks', completed: false },
            { id: 3, text: 'Fix bad habits from Moshla', completed: false }
        ],
        completed: [
            { id: 4, text: 'Setup practice schedule', completed: true }
        ]
    },
    
    // Your speedcubing playlists
    playlists: [
        {
            id: 1,
            title: "BASICS - PLL Algorithms",
            description: "Complete PLL tutorial for beginners. Master all 21 algorithms.",
            videoCount: 21,
            lastUpdated: "Updated regularly",
            url: "https://youtube.com/playlist?list=PLgHX69tbRHcdIVzt10cdVyMx3W7XkPPv4&si=xyWxW5WtFqRh1gB7",
            icon: "fas fa-play-circle",
            color: "basics"
        },
        {
            id: 2,
            title: "MOSHLA - Intermediate Tips",
            description: "Fix bad habits and improve your technique. Path to sub-30.",
            videoCount: 15,
            lastUpdated: "Essential viewing",
            url: "https://youtube.com/playlist?list=PLgHX69tbRHcfeSRLPdme3mhpMOCTioSjm&si=iux7mfmX-EtggK67",
            icon: "fas fa-graduation-cap",
            color: "moshla"
        },
        {
            id: 3,
            title: "ADVANCED (In Progress)",
            description: "Advanced techniques and algorithms. Coming soon!",
            videoCount: 0,
            lastUpdated: "Coming soon",
            url: "#",
            icon: "fas fa-rocket",
            color: "advanced"
        }
    ]
};

// DOM Elements
const elements = {
    mainContent: document.getElementById('main-content'),
    pageTitle: document.getElementById('page-title'),
    themeToggle: document.getElementById('theme-toggle'),
    mainTabs: document.querySelectorAll('.main-tab'),
    taskModal: document.getElementById('task-modal'),
    newTaskInput: document.getElementById('new-task-input'),
    cancelTaskBtn: document.getElementById('cancel-task'),
    saveTaskBtn: document.getElementById('save-task'),
    addTaskBtn: null
};

// Initialize App
function initApp() {
    loadPreferences();
    renderPage();
    setupEventListeners();
}

// Load saved preferences
function loadPreferences() {
    const savedTheme = localStorage.getItem('kewb-theme');
    const savedTasks = localStorage.getItem('kewb-tasks');
    
    if (savedTheme) appState.theme = savedTheme;
    if (savedTasks) appState.tasks = JSON.parse(savedTasks);
    
    document.documentElement.setAttribute('data-theme', appState.theme);
    updateThemeIcon();
}

// Save preferences
function savePreferences() {
    localStorage.setItem('kewb-theme', appState.theme);
    localStorage.setItem('kewb-tasks', JSON.stringify(appState.tasks));
}

// Update theme icon
function updateThemeIcon() {
    const icon = elements.themeToggle.querySelector('i');
    icon.className = appState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Render current page
function renderPage() {
    elements.mainContent.innerHTML = '';
    
    switch(appState.currentPage) {
        case 'wiki':
            renderWikiPage();
            break;
        case 'tasks':
            renderTasksPage();
            break;
        case 'playlists':
            renderPlaylistsPage();
            break;
        case 'settings':
            renderSettingsPage();
            break;
    }
    
    updateActiveTab();
    updatePageTitle();
}

// Render Wiki Page (Non-editable article)
function renderWikiPage() {
    const wikiHTML = `
        <article class="wiki-article">
            <header class="article-header">
                <h1>Speedcubing Mastery Guide</h1>
                <p class="subtitle">Your complete roadmap from beginner to advanced solver</p>
            </header>

            <!-- BASICS Section -->
            <section class="section basics">
                <div class="section-header">
                    <span class="emoji">🟡</span>
                    <h2>BASICS</h2>
                </div>
                <div class="section-content">
                    <a href="https://youtube.com/playlist?list=PLgHX69tbRHcdIVzt10cdVyMx3W7XkPPv4&si=xyWxW5WtFqRh1gB7" 
                       class="playlist-link" target="_blank">
                        <i class="fab fa-youtube"></i>
                        PLL Algorithms Playlist
                    </a>
                    
                    <h3>How to Practice:</h3>
                    <ul class="tips-list">
                        <li><strong>3 to 4 cases/algs a day</strong> - Consistent daily practice is key</li>
                        <li><strong>Learn recognition first</strong> - Identify the case before solving</li>
                        <li><strong>Muscle memory pore</strong> - Repeat until it becomes automatic 👍</li>
                        <li><strong>Finger tricks slowly</strong> - Start slow, speed comes naturally (video coming in next course 🙈)</li>
                    </ul>
                    
                    <div class="practice-plan">
                        <h4>📅 Practice Schedule:</h4>
                        <ul>
                            <li>Finish this playlist in 2+ weeks</li>
                            <li>Master recognition and execution</li>
                            <li>Only then move to next level</li>
                            <li>Applicable for all algorithms</li>
                        </ul>
                    </div>
                    
                    <div class="note">
                        <strong>Pro Tip:</strong> Consider learning PLL first because OLL has 57 algorithms 😅
                    </div>
                </div>
            </section>

            <!-- MOSHLA Section -->
            <section class="section moshla">
                <div class="section-header">
                    <span class="emoji">🔵</span>
                    <h2>MOSHLA</h2>
                </div>
                <div class="section-content">
                    <a href="https://youtube.com/playlist?list=PLgHX69tbRHcfeSRLPdme3mhpMOCTioSjm&si=iux7mfmX-EtggK67" 
                       class="playlist-link" target="_blank">
                        <i class="fab fa-youtube"></i>
                        Intermediate Tips Playlist
                    </a>
                    
                    <h3>Essential Tips:</h3>
                    <ul class="tips-list">
                        <li><strong>Fix bad habits</strong> - Identify and correct them early</li>
                        <li><strong>Follow video instructions</strong> - Learn proper techniques</li>
                        <li><strong>Build muscle memory slowly</strong> - Quality over speed initially</li>
                        <li><strong>Aim for sub-30</strong> - Welcome to the club! &lt;3</li>
                    </ul>
                    
                    <div class="warning">
                        <strong>Important:</strong> Don't rush through this section. Proper technique prevents future plateaus.
                    </div>
                </div>
            </section>

            <!-- ADVANCED Section -->
            <section class="section advanced">
                <div class="section-header">
                    <span class="emoji">🔴</span>
                    <h2>ADVANCED (Coming Soon)</h2>
                </div>
                <div class="section-content">
                    <div class="note">
                        <p>Advanced techniques, algorithms, and optimization strategies are currently in development.</p>
                        <p>Master the Basics and Moshla sections first before moving to Advanced techniques.</p>
                    </div>
                    
                    <h3>What to Expect:</h3>
                    <ul class="tips-list">
                        <li>Advanced lookahead techniques</li>
                        <li>Optimized finger tricks for speed</li>
                        <li>Competition strategies</li>
                        <li>Custom algorithm sets</li>
                    </ul>
                </div>
            </section>
            
            <div class="practice-plan">
                <h4>🎯 Overall Strategy:</h4>
                <p>1. <strong>Basics</strong> → 2. <strong>Moshla</strong> → 3. <strong>Advanced</strong></p>
                <p>Don't skip steps. Each level builds on the previous one. Consistency beats intensity!</p>
            </div>
        </article>
    `;
    
    elements.mainContent.innerHTML = wikiHTML;
}

// Render Tasks Page
function renderTasksPage() {
    const tasksHTML = `
        <div class="tasks-container">
            <div class="tab-buttons">
                <button class="tab-button ${appState.currentTaskTab === 'todo' ? 'active' : ''}" 
                        data-tab="todo">To Practice (${appState.tasks.todo.length})</button>
                <button class="tab-button ${appState.currentTaskTab === 'completed' ? 'active' : ''}" 
                        data-tab="completed">Completed (${appState.tasks.completed.length})</button>
            </div>
            
            <div class="tab-content ${appState.currentTaskTab === 'todo' ? 'active' : ''}" id="todo-tab">
                <ul class="task-list" id="todo-list">
                    ${renderTaskList('todo')}
                </ul>
            </div>
            
            <div class="tab-content ${appState.currentTaskTab === 'completed' ? 'active' : ''}" id="completed-tab">
                <ul class="task-list" id="completed-list">
                    ${renderTaskList('completed')}
                </ul>
            </div>
            
            <button class="add-task-btn" id="open-task-modal">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
    
    elements.mainContent.innerHTML = tasksHTML;
    elements.addTaskBtn = document.getElementById('open-task-modal');
    
    setupTaskEvents();
}

// Render Playlists Page
function renderPlaylistsPage() {
    const playlistsHTML = `
        <div class="playlists-container">
            ${appState.playlists.map(playlist => `
                <div class="playlist-card ${playlist.color}" data-id="${playlist.id}" data-url="${playlist.url}">
                    <div class="playlist-thumbnail" style="background: var(--${playlist.color});">
                        <i class="${playlist.icon}"></i>
                    </div>
                    <div class="playlist-info">
                        <h3>${playlist.title}</h3>
                        <p>${playlist.description}</p>
                        <div class="playlist-stats">
                            <span><i class="fas fa-video"></i> ${playlist.videoCount} videos</span>
                            <span><i class="fas fa-clock"></i> ${playlist.lastUpdated}</span>
                        </div>
                        <button class="playlist-button" onclick="window.open('${playlist.url}', '_blank')" 
                                ${playlist.url === '#' ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                            <i class="fab fa-youtube"></i> ${playlist.url === '#' ? 'Coming Soon' : 'Watch Playlist'}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    elements.mainContent.innerHTML = playlistsHTML;
    
    setupPlaylistEvents();
}

// Render Settings Page
function renderSettingsPage() {
    const settingsHTML = `
        <div class="settings-container">
            <section class="setting-section">
                <h2>Theme</h2>
                <div class="theme-options">
                    <div class="theme-option ${appState.theme === 'light' ? 'active' : ''}" data-theme="light">
                        <i class="fas fa-sun"></i>
                        Light
                    </div>
                    <div class="theme-option ${appState.theme === 'dark' ? 'active' : ''}" data-theme="dark">
                        <i class="fas fa-moon"></i>
                        Dark
                    </div>
                    <div class="theme-option ${appState.theme === 'auto' ? 'active' : ''}" data-theme="auto">
                        <i class="fas fa-adjust"></i>
                        Auto
                    </div>
                </div>
            </section>
            
            <section class="setting-section">
                <h2>Practice Data</h2>
                <p><strong>Current Stats:</strong></p>
                <p>• To Practice: ${appState.tasks.todo.length} goals</p>
                <p>• Completed: ${appState.tasks.completed.length} goals</p>
                <p>All practice data is saved locally in your browser.</p>
                <button class="btn secondary" id="clear-data">Clear Practice Data</button>
            </section>
            
            <section class="setting-section">
                <h2>About This Guide</h2>
                <p>Speedcubing Mastery v1.0</p>
                <p>Designed for systematic cubing improvement</p>
                <p>Follow the roadmap → Practice consistently → See results!</p>
            </section>
        </div>
    `;
    
    elements.mainContent.innerHTML = settingsHTML;
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    document.getElementById('clear-data').addEventListener('click', clearAllData);
}

// Render task list
function renderTaskList(type) {
    return appState.tasks[type].map(task => `
        <li class="task-item" data-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-task" aria-label="Delete task">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');
}

// Update active tab
function updateActiveTab() {
    elements.mainTabs.forEach(button => {
        if (button.dataset.page === appState.currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Update page title
function updatePageTitle() {
    const titles = {
        wiki: 'Speedcubing Guide',
        tasks: 'Practice Goals',
        playlists: 'YouTube Playlists',
        settings: 'Settings'
    };
    elements.pageTitle.textContent = titles[appState.currentPage];
}

// Setup event listeners
function setupEventListeners() {
    // Main Tabs
    elements.mainTabs.forEach(button => {
        button.addEventListener('click', () => {
            appState.currentPage = button.dataset.page;
            renderPage();
        });
    });
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Task modal
    elements.cancelTaskBtn.addEventListener('click', () => {
        elements.taskModal.style.display = 'none';
        elements.newTaskInput.value = '';
    });
    
    elements.saveTaskBtn.addEventListener('click', addNewTask);
    
    window.addEventListener('click', (e) => {
        if (e.target === elements.taskModal) {
            elements.taskModal.style.display = 'none';
            elements.newTaskInput.value = '';
        }
    });
    
    elements.newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
}

// Setup task events
function setupTaskEvents() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            appState.currentTaskTab = button.dataset.tab;
            renderPage();
        });
    });
    
    elements.addTaskBtn.addEventListener('click', () => {
        elements.taskModal.style.display = 'flex';
        elements.newTaskInput.focus();
    });
    
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTaskCompletion);
    });
    
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

// Setup playlist events
function setupPlaylistEvents() {
    document.querySelectorAll('.playlist-card:not(.advanced)').forEach(card => {
        if (card.dataset.url !== '#') {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.playlist-button')) {
                    window.open(card.dataset.url, '_blank');
                }
            });
        }
    });
}

// Task functions
function addNewTask() {
    const text = elements.newTaskInput.value.trim();
    if (!text) return;
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    appState.tasks.todo.push(newTask);
    savePreferences();
    
    elements.taskModal.style.display = 'none';
    elements.newTaskInput.value = '';
    
    if (appState.currentPage === 'tasks') {
        renderPage();
    }
}

function toggleTaskCompletion(e) {
    const taskItem = e.target.closest('.task-item');
    const taskId = parseInt(taskItem.dataset.id);
    const isCompleted = e.target.checked;
    
    let sourceList, targetList;
    
    if (isCompleted) {
        sourceList = 'todo';
        targetList = 'completed';
    } else {
        sourceList = 'completed';
        targetList = 'todo';
    }
    
    const taskIndex = appState.tasks[sourceList].findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const task = appState.tasks[sourceList][taskIndex];
        task.completed = isCompleted;
        
        appState.tasks[sourceList].splice(taskIndex, 1);
        appState.tasks[targetList].push(task);
        
        savePreferences();
        renderPage();
    }
}

function deleteTask(e) {
    const taskItem = e.target.closest('.task-item');
    const taskId = parseInt(taskItem.dataset.id);
    
    ['todo', 'completed'].forEach(list => {
        const index = appState.tasks[list].findIndex(t => t.id === taskId);
        if (index !== -1) {
            appState.tasks[list].splice(index, 1);
        }
    });
    
    savePreferences();
    renderPage();
}

// Theme functions
function toggleTheme() {
    const newTheme = appState.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    appState.theme = theme;
    
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('kewb-theme', theme);
    updateThemeIcon();
}

// Clear all data
function clearAllData() {
    if (confirm('Clear all practice goals? This cannot be undone.')) {
        appState.tasks = {
            todo: [
                { id: 1, text: 'Practice 3-4 PLL cases daily', completed: false },
                { id: 2, text: 'Work on finger tricks', completed: false },
                { id: 3, text: 'Fix bad habits from Moshla', completed: false }
            ],
            completed: [
                { id: 4, text: 'Setup practice schedule', completed: true }
            ]
        };
        
        savePreferences();
        renderPage();
        alert('Practice data cleared! Default goals restored.');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initApp);