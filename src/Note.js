/*
-each note should have a text and a unique ID 
*/

class Note {
    static ID = 1;

    constructor(text) {
        this.text = text;
        this.id = Note.ID++;

    }


}

export default Note;