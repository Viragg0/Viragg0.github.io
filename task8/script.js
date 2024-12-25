function saveBeforeInput(id) {
    $(id)[0].addEventListener("input", function () {
        localStorage.setItem(id, $(id).val());
    });
}

function setInStart(id) {
    $(id).val(localStorage.getItem(id));
}

/*function isTelephone(str) {
    if (str in (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
        return true;
    }
    return false;
}*/

function closePopUp() {
    $("#no-pop-up").fadeTo("fast", "1").removeClass("user-select-none");
    $("#pop-up").fadeTo("fast", "0").hide();
    $("a").removeClass("pointer-event-none");
}

function openPopUp() {
    $("#no-pop-up").fadeTo("fast", "0.25").addClass("user-select-none");
    $("#pop-up").fadeTo("fast", "1").addClass("user-select-none");
    $("a").addClass("pointer-event-none");
    $("#close-pop-up").addClass("user-select-none");
}

function main() {
    // Local Storage API
    let idList = ["#fio", "#email", "#telephone", "#organization", "#message"];
    for (let i = 0; i < idList.length; i++) {
        setInStart(idList[i]);
        saveBeforeInput(idList[i]);
    }

    // History API & animations
    window.addEventListener("popstate", function () {
        if (history.state == null) {
            closePopUp();
        }
        if (history.state == "pop-up") {
            openPopUp();
        }
    });

    $("#button-to-pop-up").click(function () {
        history.pushState("pop-up", null, "form-pop-up");
        openPopUp();
    });

    $("#close-pop-up").click(function () {
        history.back();
        closePopUp();
    });

    // formcarry
    $(function () {
        $(".formcarryForm").submit(function (e) {
            e.preventDefault();
            var href = $(this).attr("action");

            $.ajax({
                type: "POST",
                url: href,
                data: new FormData(this),
                dataType: "json",
                processData: false,
                contentType: false,
                success: function (response) {
                    if (response.status == "success") {
                        history.back();
                        closePopUp();
                        alert("We received your submission, thank you!");
                    } else if (response.code === 422) {
                        alert("Field validation failed");
                        $.each(response.errors, function (key) {
                            $('[name="' + key + '"]').addClass('formcarry-field-error');
                        });
                    } else {
                        alert("An error occured: " + response.message);
                    }
                },
                error: function (jqXHR, textStatus) {
                    const errorObject = jqXHR.responseJSON

                    alert("Request failed, " + errorObject.title + ": " + errorObject.message);
                },
                complete: function () {
                    // This will be fired after request is complete whether it's successful or not.
                    // Use this block to run some code after request is complete.
                }
            });
        });
    });
}

$(document).ready(main());
