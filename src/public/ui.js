import {saveNotes, deleteNote,getNoteById, updateNote} from './socket.js';

const notesList = document.querySelector("#notes")
const title = document.querySelector('#title')
const description = document.querySelector('#description')

let savedId = ""

const noteUI = (note) =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card card-body rounded-1 mb-2 animate__animated animate__backInUp">
            <div class="d-flex justify-content-between">
                <h1 class="fw-light ">${note.title}</h1>
                <div>
                    <button class="btn btn-danger delete" data-id="${note._id}">Delete</button>
                    <button class="btn btn-secondary update" data-id="${note._id}">Update</button>
                </div class="fw-light">
            </div>           
            <p>${note.description}</p>
            
        </div>
    `

    const btnDelete = div.querySelector('.delete')
    const btnUpdate = div.querySelector('.update')

    btnDelete.addEventListener('click', (e) => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', (e) => getNoteById(btnUpdate.dataset.id))


    return div
}

export const renderNotes = (notes) =>{
        title.value = ""
        description.value = ""
        notesList.innerHTML = ""
        notes.forEach(note => {
            notesList.append(noteUI(note))        
        })
    
}

export const fillForm = (note) =>{
    //noteForm: es el id del formulario, esta en el html solo con escribir su id js ya sabe que nos referimos a el
    noteForm['title'].value = note.title
    noteForm['description'].value = note.description
    savedId = note._id
}

export const onHandleSubmit = (e) =>{
    e.preventDefault()

    if(savedId){
        updateNote(savedId,title.value,description.value)
    }else{
        saveNotes(title.value,description.value)    
    }

    title.value = ""
    description.value = ""
}

export const appendNote = (note) =>{
    notesList.append(noteUI(note))
}