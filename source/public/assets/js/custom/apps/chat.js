"use strict";

// Class definition
var KTAppChat = function () {
	// Private functions
	var _initContent = function (element) {
		// attach events
		KTUtil.on(element, '.card-footer textarea', 'keydown', function(e) {

			if (e.keyCode == 13) {
				_handkeMessaging(element);
				e.preventDefault();

				return false;
			}
		});
	}

	var _handkeMessaging = function(element) {
		var messagesEl = element.querySelector('.messages');
		var scrollEl = element.querySelector('[data-kt-scroll="true"]');
        var textarea = element.querySelector('textarea');

        if (textarea.value.length === 0 ) {
            return;
        }

		var node = document.createElement("DIV");
		KTUtil.addClass(node, 'd-flex flex-column mb-5 align-items-end');

		var html = '';

		html += '<div class="d-flex align-items-center">';
		html += '	<div class="d-flex flex-column text-end">';
		html += '		<a href="#" class="text-gray-800 text-hover-primary fw-bolder">Grace Logan</a>';
		html += '		<span class="text-muted fw-bold fs-7">Just now</span>';
		html += '	</div>';
		html += '	<div class="symbol symbol-40px ms-4">';
		html += '		<span class="symbol-label bg-gray-100 rounded">';
		html += '			<img src="assets/media/svg/avatars/018-girl-9.svg" class="h-75 align-self-end" alt="">';
		html += '		</span>';
		html += '	</div>';
		html += '</div>';
		html += '<div class="mt-2 rounded p-5 bg-light-success text-gray-800 text-end max-w-400px">' + textarea.value + '</div>';

		node.innerHTML = html;
		messagesEl.appendChild(node);
		textarea.value = '';
		scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

		var ps;
		if (ps = KTUtil.data(scrollEl).get('ps')) {
			ps.update();
		}

		setTimeout(function() {
			var node = document.createElement("DIV");
			KTUtil.addClass(node, 'd-flex flex-column mb-5 align-items-start');

			var html = '';
			html += '<div class="d-flex align-items-center">';
			html += '	<div class="symbol symbol-40px me-4">';
			html += '		<span class="symbol-label bg-gray-100 rounded">';
			html += '			<img src="assets/media/svg/avatars/035-boy-15.svg" class="h-75 align-self-end" alt="">';
			html += '		</span>';
			html += '	</div>';
			html += '	<div class="d-flex flex-column">';
			html += '		<a href="#" class="text-gray-800 text-hover-primary fw-bolder">Ja Morant</a>';
			html += '		<span class="text-muted fw-bold fs-7">Just now</span>';
			html += '	</div>';
			html += '</div>';
			html += '<div class="mt-2 rounded p-5 bg-light-primary text-gray-800 text-start max-w-400px">';
			html += 'Right before vacation season we have the next Big Deal for you.';
			html += '</div>';

			KTUtil.setHTML(node, html);
			messagesEl.appendChild(node);
			textarea.value = '';
			scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

			var ps;
			if (ps = KTUtil.data(scrollEl).get('ps')) {
				ps.update();
			}
		}, 2000);
	}

	return {
		// Public functions
		init: function() {
			// Init Content
			_initContent(document.querySelector('#kt_chat_content'));
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAppChat.init();
});