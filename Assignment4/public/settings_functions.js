var ballColorTextBox;
var backgroundColorTextBox;
var timerColorTextBox;

window.onload = function()
{
    //if the user were to navigate to the settings page without having come from the home page, redirect them so that 
    //the default settings can be loaded
    if(sessionStorage.getItem('ballColor') == null)
    {
        alert("You must visit the home page first");
        window.location.href = "/";
    }

    //otherwise the defualt/custom settings are safe to load and should proceed

    //obtain references to the three five box elements that will set the color settings
    ballColorTextBox = document.getElementById("game_ball_color_input");
    backgroundColorTextBox = document.getElementById("game_background_color_input");
    timerColorTextBox = document.getElementById("game_timer_color_input");

    menuBackgroundColorTextBox = document.getElementById("menu_background_color_input");
    menuRecordsColorTextBox = document.getElementById("menu_records_color_input");

    //set the text box values to their current respective color values
    ballColorTextBox.value =  JSON.parse(sessionStorage.getItem("ballColor"));
    backgroundColorTextBox.value =  JSON.parse(sessionStorage.getItem("backgroundColor"));
    timerColorTextBox.value =  JSON.parse(sessionStorage.getItem("timerColor"));

    menuBackgroundColorTextBox.value = JSON.parse(sessionStorage.getItem("menuBackgroundColor"));
    menuRecordsColorTextBox.value = JSON.parse(sessionStorage.getItem("menuRecordsColor"));
}

//onclick function that will be called everytime the 'apply_settings_button' is pressed
function checkIfValidColors()
{
    //boolean value that will be toggled to false if any one of the text boxes contains an invalid color name
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

    if(!isValidColor(menuBackgroundColorTextBox.value))
    {
        alert("invalid color in Menu Background Color Text Box");
        validColors = false;
    }

    if(!isValidColor(menuRecordsColorTextBox.value))
    {
        alert("invalid color in Records Background Color Text Box");
        validColors = false;
    }

    //if all the values inside the text boxes are recognized as valid colors, then...
    if (validColors == true)
    {
        //create a String Object for every text box value so that it can be stringified and stored
        var ballColor = new String(ballColorTextBox.value);
        var backgroundColor = new String(backgroundColorTextBox.value);
        var timerColor = new String(timerColorTextBox.value);

        var menuBackgroundColor = new String(menuBackgroundColorTextBox.value);
        var menuRecordsColor = new String(menuRecordsColorTextBox.value);

        //store the new color values with their respective keys
        sessionStorage.setItem("ballColor", JSON.stringify(ballColor));
        sessionStorage.setItem("backgroundColor", JSON.stringify(backgroundColor));
        sessionStorage.setItem("timerColor", JSON.stringify(timerColor));

        sessionStorage.setItem("menuBackgroundColor", JSON.stringify(menuBackgroundColor));
        sessionStorage.setItem("menuRecordsColor", JSON.stringify(menuRecordsColor));

        //alert the user that the color requests were valild and were set properly and then go back to the main page
        alert("Color changes were recorded!");
        window.location.href = '/';
    }
}

//helper function that will take in a color and determine whether or not it is valid
function isValidColor(color)
{
    //boolean value that will be toggled to false, if the passed in color is not identified as valid
    retval = true;

    //'test_color_button' is a hidden button on the page with no purpose except to change its color (will never appear)
    //and note whether the color changes or not.
    var testButton = document.getElementById("test_color_button");

    //color that will used to check if it has changed, if it has, then the color the user entered is valid, otherwise reject their input
    testButton.style.backgroundColor = "#000000";

    //if the user's entered color does not change the testButton's color, then the color was invalid
    testButton.style.backgroundColor = color;

    //testing to see if the user's entered color changes the current 'testButton's color from its original, if not then the users color was invalid
    if (testButton.style.backgroundColor == "rgb(0, 0, 0)")
    {
        retval = false;
    }
    
    return retval;
}