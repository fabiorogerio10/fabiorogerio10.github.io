/// <reference path="Base.js" />
/// <reference path="Modal.js" />
/// <reference path="Site.js" />

ToolbarButton.ButtonType = {
    Button: 0,
    TextBox: 1,
    ImageButton: 2,
    FindButton: 3,
    RadioButton: 4
}


function ToolbarButton() {

    //#region private variables */

    var _id;
    var _before_callback;
    var _callback;
    var _complete_callback;
    var _success_callback;
    var _error_callback;
    var _complete_ajaxcallback;
    var _text;
    var _class;
    var _tooltip;
    var _type;
    var _object;
    var _enabled;

    //#endregion*/

    //#region "Properties" */

    this.GetID = function () {
        return _id;
    };

    this.SetID = function (ID) {
        _id = ID;
    };

    this.GetBeforeCallback = function () {
        return _before_callback;
    };

    this.SetBeforeCallback = function (BeforeCallback) {
        _before_callback = BeforeCallback;
    };

    this.GetCallback = function () {
        return _callback;
    };

    this.SetCallback = function (Callback) {
        _callback = Callback;
    };

    this.GetCompleteCallback = function () {
        return _complete_callback;
    };

    this.SetCompleteCallback = function (CompleteCallback) {
        _complete_callback = CompleteCallback;
    };

    this.GetSuccessCallback = function () {
        return _success_callback;
    };

    this.SetSuccessCallback = function (SuccessCallback) {
        _success_callback = SuccessCallback;
    };

    this.GetErrorCallback = function () {
        return _error_callback;
    };

    this.SetErrorCallback = function (ErrorCallback) {
        _error_callback = ErrorCallback;
    };


    this.GetAjaxCompleteCallback = function () {
        return _complete_ajaxcallback;
    };

    this.SetAjaxCompleteCallback = function (AjaxCompleteCallback) {
        _complete_ajaxcallback = AjaxCompleteCallback;
    };

    this.GetClass = function () {
        return _class;
    };

    this.SetClass = function (Class) {
        _class = Class;
    };

    this.GetText = function () {
        return _text;
    };

    this.SetText = function (Text) {
        _text = Text;
    };

    this.GetTooltip = function () {
        return _tooltip;
    };

    this.SetTooltip = function (Tooltip) {
        _tooltip = Tooltip;
    };

    this.GetType = function () {
        return _type;
    };

    this.SetType = function (Type) {
        _type = Type;
    };

    this.GetObject = function () {
        return _object;
    };

    this.SetObject = function (Object) {
        _object = Object;
    };

    this.GetEnabled = function () {
        return _enabled;
    };

    this.SetEnabled = function (Enabled) {
        _enabled = Enabled;
    };

    this.Key = function () {
        return _id;
    }

    //#endregion*/
}

function ToolbarRadioButton() {

    ToolbarButton.call(this);

    //#region "private variables" */
    var _name;
    var _value;
    var _checked;
    //#endregion*/

    //#region "Properties" */
    this.GetName = function () {
        return _name;
    };

    this.SetName = function (NAME) {
        _name = NAME;
    };

    this.GetValue = function () {
        return _value;
    };

    this.SetValue = function (VALUE) {
        _value = VALUE;
    };

    this.GetChecked = function () {
        return _checked;
    };

    this.SetChecked = function (VALUE) {
        _checked = VALUE;
    };
    //#endregion*/
}

ToolbarRadioButton.prototype = new ToolbarButton();

function MenuItem() {
    //#region private variables */
    var _name;
    var _action;
    var _numericId;
    var _parentNumericId;
    var _order;
    //#endregion*/

    //#region Properties */
    this.GetName = function () {
        return _name;
    };

    this.SetName = function (NAME) {
        _name = NAME;
    };

    this.GetAction = function () {
        return _action;
    };

    this.SetAction = function (ACTION) {
        _action = ACTION;
    };

    this.GetNumericId = function () {
        return _numericId;
    };

    this.SetNumericId = function (NUMERIC_ID) {
        _numericId = NUMERIC_ID;
    };

    this.GetParentNumericId = function () {
        return _parentNumericId;
    };

    this.SetParentNumericId = function (NUMERIC_PARENT_ID) {
        _parentNumericId = NUMERIC_PARENT_ID;
    };

    this.GetOrder = function () {
        return _order;
    };

    this.SetOrder = function (ORDER) {
        _order = ORDER;
    };

    //#endregion*/
}

function ToolbarMenuButton() {
    ToolbarButton.call(this);

    //#region private variables */
    var menuItems = [MenuItem];
    //#endregion*/

    //#region Properties */
    this.GetMenuItems = function () {
        return menuItems;
    };

    this.SetMenuItems = function (MENU_ITEMS) {
        menuItems = MENU_ITEMS;
    };
    //#endregion*/
}

ToolbarMenuButton.prototype = new ToolbarButton();

/// <summary> 
/// Instance of a toolbar control
/// <summary>
function ToolBarInstance(settings, containerToolbar, OnMessage, OnError) {

    //#region private variables */

    var _html = "";

    var _OnMessage;
    var _OnError;
    var _Container;

    var _createFn;
    var _editFn;
    var _deleteFn;
    var _saveFn;
    var _backFn;
    var _findFn;

    //#region buttons */

    var _buttons = [ToolbarButton];



    //#endregion*/

    //#endregion*/

    //#region constructor */

    if (settings != null) {
        _OnMessage = OnMessage;

        _OnError = OnError;

        //#region html */           
        var _id = (settings.id != null ? settings.id : 'tlbbar');
        _html = "";
        _html += "<ul class='toolbar BarraGradient' id='" + _id + "'>";
        if (settings.buttons != null) {
            $.each(settings.buttons, function (key, value) {

                _buttons.push(value);
                _html += GenerateButtonHTML(value);
            });
        }
        _html += "</ul>";

        //#endregion*/

        if (containerToolbar != null) {
            _Container = $(containerToolbar);
            _Container.html(_html);
        }
        else
            _Container = $(document);

        addTransparencyEffect();
    }
    //#endregion*/

    //#region Public Functions */

    /// <summary>
    /// Initialize de toolbar with handlers, etc
    /// example:
    /// { Create: false, Edit : { callback: function() { do something } }, Back : False }
    /// <summary>
    this.Initialize = function () {

        for (var i = 1; i < _buttons.length; i++) {
            CreateButton(GetButton(_buttons[i].GetID()));
        }

    };

    /// <summary>
    /// This function are obsolete, use UpdateToolbar instead
    /// Update toolbar buttons with handlers, etc
    /// example:
    /// { Create: false, Edit : true }
    /// <summary>
    this.UpdateToolbarButtons = function (settings) {
        $.each(settings, function (key, value) {
            var btn = GetButton(key);
            if (btn != null) {
                if (value == true || value == false) {
                    btn.SetEnabled(value);
                }
                else {
                    if (value.callback != null) {
                        btn.SetCallback(value.callback);
                        btn.SetEnabled(true);
                    }
                }
                UpdateButton(btn);
            }
        });

    };

    /// <summary>
    /// Update toolbar with handlers, etc
    /// example:
    /// { Create: false, Edit : true }
    /// <summary>
    this.GetButton = function (ID) {
        return GetButton(ID);
    };

    /// <summary>
    /// Update toolbar with handlers, etc
    /// example:
    /// <summary>
    this.UpdateToolbar = function (settings) {
        $.each(settings.buttons, function (key, value) {
            var btn = GetButton(value.GetID());
            UpdateButton(btn);
        });
    };

    this.AddButton = function (button) {
        _buttons.push(button);
        $("ul:first", _Container).append(GenerateButtonHTML(button));
        CreateButton(GetButton(button.GetID()));
    }

    /// <summary>
    /// Trigger the event related to button
    /// example:
    /// <summary>
    this.PerformEvent = function (id) {
        var fn = CreateFunction(GetButton(id));
        fn();
    }


    //#endregion*/

    //#region private Functions */

    //#region Default Functions */

    function addTransparencyEffect() {
        _Container.find('#tlbar').hover(
                  function () {
                      $(this).removeClass('transparent');
                  },
                  function () {
                      $(this).addClass('transparent');
                  }
                );
    }

    function filterKeyDown() {
        if (event.keyCode == 13) {
            _findFn();
        }
    }

    function NotImplemented() {
        _OnError('Action not implemented');
    }

    //#endregion*/

    function GenerateButtonHTML(button) {

        var html;
        if (button.GetType() == ToolbarButton.ButtonType.ImageButton) {
            html = "<li><a href='#' id='" + (button.GetID() != null ? button.GetID() : "") + "' value='" + (button.GetText() != null ? button.GetText() : "") + "' class='" + (button.GetClass() != null ? button.GetClass() : "") + " enabled tooltip'><span style='display:none;' id='Tooltip_" + button.GetID() + "'>" + button.GetTooltip() + "</span></a></li>";
        }
        else if (button.GetType() == ToolbarButton.ButtonType.Button) {
            html = "<li><input type='button' id='" + (button.GetID() != null ? button.GetID() : "") + "' value='" + (button.GetText() != null ? button.GetText() : "") + "' class='" + (button.GetClass() != null ? button.GetClass() : "") + " enabled tooltip'><span style='display:none;' id='Tooltip_" + button.GetID() + "'>" + button.GetTooltip() + "</span></li>";
        }
        else if (button.GetType() == ToolbarButton.ButtonType.TextBox) {
            html = "<li><input id='" + (button.GetID() != null ? button.GetID() : "") + "' value='" + (button.GetText() != null ? button.GetText() : "") + "' class='" + (button.GetClass() != null ? button.GetClass() : "") + " enabled tooltip'/><span style='display:none;' id='Tooltip_" + button.GetID() + "'>" + button.GetTooltip() + "</span></li>";
        }
        else if (button.GetType() == ToolbarButton.ButtonType.FindButton) {
            html = "<li><div class='searchDiv' id='searchDiv_" + button.GetID() + "' ><input id='" + (button.GetID() != null ? button.GetID() : "") + "_Txt' class='inputSearch' onkeydown=\"if (event.keyCode == 13 && $('#" + button.GetID() + "',$('#" + $(containerToolbar).attr('id') + "')).hasClass('enabled')) { $('#" + button.GetID() + "',$('#" + $(containerToolbar).attr('id') + "')).trigger('click'); }\" /><a href='#' id='" + (button.GetID() != null ? button.GetID() : "") + "' class='find'/></div></li>";
        }
        else if (button.GetType() == ToolbarButton.ButtonType.RadioButton) {
            html = "<li class='" + (button.GetClass() != null ? button.GetClass() : "") + "'><input type='radio' name='" + (button.GetName != null ? button.GetName() : "") + "' class='" + (button.GetClass() != null ? button.GetClass() : "") + "' id='" + (button.GetID() != null ? button.GetID() : "") + "' value='" + (button.GetValue() != null ? button.GetValue() : "") + "' " + (button.GetChecked() != null ? button.GetChecked() : "") + " >" + (button.GetText() != null ? button.GetText() : "") + "</input></li>";
        }
        else if (button.GetType() == ToolbarButton.ButtonType.MenuButton) {
            html = "<li><ul id='" + (button.GetID() != null ? button.GetID() : "") + "' class='pureCssMenu pureCssMenum0'></ul></li>";
            CreateMenuButton(button);
        }

        return html;
    }

    function CreateMenuButton(button) {
        button.items = [];
        $.each(button.GetMenuItems(), function (key, value) {
            button.items[key] = value;
        });
    }

    function GetButton(Id) {

        var btn = FindInArray(_buttons, Id);

        if (btn != null && btn.GetObject() == null) {
            btn.SetObject(_Container.find('#' + Id));
        }

        return btn;
    }

    function DisableButton(btn) {
        var btnObj = btn.GetObject();
        btnObj.removeClass('enabled');
        btnObj.removeClass('tooltip');
        btnObj.addClass('disabled');
        if (btn.GetType() == ToolbarButton.ButtonType.FindButton) {
            $("#searchDiv_" + btn.GetID(), _Container).hide();
        }
    }

    function EnableButton(btn) {
        var btnObj = btn.GetObject();
        btnObj.addClass('enabled');
        btnObj.removeClass('tooltip');
        btnObj.addClass('tooltip');
        btnObj.removeClass('disabled');
        if (btn.GetType() == ToolbarButton.ButtonType.FindButton) {
            $("#searchDiv_" + btn.GetID(), _Container).show();
        }
    }

    //#region Event Handlers */

    function CreateHandler(btn, fn) {
//        removeEvent(btn, "click", fn);
//        addEvent(btn, "click", fn);
        removeEvent(btn, "click", fn);
        addEvent(btn, "click", function () {
            $(this).attr("hideFocus", "true").css("outline", "none");
            fn();
            $(this).trigger('blur');
        });
    }

    function CreateFunction(button) {
        var fn = function () {
            var ret;
            var canExecute = true;
            if (button.GetEnabled()) {
                var fn0 = button.GetBeforeCallback();
                if (fn0 != null) { canExecute = fn0(); }
                try {
                    var fn1 = button.GetCallback();
                    if (fn1 != null && canExecute) {
                        ret = fn1(button.GetAjaxCompleteCallback());
                    }
                    var fn2 = button.GetSuccessCallback();
                    if (fn2 != null && canExecute) { fn2(ret); }
                } catch (e) {
                    var fn3 = button.GetErrorCallback();
                    if (fn3 != null) { fn3(); } else { _OnError(e); }
                }
                var fn4 = button.GetCompleteCallback();
                if (fn4 != null) { fn4(); }
            }
        };

        return fn;
    }

    function CreateButtonHandler(button) {
        if (button.GetType() == ToolbarButton.ButtonType.MenuButton) {
            var _html;
            _html = "<li class='pureCssMenui0'><a class='pureCssMenui0' href='#'><span>" + button.GetText() + "</span><![if gt IE 6]></a><![endif]><!--[if lte IE 6]><table><tr><td><![endif]-->";
            _html += "<ul class='pureCssMenum'>"
            $.each(button.GetMenuItems(), function (key, value) {
                _html += "<li class='pureCssMenui'><a class='pureCssMenui' href='#' onclick='" + value.callback + "' >" + value.name + "</a></li>";
            });
            _html += "</ul></li>";
            button.GetObject().append(_html);
        }
        else {
            CreateHandler(button.GetObject(), CreateFunction(button));
        }
    }

    function CreateButton(button) {
        CreateButtonHandler(button);
        EnableButton(button);
    }

    function UpdateButton(button) {
        CreateButtonHandler(button);
        if (button.GetEnabled()) {
            EnableButton(button);
        }
        else {
            DisableButton(button);
        }
    }

    //#endregion*/

    //#endregion*/

}

(function ($) {
    $.fn.toolbar = function (settings) {
        return new ToolBarInstance(settings, this, (settings == null ? null : (settings.OnMessage == null ? SetMessage : settings.OnMessage)), (settings == null ? null : (settings.OnError == null ? SetMessage : settings.OnError)), (settings == null ? null : settings.Grid), (settings == null ? null : settings.Form));

    };
})(jQuery);







