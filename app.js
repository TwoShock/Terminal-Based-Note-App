const yargs = require('yargs')
const notes = require('./notes.js')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
       notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title name to be removed',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command:'list',
    describe:'lists all notes',
    handler:function(){ 
        notes.listNotes()
    }
})
yargs.command({
    command:'read',
    describe:'Read a note with given title',
    builder:{
        title:{
            describe:'Note title to read',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
       notes.readNote(argv.title)
    }
})
yargs.parse()