/// <summary>
/// Find a element in array by key
/// Array element must have a method Key()
/// </summary>
function FindInArray(array, keyValue) {

    for (var i = 1; i < array.length; i++) {
        if (array[i].Key() == keyValue) {
            return array[i];
        }
    }

    return null;
}


/// <summary>
/// Remove an event to any object. Example:
/// {  obj: $("#someDivId"), evt: "click", fn: function() { alert("clicked!"); }, capture: null }
/// </summary>
function removeEvent(obj, evt, fn, capture) {
    if (obj != null) {
        $(obj).unbind(evt);
    }
};

function addEvent(obj, evt, fn, capture) {
    if (obj != null) {
        $(obj).bind(evt, fn);
    }
};