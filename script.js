const inputEl = document.getElementById('example')
const btnEl =document.querySelector('.todolistbutton')
const fieldEl = document.querySelector('.todolistfield')
const btnInput = document.querySelector(".todolistinput")
const todolist = []

let id = 1

function render() {
    fieldEl.innerHTML= ''
    for (let item of todolist) {
        const el = createhtmlelement(item)
        fieldEl.appendChild(el)
    }
}

function createhtmlelement(item) { 
         
        const divEl = document.createElement('div')
        divEl.classList.add('todolistitem')
    
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox' 
        if (item.isDone) {
            checkbox.checked = true 
            divEl.classList.add('todolistitemdone')
        }
    
        const text = document.createElement('p')
        text.classList.add('todolistitemtext')
        text.innerText = item.text 
    
        const img = document.createElement('img')
        img.src ='/images/del.png'
        img.classList.add('del')

        img.addEventListener('click',() => {
            removeitem(item.id)
        })
    
        divEl.appendChild(checkbox)
        divEl.appendChild(text)
        divEl.appendChild(img)
    
    checkbox.addEventListener('change', () => {
        updateItem(item.id)
    })
    return divEl
}

function updateItem(id) {
    const item = todolist.find((i) => i.id === id)
    item.isDone = !item.isDone
    render() 
}

function removeitem(id) {
    const idx = todolist.findIndex((i)=> i.id === id)
    todolist.splice(idx, 1)
    render()
}

function additem() {
    if (inputEl.value) {
        const obj = {
            text: inputEl.value,
            isDone: false,
            id: id++
        }
        todolist.push(obj)
        inputEl.value=''
        render()    
    }
}

btnEl.addEventListener('click', additem)
btnInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' ) additem()
})

render()