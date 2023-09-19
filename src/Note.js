
class Note {
    static ID = 1;

    constructor(text) {
        this.text = text;
        this.id = Note.ID++;
    }
}

export default Note;


// also should be able to click outside of text area too to save edits