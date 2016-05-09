var NoteSearch = React.createClass({
    render: function() {
        return (
            <input type="text" className="search-field" onChange={this.props.onSearch} />
            );
    }
});

var NoteColor = React.createClass({
    render: function() {
        var colorRed = { backgroundColor: "#ff8a80" };
        var colorYellow = { backgroundColor: "#ffff8d" };
        var colorGray = { backgroundColor: "#cfd8dc" };
        var colorBlue = { backgroundColor: "#80d8ff" };
        var colorGreen = { backgroundColor: "#ccff90" };
        return (
            <div className="colorize-block" onClick={this.props.onColorAdd}>
                <div role="button" className="btn-red colorize" style={ colorRed }></div>
                <div role="button" className="btn-yellow colorize" style={ colorYellow }></div>
                <div role="button" className="btn-gray colorize" style={ colorGray }></div>
                <div role="button" className="btn-blue colorize" style={ colorBlue }></div>
                <div role="button" className="btn-green colorize" style={ colorGreen }></div>
            </div>
            );
    }
});

var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
                <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> x </span>
                 {this.props.children} </div>
            );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleColorChange: function(event) {
        this.setState({ color: event.target.style.backgroundColor });
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAddus: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: ''});
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
                    <NoteColor onColorAdd={this.handleColorChange}/>
                    <button className="add-button" onClick={this.handleNoteAddus}>Add</button>
                </div>
            );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
               {
                    this.props.notes.map(function(note) {
                        return (
                        <Note 
                            key={note.id} 
                            onDelete={onNoteDelete.bind(null, note)}
                            color={note.color}> 
                            {note.text} 
                        </Note>
                       ); 
                    })
               }
            </div>
            );
    }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    handleNoteSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var filteredNotes = this.state.notes.filter(function(note) {
            var searchValue = note.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({ filteredNotes: filteredNotes });
    },    

    render: function() {
        return (
            <div className="notes-app">
            <h2 className="app-header">NotesApp</h2>
            <NoteSearch onSearch={this.handleNoteSearch}/>
            <NoteEditor onNoteAdd={this.handleNoteAdd} />
            <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
            );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);