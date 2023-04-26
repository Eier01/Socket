const socket = io()

export const loadNotes = (callback) =>{
    socket.on('server:loadnotes', callback)
}

export const saveNotes = (title, description)=>{
    socket.emit('client:newnote', {
        title,
        description
    })
}

export const onNewNote = (callback) =>{
    socket.on('server:newnote', callback)
}

export const deleteNote = (id) =>{
    socket.emit('cient:deletenote',id)
}

export const getNoteById = (id) =>{
    socket.emit('client:getnote', id)
}

export const onSelected = (callback)=>{
    socket.on('server:selectednote', callback)
}

export const updateNote = (id, title, description) =>{
    socket.emit('client:updatenote', {
        _id:id,
        title,
        description
    })
}