function isValidNumber(input) {
    return !isNaN(input) && parseFloat(parseInt(input)) == parseFloat(input) && input >= 1;
}

let checked_type = -1;

function display_on(elem_id) {
    document.getElementById(elem_id).style.display = "flex";
}

function display_off(elem_id) {
    document.getElementById(elem_id).style.display = "none";
}

function telephone_extend() {
    display_on('telephone_add');
    display_off('case_add');
    checked_type = 0;
}

function case_extend() {
    display_on('case_add');
    display_off('telephone_add');
    checked_type = 1;
}

function headphone_extend() {
    display_off('case_add');
    display_off('telephone_add');
    checked_type = 2;
}

function calculate_price_items() {
    let n = document.getElementById("number_items").value;

    if (!isValidNumber(n)) {
        document.getElementById("result_items").textContent = "Неправильный формат ввода кол-ва товара";
        return;
    }

    if (checked_type === -1) {
        document.getElementById("result_items").textContent = "Выберите тип товара.";
        return;
    }

    n = parseInt(n, 10);
    let cost = 0;

    switch (checked_type) {
        case 0: { // Телефон
            cost = 49990; // Базовая стоимость телефона
            let checkboxes = document.querySelectorAll('#checkbox_telephone input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    cost += parseInt(checkbox.value, 10);
                }
            });
            break;
        }
        case 1: { // Чехол
            cost = parseInt(document.getElementById("colors").value, 10);
            break;
        }
        case 2: { // Наушники
            cost = 9990;
            break;
        }
    }

    cost *= n;
    cost = cost.toFixed(2);
    document.getElementById("result_items").textContent = cost + " руб.";
}
