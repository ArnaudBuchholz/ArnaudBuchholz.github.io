(function () {
    "use strict";

    /*global $, freezeInterface, updateInterfaceUsingData, unfreezeInterface*/
    /*global showError*/

    // Handles the click on a specific button
    function onClick () {
        freezeInterface("Please wait, updating information...");
        $.ajax("getInformation.aspx", {
            success: function (data) {
                var resultCode = data.resultCode;
                if (resultCode === 0) {
                    updateInterfaceUsingData(data);
                } else {
                    // The 'error' keyword is here but inside a string
                    showError("An error occurred");
                }
            }
        });
        unfreezeInterface();
    }

    document.getElementById("myButton")
        .addEventListener("click", onClick);

})();