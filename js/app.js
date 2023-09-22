const todoAdd = document.querySelector(".todo__todo-add")
const todoList = document.querySelector(".todo__todo-list")
const options = document.querySelector(".todo__todo-options")

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
    }
    makeStructure(event, localStorage.getItem(key))
}

function makeStructure(event, text = '') {
    let todoText = document.querySelector(".todo__todo-text")
    if (text != '') {
        todoText.value = text
    }
    let todoText2 = todoText.value

    if (todoText.value == '') return

    let newTodo = document.createElement("div")
    let newTodoWrapper = document.createElement("div")
    let newTodoCheckbox = document.createElement("input")
    let newTodoText = document.createElement("div")

    newTodo.classList.add("example")
    newTodoWrapper.classList.add("example__checkable-wrapper")
    newTodoCheckbox.type = "checkbox"
    newTodoCheckbox.classList.add("example__checkable")
    newTodoText.innerHTML = todoText.value
    newTodoText.classList.add("example__text")

    todoList.append(newTodo)

    newTodo.append(newTodoWrapper)
    newTodoWrapper.append(newTodoCheckbox)
    newTodo.append(newTodoText)
    todoText.value = ''

    save(todoText2, newTodo)
}

function save(todo, newTodo) {
    let count = document.querySelectorAll(".example").length
    newTodo.setAttribute("data-number", count)
    localStorage.setItem("todo:" + newTodo.getAttribute("data-number"), todo)
}

function checkboxDone(el) {
    if (!el.parentNode.parentNode.classList.contains("done")) {
        el.parentNode.parentNode.classList.add("done")
    } else {
        el.parentNode.parentNode.classList.remove("done")
    }
}

function clearAll() {
    document.querySelectorAll(".example").forEach(el => el.remove())
    localStorage.clear()
}

function clearFinished() {
    document.querySelectorAll(".example.done").forEach((el) => {
        el.remove()
        localStorage.removeItem('todo:' + el.getAttribute('data-number'))
    })
}

todoAdd.addEventListener("click", () => {
    makeStructure()
})

options.addEventListener("click", (e) => {
    let target = e.target

    if (target.getAttribute("action") == 'clear-all') {
        clearAll()
    } else {
        clearFinished()
    }
})

todoList.addEventListener("click", (e) => {
    let elem = e.target

    if (elem.tagName != 'INPUT') return

    checkboxDone(elem)
})
