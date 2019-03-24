const fs = require("fs");
const chalk = require("chalk");
// Add notes function

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.bold.inverse("New note added !!"));
  } else {
    console.log(chalk.red.bold.inverse("Note Title Taken !!"));
  }
};

// Save notes function

const saveNotes = notes => {
  const datajson = JSON.stringify(notes);
  // console.log("Saving note");
  fs.writeFileSync("notes.json", datajson);
};

//Load exisiting notes function

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const data = JSON.parse(dataBuffer.toString());
    return data;
  } catch (e) {
    return [];
  }
};

//Remove a note function

const removeNote = title => {
  const notes = loadNotes();
  const notesToKepp = notes.filter(note => note.title != title);
  if (notes.length > notesToKepp.length) {
    saveNotes(notesToKepp);
    console.log(chalk.green.bold.inverse("Note Removed !!"));
  } else {
    console.log(chalk.red.bold.inverse("No note Found !!"));
  }
};

//List of all exisiting notes function

const listNotes = () => {
  console.log(chalk.inverse("Your Notes"));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(chalk.yellow(note.title));
  });
};

//Read an existing note function

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(chalk.italic(note.body));
  } else {
    console.log(chalk.red.inverse("Note Not Found !!"));
  }
};

//export all the functions

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
