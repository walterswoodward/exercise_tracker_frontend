const List = function () {
    // insert :: ([Model?], item) -> [ ]
    // item = any valid javascript array type
    function insert(array, payload) {
        let copy = array.slice();
        copy.push(payload);
        return copy;
    }
    
    // remove :: ([Model], numeric) -> [ ]
    // TodoItemModel = see backend repository `todolist-mysql-go`
    function remove(array, id) {
        let copy = array.slice();
        return copy.filter((_value, index) => {
            return copy[index].Id !== id;
        });
    }
    
    // update :: ([Model], item) -> [ ]
    // TodoItemModel = see backend repository `todolist-mysql-go`
    // item = any valid javascript array type
    function update(array, payload) {
        let copy = array.slice();
        return copy.map((todo, index) => {
            if (todo['Id'] === payload.id) {
                todo['Description'] = payload.description;
                return todo;
            } else {
                return todo;
            }
        });
    }

    return {
        insert: this.insert,
        remove: this.remove,
        update: this.update
    }
}

