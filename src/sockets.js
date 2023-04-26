import Note from './models/Note'

export default (io) =>{
    //on: escucha enventos
    //emit: ejecuta determinado evento
    io.on('connection', (socket) =>{
        const emitNote = async() =>{
            const notes = await Note.find()
            io.emit('server:loadnotes', notes)
        }
        emitNote()

        socket.on('client:newnote', async(data)=>{
            const newNote = new Note(data)

            const savedNote = await newNote.save()
            io.emit('server:newnote', savedNote)
        })

        socket.on('cient:deletenote', async(id)=>{
            await Note.findByIdAndDelete(id)
            emitNote()
        })

        socket.on('client:getnote', async(id)=>{
            const note = await Note.findById(id)
            io.emit('server:selectednote', note)
        })

        socket.on('client:updatenote', async(updateNote)=>{
            await Note.findByIdAndUpdate(updateNote._id, {
                title: updateNote.title,
                description: updateNote.description
            })

            emitNote()
        })

    })
}