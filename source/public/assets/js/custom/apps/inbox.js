"use strict";

// Class Definition
var KTAppInbox = function() {
    // Private Properties
    var _asideEl;
    var _listEl;
    var _viewEl;
    var _replyEl;

    // Private Functions
    var _initAside = function() {
        // View list
        KTUtil.on(_asideEl, '.list-item[data-action="list"]', 'click', function(e) {
            var activeItemEl = _asideEl.querySelector('[data-action="list"].active');

            // demo loading
            var loading = new KTFeedback({
                'width': '150px',
                'placement': 'top-center',
                'content': '<span class="fw-bold">Loading ...</span>'
            });

            loading.show();

            setTimeout(function() {
                loading.hide();

                KTUtil.css(_listEl, 'display', 'flex'); // show list
                KTUtil.css(_viewEl, 'display', 'none'); // hide view

                KTUtil.removeClass(activeItemEl, 'active');
                KTUtil.addClass(this, 'active');
            }, 600);
        });
    }

    var _initList = function() {
        // View message
        KTUtil.on(_listEl, '[data-inbox="message"]', 'click', function(e) {
            var actionsEl = this.querySelector('[data-inbox="actions"]');

            // skip actions click
            if (e.target === actionsEl || (actionsEl && actionsEl.contains(e.target) === true)) {
                return false;
            }

            // Demo loading
            var loading = new KTFeedback({
                'width': '150px',
                'placement': 'top-center',
                'content': '<span class="fw-bold">Loading ...</span>'
            });
            loading.show();

            setTimeout(function() {
                loading.hide();

                KTUtil.addClass(_listEl, 'd-none');
                KTUtil.removeClass(_listEl, 'd-block');

                KTUtil.addClass(_viewEl, 'd-block');
                KTUtil.removeClass(_viewEl, 'd-none');
            }, 700);
        });

        // Group selection
        KTUtil.on(_listEl, '[data-inbox="group-select"] input', 'click', function() {
            var messages = _listEl.querySelectorAll('[data-inbox="message"]');

            for (var i = 0, j = messages.length; i < j; i++) {
                var message = messages[i];
                var checkbox = message.querySelector('.form-check input');
                checkbox.checked = this.checked;

                if (this.checked) {
                    KTUtil.addClass(message, 'active');
                } else {
                    KTUtil.removeClass(message, 'active');
                }
            }
        });

        // Individual selection
        KTUtil.on(_listEl, '[data-inbox="message"] [data-inbox="actions"] .checkbox input', 'click', function() {
            var item = this.closest('[data-inbox="message"]');

            if (item && this.checked) {
                KTUtil.addClass(item, 'active');
            } else {
                KTUtil.removeClass(item, 'active');
            }
        });
    }

    var _initView = function() {
        // Back to listing
        KTUtil.on(_viewEl, '[data-inbox="back"]', 'click', function() {
            // Demo loading
            var loading = new KTFeedback({
                'width': '150px',
                'placement': 'top-center',
                'content': '<span class="fw-bold">Loading ...</span>'
            });

            loading.show();

            setTimeout(function() {
                loading.hide();

                KTUtil.addClass(_listEl, 'd-block');
                KTUtil.removeClass(_listEl, 'd-none');

                KTUtil.addClass(_viewEl, 'd-none');
                KTUtil.removeClass(_viewEl, 'd-block');
            }, 700);
        });
    }

    var _initReply = function() {
        KTAppInboxLib.initEditor( _replyEl, 'kt_inbox_reply_editor' );
        KTAppInboxLib.initAttachments( document.querySelector('#kt_inbox_reply_attachments') );
        KTAppInboxLib.initForm( document.querySelector('#kt_inbox_reply_form') );
    }

    // Public methods
    return {
        // Public functions
        init: function() {
            // Init variables
            _asideEl = document.querySelector('#kt_inbox_aside');
            _listEl = document.querySelector('#kt_inbox_list');
            _viewEl = document.querySelector('#kt_inbox_view');
            _replyEl = document.querySelector('#kt_inbox_reply');

            // Init handlers
            if ( _asideEl !== null ) {
                _initAside();
            }

            if ( _listEl !== null ) {
                _initList();
            }

            if ( _viewEl !== null ) {
                _initView();
            }

            if ( _replyEl !== null ) {
                _initReply();
            }
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAppInbox.init();
});
