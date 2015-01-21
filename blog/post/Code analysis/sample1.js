(function () {
    "use strict";

    /*global $, freezeInterface, updateInterfaceUsingData, unfreezeInterface*/

    // Handles the click on a specific button
    function onClick () {

        freezeInterface("Please wait, updating information...");
        $.ajax("getInformation.aspx", {
            success: function (data) {
                updateInterfaceUsingData(data);
            }
        });
        unfreezeInterface();
    }

})();
