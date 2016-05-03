var Note = React.createClass({
    render: function() {
        return (
                <div className="note"> {this.props.children} </div>
            );
    }
});

var NoteEditor = React.createClass({
    render: function() {
        return (
                <div className="note-editor"> NoteEditor </div>
            );
    }
});

var NotesGrid = React.createClass({
    render: function() {
        return (
            <div className="notes-grid">
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

    render: function() {
        return (
            <div className="notes-app">
            NotesApp
            <NoteEditor />
            <NotesGrid notes={this.state.notes} />
            </div>
            );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);