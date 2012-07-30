var WizardViews = function () {

    var Node = function (view) {
        var _next = null; //reference next node
        var _previous = null; //reference previus node
        var _view = view.ref; //referce current view
        var _tab = view.tab;
        return {
            setPrevious: function (node) { _previous = node; return this; }, //chainable!
            getPrevious: function () { return _previous; },
            setNext: function (node) { _next = node; return this; }, //chainable!
            getNext: function () { return _next; },
            getView: function () { return _view; },
            getTab: function () { return _tab; }
        };
    };

    var _head = null;
    var _tail = null;
    var _current = null;
    
    return {
        first: function () { return _head; },
        last: function () { return _tail; },
        moveNext: function () {
            return (_current !== null) ? _current = _current.getNext() : null;
        }, //set current to next and return current or return null
        movePrevious: function () {
            return (_current !== null) ? _current = _current.getPrevious() : null;
        }, //set current to previous and return current or return null
        getCurrent: function () { return _current; },
        insertView: function (view) {
            if (_tail === null) { // list is empty (implied head is null)                    
                _current = _tail = _head = new Node(view);
            }
            else {//list has nodes                    
                _tail = _tail.setNext(new Node(view).setPrevious(_tail)).getNext();
            }
        },
        setCurrentByTab: function (tab) {
            var node = _head;
            while (node !== null) {
                if (node.getTab() !== tab) { node = node.getNext(); }
                else { _current = node; break; }
            }
        }
    };
};