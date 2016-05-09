var List = React.createClass({

    render: function() {
        return (
            <div className="list">
            <input type="checkbox" checked={this.props.status} onChange={this.props.onStatus} />
            <div className={this.props.status == false ? "list-title" : "list-title finish" }>{this.props.children}</div>
            {this.props.status ? "✓ Photo Added" : "Add Photo" }
            <span className="delete-list" onClick={this.props.onDelete}> x </span>
            </div>
        );
    }
});

var AddList = React.createClass({
    getInitialState: function() {
        return {
            title: ''
        };
    },

    handleTitleChange: function(event) {
        this.setState({ title: event.target.value });
    },

    handleListAdd: function() {
        var newList = {
            title: this.state.title,
            status: false,
            id: Date.now()
        };

        this.props.onListAdd(newList);
        this.setState({ title: "" });
    },

    render: function() {
        return (
            <div className="add-list">
                <input type="text" placeholder="What you need to do?" value={this.state.title} onChange={this.handleTitleChange} />
                <button className="add-button" onClick={this.handleListAdd}>Add</button>
            </div>
        );
    }
});

var ListTable = React.createClass({

    render: function() {
        var onListDelete = this.props.onListDelete;
        return (
            <div className="list-table"> 
                {
                    this.props.lists.map(function(list) {
                        return (
                            <List 
                                key={list.id}
                                status={list.status} 
                                onDelete={onListDelete.bind(null, list)}
                                >
                                {list.title}
                                </List>
                            );
                    })
                }
            </div>
        );
    }
});

var ListSort = React.createClass({
    render: function() {
        return (
            <div className="list-sort">
            <div className="menu-item">All</div>
            <div className="menu-item">New</div>
            <div className="menu-item">Completed</div>
            </div>
            )
    }
});

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            lists: []
        };
    },

    componentDidMount: function() {
        var localLists = JSON.parse(localStorage.getItem('lists'));
        if (localLists) {
            this.setState({ lists: localLists });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleListDelete: function(list) {
        var listId = list.id;
        var newLists = this.state.lists.filter(function(list) {
            return list.id !== listId;
        });
        this.setState({ lists: newLists });
    },

    handleListStatus: function(list) {
        var listId = list.id;
        var newLists = this.state.lists.map(function(list) {
            return list.status = true;
        });
        this.setState({ lists: newLists });
    },

    handleListAdd: function(newList) {
        var newLists = this.state.lists.slice();
        newLists.unshift(newList);
        this.setState({ lists: newLists});
    },

    render: function() {
        return (
            <div className="lists-app">
                <h2 className="app-header">To-do list</h2>
                <AddList onListAdd={this.handleListAdd} />
                <ListTable lists={this.state.lists} onListDelete={this.handleListDelete} />
                <ListSort />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var lists = JSON.stringify(this.state.lists);
        localStorage.setItem( 'lists', lists );
    }
});

ReactDOM.render(
    <TodoApp />,
    document.getElementById('mount-point')
);