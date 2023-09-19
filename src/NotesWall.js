
import Note from "./Note.js";

class NotesWall {
    constructor() {
        this.notes = [];
        this.length = 0;
    }

    // Return a note based on its index
    getNote(index) {
        return this.notes[index];
    }

    // Add a note to the wall
    addNote(text) {
        const note = new Note(text);
        this.notes.push(note);
        this.length++;
    }

    // Delete a note
    deleteNote(text) {
        const index = this.notes.findIndex((n) => text === n.text);
        if (index !== -1) {
            this.notes.splice(index, 1);
            this.length--;
        }
    }

    // Edit a note
    editNote(oldText, newText) {
        const index = this.notes.findIndex((n) => oldText === n.text);
        if (index !== -1) {  // THIS STATEMENT WAS THE PROBLEM OMG SINCE IT WASN'T FILTERING STUFF OUT PROPERLY; I WASN'T CHECKING THE INDEX BUT INSTEAD THE ARRAY VALUE
            this.notes[index].text = newText;
        }
    }

}

export default NotesWall;