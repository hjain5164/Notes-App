const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// Create Add command

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true, //required else will give error
      type: "string" //forced to have a string value
    },
    body: {
      describe: "Content of the note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//Create remove command

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

//Create a list command

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  }
});

// Create a read command

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

//Parse the input which is given from command line
yargs.parse();
