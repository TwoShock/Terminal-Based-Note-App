const fs = require('fs')
const chalk = require('chalk')
const addNote = (title,body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find(note=>note.title == title)
    if(!duplicateNote){
        notes.push({title:title,body:body})
        saveNotes(notes)
        console.log(chalk.green.bold.inverse('New note added!\n'))
    }
    else{
        console.log(chalk.red.bold.inverse('Note title taken!\n'))
    }
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return[]
    }
}
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const removeNote = (title)=>{
    const notes = loadNotes()
    const newNotesArray = notes.filter(note=>note.title != title)
    saveNotes(newNotesArray)
    if(newNotesArray.length == notes.length){
        console.log(chalk.red.bold.inverse('No note with title: "'+title+'" found.\n'))
    }
    else{
        console.log(chalk.green.bold.inverse('Note removed!'))
    }
}
const listNotes = ()=>{
    console.log(chalk.bold.inverse('Your notes...'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(chalk.bold.green(note.title))
    })
}
const readNote = (title)=>{
    const notes = loadNotes()
    const noteToRead = notes.find(note=>note.title === title)
    if(noteToRead){
        console.log(chalk.green.bold.inverse(noteToRead.title))
        console.log(chalk.bold(noteToRead.body))
    }
    else{
        console.log(chalk.red.bold.inverse('No note found with title:"'+title+'".'))
    }
}
module.exports = {addNote,removeNote,listNotes,readNote}