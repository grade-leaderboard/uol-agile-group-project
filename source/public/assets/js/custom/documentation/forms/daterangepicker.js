"use strict";

// Class definition
var KTFormsDaterangepickerDemos = function() {
    // Private functions
    var _example1 = function(element) {
        $("#kt_daterangepicker_1").daterangepicker();
    }

    var _example2 = function(element) {
        $("#kt_daterangepicker_2").daterangepicker({
            timePicker: true,
            startDate: moment().startOf("hour"),
            endDate: moment().startOf("hour").add(32, "hour"),
            locale: {
                format: "M/DD hh:mm A"
            }
        });
    }

    var _example3 = function(element) {
        $("#kt_daterangepicker_3").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"),10)
            }, function(start, end, label) {
                var years = moment().diff(start, "years");
                alert("You are " + years + " years old!");
            }
        );
    }

    var _example4 = function(element) {
        var start = moment().subtract(29, "days");
        var end = moment();

        function cb(start, end) {
            $("#kt_daterangepicker_4").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
        }

        $("#kt_daterangepicker_4").daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
            "Today": [moment(), moment()],
            "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }
        }, cb);

        cb(start, end);
    }

    var _example5 = function(element) {
        $("#kt_daterangepicker_5").daterangepicker();
    }    

    return {
        // Public Functions
        init: function(element) {
            _example1();
            _example2();
            _example3();
            _example4();
            _example5();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTFormsDaterangepickerDemos.init();
});
