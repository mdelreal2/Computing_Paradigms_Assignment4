var ballColorTextBox;
var backgroundColorTextBox;
var timerColorTextBox;

window.onload = function()
{
    ballColorTextBox = document.getElementById("ball_color_input");
    backgroundColorTextBox = document.getElementById("background_color_input");
    timerColorTextBox = document.getElementById("timer_color_input");

    ballColorTextBox.value =  JSON.parse(sessionStorage.getItem("ballColor"));
    backgroundColorTextBox.value =  JSON.parse(sessionStorage.getItem("backgroundColor"));
    timerColorTextBox.value =  JSON.parse(sessionStorage.getItem("timerColor"));
}

function checkIfValidColors()
{
    var validColors = true;
    
    if (!isValidColor(ballColorTextBox.value))
    {
        alert("invalid color in Ball Color Text Box");
        validColors = false;
    }

    if(!isValidColor(backgroundColorTextBox.value))
    {
        alert("invalid color in Background Color Text Box");
        validColors = false;
    }

    if(!isValidColor(timerColorTextBox.value))
    {
        alert("invalid color in Timer Color Text Box");
        validColors = false;
    }

    if (validColors == true)
    {
        alert("Color changes were recorded!");

        var ballColor = new String(ballColorTextBox.value);
        var backgroundColor = new String(backgroundColorTextBox.value);
        var timerColor = new String(timerColorTextBox.value);

        sessionStorage.setItem("ballColor", JSON.stringify(ballColor));
        sessionStorage.setItem("backgroundColor", JSON.stringify(backgroundColor));
        sessionStorage.setItem("timerColor", JSON.stringify(timerColor));

        window.location.href = '/';
    }
}

function isValidColor(color)
{
    retval = true;

    var testButton = document.getElementById("test_color_button");

    //color that will used to check if it has changed, if it has, then the color the user entered is valid, otherwise reject their input
    testButton.style.backgroundColor = "#000000";

    //if the user's entered color does not change the testButton's color, then the color was invalid
    testButton.style.backgroundColor = color;

    if (testButton.style.backgroundColor == "rgb(0, 0, 0)")
    {
        retval = false;
    }
    else
    {
        testButton.style.backgroundColor;
    }

    return retval;
}