let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
    const input = document.getElementById("habitInput");
    const habitText = input.value.trim();

    if (habitText === "") return;

    const habit = {
        id: Date.now(),
        text: habitText,
        completed: false,
        streak: 0
    };

    habits.push(habit);
    saveHabits();
    input.value = "";
    renderHabits();
}

function toggleHabit(id) {
    habits = habits.map(habit => {
        if (habit.id === id) {
            habit.completed = !habit.completed;
            habit.streak = habit.completed ? habit.streak + 1 : habit.streak;
        }
        return habit;
    });

    saveHabits();
    renderHabits();
}

function deleteHabit(id) {
    habits = habits.filter(habit => habit.id !== id);
    saveHabits();
    renderHabits();
}

function renderHabits() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach(habit => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div onclick="toggleHabit(${habit.id})" style="cursor:pointer;">
                <strong class="${habit.completed ? 'completed' : ''}">
                    ${habit.text}
                </strong>
                <div class="streak">🔥 Streak: ${habit.streak}</div>
            </div>
            <button onclick="deleteHabit(${habit.id})">X</button>
        `;

        list.appendChild(li);
    });
}

renderHabits();