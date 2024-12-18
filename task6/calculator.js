function calculate_price()
{
    console.log("Я запустился");
    let product = document.getElementById("products").value;
    let n = document.getElementById("number").value;
    if (!isNaN(n) && parseFloat(parseInt(n)) == parseFloat(n) && n >= 1)
    {
        let cost = n * product;
        cost = cost.toFixed(2);
        document.getElementById("result").textContent = cost + " руб.";
    }
    else
    {
        document.getElementById("result").textContent = "Неправильный формат ввода кол-ва товара";
    }
}

let checked_type = -1;
function display_on(elem_id)
{
    console.log(elem_id + " display_on");
    document.getElementById(elem_id).style.display = "flex";
}

function display_off(elem_id)
{
    console.log(elem_id + " display_off");
    document.getElementById(elem_id).style.display = "none";
}

function telephone_extend()
{
    display_on('telephone_add');
    display_off('case_add');
    checked_type = 0;
}

function case_extend()
{
    display_on('case_add');
    display_off('telephone_add');
    checked_type = 1;
}

function headphone_extend()
{
    display_off('case_add');
    display_off('telephone_add');
    checked_type = 2;
}

function calculate_price_items()
{
    console.log("Я запустился items");
    let n = document.getElementById("number_items").value;
    if (!isNaN(n) && parseFloat(parseInt(n)) == parseFloat(n) && n >= 1)
    {
        console.log(checked_type);
        switch (checked_type)
        {
            case 0:
            {
                console.log('case0');
                let cost = 49990;
                let checkboxes = document.getElementsByClassName('checkbox_telephone');
                console.log(checkboxes);
                for (let i = 0; i < 4; i++) {
                    if (checkboxes[i].checked) {
                        cost += parseInt(checkboxes[i].value);
                    }
                }
                cost *= n;
                cost = cost.toFixed(2);
                document.getElementById("result_items").textContent = cost + " руб.";
                break;
            }
            case 1:
            {
                console.log('case1');
                let cost = document.getElementById("colors").value * n;
                cost = cost.toFixed(2);
                document.getElementById("result_items").textContent = cost + " руб.";
                break;
            }
            case 2:
            {
                console.log('case2');
                let cost = 9990 * n;
                cost = cost.toFixed(2);
                document.getElementById("result_items").textContent = cost + " руб.";
                break;
            }
        }
    }
    else
    {
        document.getElementById("result_items").textContent = "Неправильный формат ввода кол-ва товара";
    }
}
