"use strict";

var KTAppShop = function () {
    // Private variables
    var _sidebar;
    var _addFormElement;
    var _addFormButtonElement;
    var _filterFormElement;
    var _filterFormButtonElement;

    var _showProductAddForm = function () {
        KTUtil.removeClass(_addFormElement, 'd-none'); // Show Form
        KTUtil.addClass(_filterFormElement, 'd-none');
        _sidebar.scrollTop = 0; // Scroll Top

        KTUtil.css(_addFormElement, 'animationDuration', '0.3s');
        KTUtil.animateClass(_addFormElement, 'animate__animated animate__slideInRight');
    }

    var _showProductsFilterForm = function () {
        KTUtil.removeClass(_filterFormElement, 'd-none'); // Show Form
        KTUtil.addClass(_addFormElement, 'd-none'); // Hide Form
        _sidebar.scrollTop = 0; // Scroll Top

        KTUtil.css(_filterFormElement, 'animationDuration', '0.3s');
        KTUtil.animateClass(_filterFormElement, 'animate__animated animate__slideInLeft');
    }

    // Private funcions
    var _init = function () {
        // Handle Buttons
        _addFormButtonElement.addEventListener('click', function(e) {
            e.preventDefault();

            _showProductAddForm();
        });

        _filterFormButtonElement.addEventListener('click', function(e) {
            e.preventDefault();

            _showProductsFilterForm();
        });
    }

    // Pricing Slider
    var _initPriceSlider = function () {
        // init slider
        var slider = document.querySelector('#kt_price_slider');

        if (typeof slider === 'undefined') {
            return;
        }

        if (!slider) {
            return;
        }

        noUiSlider.create(slider, {
            start: [20, 60],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    }

    // Public methods
    return {
        init: function () {
            _sidebar = document.querySelector('#kt_sidebar');
            _addFormElement = document.querySelector('#kt_sidebar_shop_new_form');
            _addFormButtonElement = document.querySelector('#kt_sidebar_shop_new_form_btn');

            _filterFormElement = document.querySelector('#kt_sidebar_shop_filter_form');
            _filterFormButtonElement = document.querySelector('#kt_sidebar_shop_filter_form_btn');

            _initPriceSlider();

            _init();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTAppShop.init();
});
