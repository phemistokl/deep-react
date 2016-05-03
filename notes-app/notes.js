var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
                <div className="note" style={style} > {this.props.children} </div>
            );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
        var newNote = {
            text: this.state.text,
            color: 'yellow',
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
    },

    render: function() {
        return (
                <div className="note-editor">
                    <textarea 
                        placeholder="Enter your note here..." 
                        rows={5} 
                        className="textarea" 
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
                </div>
            );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        var msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    render: function() {
        return (
            <div className="notes-grid" ref="grid">
               {
                    this.props.notes.map(function(note) {
                        return <Note key={note.id} color={note.color}> {note.text} </Note>;
                    })
               }
            </div>
            );
    }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [
                    {
                        id: 0,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    }, {
                        id: 1,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    }, {
                        id: 2,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    }, {
                        id: 3,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    }, {
                        id: 4,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    }, {
                        id: 5,
                        text: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона",
                        color: "#ffd700"
                    },]
        };
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="notes-app">
            NotesApp
            <NoteEditor onNoteAdd={this.handleNoteAdd} />
            <NotesGrid notes={this.state.notes} />
            </div>
            );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);