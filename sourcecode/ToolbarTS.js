/// <reference path="Base.js" />
/// <reference path="Modal.js" />
/// <reference path="Toolbar.js" />
/// <reference path="../Site.js" />
/// <reference path="../../../Jquery/jquery-1.7.1.js" />

function ToolBarTsInstance(domElement, settings) {
    

    this.SetGrid = function (GRID) {
        _grid = GRID;
    };

    this.SetForm = function (FORM) {
        _form = FORM;
    };


    //#region constructor */

    var _container = domElement;
    if (settings == null) {
        throw "No settings params was provided";
    }

    var _contentBody = settings.contentBody;
    var _controller = settings.Controller + "/";


    if ((settings == null ? null : settings.OnMessage) == null)
        _OnMessage = SetMessage;
    else
        _OnMessage = settings.OnMessage;

    if ((settings == null ? null : settings.OnError) == null)
        _OnError = SetError;
    else
        _OnError = settings.OnError;

    _grid = settings.Grid;
    _form = settings.Form;

    //#endregion*/

    //#region constructor */
    settings.id = 'tlbbarTS';
    settings.buttons = [];

    var _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Create");
    _button.SetType(ToolbarButton.ButtonType.ImageButton)
    _button.SetClass("new");
    _button.SetTooltip(GetText('CREATE_NEW'));
    _button.SetCallback(CallCreate);

    settings.buttons.push(_button);

    _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Edit");
    _button.SetType(ToolbarButton.ButtonType.ImageButton)
    _button.SetClass("edit");
    _button.SetTooltip(GetText('OPEN_EDIT_MODE'));
    _button.SetCallback(CallEdit);

    settings.buttons.push(_button);

    _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Save");
    _button.SetType(ToolbarButton.ButtonType.ImageButton)
    _button.SetClass("save");
    _button.SetTooltip(GetText('SAVE'));
    _button.SetCallback(Save);

    settings.buttons.push(_button);

    _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Delete");
    _button.SetType(ToolbarButton.ButtonType.ImageButton)
    _button.SetClass("delete");
    _button.SetTooltip(GetText('DELETE'));
    _button.SetCallback(Delete);

    settings.buttons.push(_button);

    _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Back");
    _button.SetType(ToolbarButton.ButtonType.ImageButton)
    _button.SetClass("back");
    _button.SetTooltip(GetText('BACK'));
    _button.SetCallback(Back);

    settings.buttons.push(_button);

    //        _button = new ToolbarButton();
    //        _button.SetEnabled(true);
    //        _button.SetID("Find");
    //        _button.SetType(ToolbarButton.ButtonType.ImageButton)
    //        _button.SetClass("find");
    //        _button.SetTooltip(GetText('FILTER'));
    //        _button.SetCallback(Find);

    //        settings.buttons.push(_button);

    //        _button = new ToolbarButton();
    //        _button.SetEnabled(true);
    //        _button.SetID("txtFilter");
    //        _button.SetType(ToolbarButton.ButtonType.TextBox)
    //        _button.SetClass("searchFilter findText");

    //        settings.buttons.push(_button);

    _button = new ToolbarButton();
    _button.SetEnabled(true);
    _button.SetID("Find");
    _button.SetType(ToolbarButton.ButtonType.FindButton)
    _button.SetCallback(Find);
    settings.buttons.push(_button);

    //#endregion*/

    ToolBarInstance.call(this, settings, domElement, (settings == null ? null : (settings.OnMessage == null ? SetMessage : settings.OnMessage)), (settings == null ? null : (settings.OnError == null ? SetError : settings.OnError)), (settings == null ? null : settings.Grid), (settings == null ? null : settings.Form));

    this.Initialize();

    return this;

    //#region private variables */
    var _grid;
    var _form;
    var _container;
    //#endregion*/

    //#region Default Functions */

    function CallCreate() {
        if (_contentBody != null && _contentBody != "MasterBody") {            
            $("#" + _contentBody).LoadView({ url: "~/" + _controller + "Create?windowId=" + _contentBody });
        }
        else {
            window.location.href = "Create";
        }
    }

    function Find() {
        if (_grid != null) {
            _grid.flexOptions({ query: $('.inputSearch', _container).val(), newp: 1 }).flexReload();
        }
        else {
            _OnError('Grid instance is null');
        }
    }



    function Save(callback) {
        var ret;
         if (_form != null) {
            if (_form.valid()) {
                var err = null;
                var proc = null;
                $.ajax({
                    type: "POST",
                    url: _form.attr('action'),
                    data: _form.serialize(),
                    async: false,
                    beforeSend: function () {
                        proc = Modal.SetModalMessageAs(GetText("Processing") + "...").Show(false);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        err = jQuery.parseJSON(XMLHttpRequest.responseText);
                    },
                    success: function (data, textStatus, jqXHR) {
                        _OnMessage(GetText(textStatus).toString());
                        ret = data;
                    },
                    complete: function () {
                        Modal.Hide(proc);
                        if (callback != null) { callback(); }
                        if (err != null) {
                            throw err.Message;
                        }
                    }
                });
            }
            else {
                throw GetText('VERIFY_FORM');
            }
        }
        else {
            throw 'Form instance is null';
        }
        return ret;
    }

    function CallEdit() {
        if (_grid != null) {
            var items = _grid.find('.trSelected');
            if (items.length > 0) {
                var Url;
                if (_contentBody != null && _contentBody != "MasterBody") {
                    Url = $Url.resolve("~/" + _controller + "Edit?Id=" + $(items[0].cells[0]).text() + "&windowId=" + _contentBody);
                }
                else {
                    Url = "Edit?Id=" + $(items[0].cells[0]).text();
                }

                if (_contentBody != null && _contentBody != "MasterBody") {
                    $("#" + _contentBody).LoadView({ url: Url });
                }
                else {
                    window.location.href = Url;
                }                
            }
            else if (items.length > 1){
                _OnError(GetText('ONLY_ONE_ITEM_ACCEPTED_IN_EDIT_OPERATION'));
            }
            else{
                _OnError(GetText('SELECT_ONE_ITEM'));
            }
        }
        else {
            _OnError(GetText('GRID_INSTANCE_IS_NULL'));
        }
    }

    function Back() {
        if (_contentBody != null && _contentBody != "MasterBody") {
            $("#" + _contentBody).LoadView({ url: "~/" + _controller + "Index?windowId=" + _contentBody });
        }
        else {
            window.location.href = "Index";
        }
    }

    function Delete(callback) {
        if (_grid != null) {
            var items = _grid.find('.trSelected');
            if (items.length > 0) {
                var Message = "";
                if (items.length > 1) {
                    Message = GetText("Delete") + " " + items.length.toString() + " items?";
                }
                else {
                    Message = GetText("Delete") + " item " + $(items[0].cells[0]).text() + "?";
                }

                var URL;
                if (_contentBody != null && _contentBody != "MasterBody") {
                    URL = $Url.resolve('~/' + _controller + "Delete");
                }
                else {
                    URL = "Delete";
                }

                Modal.SetModalMessageAs(Message)
                    .ShowConfirm({ OkButtonLabel: GetText("Yes"), CancelButtonLabel: GetText("Cancel"),
                        IfConfirm: function () {
                            var proc = null;
                            var itemlist = '';
                            for (i = 0; i < items.length; i++) {
                                var itemId = $(items[0].cells[0]).text();
                                $.ajax({
                                    url: URL,
                                    type: "post",
                                    beforeSend: function () {
                                        proc = Modal.SetModalMessageAs(GetText("Processing") + "...").Show(false);
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        var err = jQuery.parseJSON(XMLHttpRequest.responseText);
                                        _OnError(err.Message);
                                    },
                                    data: "id=" + $(items[0].cells[0]).text(),
                                    success: function (data, textStatus, jqXHR) {
                                        var message = "";
                                        message = GetText("Deleted", itemId);
                                        _OnMessage(message);
                                        _grid.flexOptions({ query: $('.searchFilter', _container).val() }).flexReload();
                                    },
                                    complete: function () {
                                        Modal.Hide(proc);
                                        if (callback != null) { callback(); }
                                    }
                                });
                            }
                        },
                        IfCancel: function () {
                        }
                    });
            }
            else if (items.length > 1){
                _OnError(GetText('ONLY_ONE_ITEM_ACCEPTED_IN_EDIT_OPERATION'));
            }
            else{
                _OnError(GetText('SELECT_ONE_ITEM'));
            }
        }
        else {
             _OnError(GetText('GRID_INSTANCE_IS_NULL'));
        }
    }
    //#endregion*/

}

ToolBarTsInstance.prototype = new ToolBarInstance();

(function ($) {
    $.fn.toolbarTS = function (settings) {
        return new ToolBarTsInstance(this, settings);    
    }
})(jQuery);