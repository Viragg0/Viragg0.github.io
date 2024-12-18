function Traditional (value)
{
    let plus = 2;
    setTimeout(function ()
        {
            console.log(value + plus);
        }, 2000);
}

function Arrow(value)
{
    let plus = 2;
    setTimeout(() =>
    {
        console.log(value + plus);
    }, 2000);
}

let myObject = {
    property: "Hello,",
    greet: function () {
        console.log(this.property + " world!");
    }
};

myObject.greet();
Traditional(42);
Arrow(54);
