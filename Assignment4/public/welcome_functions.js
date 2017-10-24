window.onload = function()
{
    if (JSON.parse(sessionStorage.getItem("alreadyVisited")) != "yes")
    {
        //setting the color settings for the game to default values
        var ballColor = new String("white");
        var backgroundColor = new String("black");
        var timerColor = new String("white");

        var menuBackgroundColor = new String("white");
        var menuRecordsColor = new String("black");

        //storing the settings into session storage so the user can reload the page and traverse to different pages without losing their settings
        sessionStorage.setItem("ballColor", JSON.stringify(ballColor));
        sessionStorage.setItem("backgroundColor", JSON.stringify(backgroundColor));
        sessionStorage.setItem("timerColor", JSON.stringify(timerColor));

        sessionStorage.setItem("menuBackgroundColor", JSON.stringify(menuBackgroundColor));
        sessionStorage.setItem("menuRecordsColor", JSON.stringify(menuRecordsColor));

        //string that will be set to 'yes' and act as a flag to indicate that default settings were already set and to not rewrite the data upon revisit
        var alreadyVisitedHomePage = new String("yes");
        sessionStorage.setItem("alreadyVisited", JSON.stringify(alreadyVisitedHomePage));
    }

    //draw the menu background and records with their current color settings
    var menuBackground = document.body;
    var menuRecords = document.getElementById("display_records");

    menuBackground.style.backgroundColor = JSON.parse(sessionStorage.getItem("menuBackgroundColor"));
    menuRecords.style.color = JSON.parse(sessionStorage.getItem("menuRecordsColor"));
}

//function that is called everytime the 'start_button' is pressed
function startGame()
{
    //obtaining references to three different objects from the html page
    var startButton = document.getElementById("start_button");
    var difficultySlider = document.getElementById("difficulty_slider");
    var displayValue = document.getElementById("display_value");

    //going to obtain the browser's window size so the lowest dimension can dictate the largest radius circle that the user can choose to be drawn and play with
    var width = window.innerWidth;
    var height = window.innerHeight;

    //setting the maximum radius to be half the lowest screen dimension and subtracting 1 from the total to ensure at least one possible circle can be drawn
    //hardcoding 45 because the program won't allow the ball to cover up the timer, which is 45 pixels wide. This would be more than enough space to 
    //prevent any infinite loops of trying to find a valid new ball location
    var maximumRadius = Math.floor(Math.min((width - 45), height) / 2) - 1;

    //reflecting this upper bound for the difficulty slider
    difficultySlider.max = maximumRadius;

    //adding an event listener that will activate everytime the user changes the slider position - will set the text box 'displayValue' to the current slider value
    difficultySlider.addEventListener("change", function(){
        displayValue.value = difficultySlider.value;
    }, false);

    //adding an event listener that will activate everytime the user changes the value inside the text box and presses enter - will set the slider to the current text value
    displayValue.addEventListener("change", function(){
        if(displayValue.value > maximumRadius) 
        {
            displayValue.value = maximumRadius; 
        }
        difficultySlider.value = displayValue.value;
    }, false);
    
    //at the start of the app, the top button will say 'play' and when clicked it will change the button text to 'start' and make visible the difficulty slider and text box
    if (startButton.value == "play")
    {
        startButton.value = "start";
        difficultySlider.style.visibility = "visible";
        displayValue.style.visibility = "visible";
    }
    //if the 'start_button' has the text 'start' when clicked... 
    else if (startButton.value == "start")
    {
        //...and the slider value is set to something besides 0, then the game will start
        if (difficultySlider.value != 0)
        {
            //store the value of the difficulty_slider into the current session before switching the new url
            var radius = new Number(difficultySlider.value);
            sessionStorage.setItem("ballRadius", JSON.stringify(radius));

            //make a call to the server and get the erb template for the game and run it
            window.location.href = "/start_game";
        }
        //..and the slider value is still 0, then change the button text back to 'play' and hide the slider and text box
        else
        {
            startButton.value = "play";
            difficultySlider.style.visibility = "hidden";
            displayValue.style.visibility = "hidden";
        }
    }
}

//function that is called everytime the 'records_button' is clicked
function loadRecordsSelection()
{
    //obtain references to all the elements on the web page that refer to records
    var recordsButton = document.getElementById("records_button");
    var allTimeHighestButton = document.getElementById("all_time_highest");
    var mostRecentButton = document.getElementById("most_recent");
    var searchByName = document.getElementById("by_name");
    var name_box = document.getElementById("search_name_box");
    var displayRecords = document.getElementById("display_records");

    //recordsButton's value will be toggled between 'records' and 'hide' so that the user can decide if they want to have the records displayed or not
    if (recordsButton.value == "records")
    {
        //if the user presses the 'records' button, then show all the possible options to sort the records by
        recordsButton.value = "hide";
        allTimeHighestButton.style.visibility = "visible";
        mostRecentButton.style.visibility = "visible";
        searchByName.style.visibility = "visible";
        displayRecords.style.visibility = "visible";
    }

    else if (recordsButton.value == "hide")
    {
        //if the user presses the 'hide' button, then hide all the possible options that relate to sorting the records
        recordsButton.value = "records";
        allTimeHighestButton.style.visibility = "hidden";
        mostRecentButton.style.visibility = "hidden";
        searchByName.style.visibility = "hidden";
        name_box.style.visibility = "hidden";
        displayRecords.style.visibility = "hidden";
    }
}

//onclick function for button with 'all_time_highest' id 
function loadAllTimeHighest()
{
    //tell the user that their request went through and send a get call to the server
    alert("loading all time highest");
    window.location.href = "/records_all_time";
}

//onclick function for button with 'most_recent' id
function loadMostRecent()
{
    //tell the user that their request went through and send a get call to the server
    alert("loading most recent");
    window.location.href = "/records_most_recent";
}

//onclick function for button with 'by_name' id
function loadWithName()
{
    //variable that stores the reference to the 'search_name_box' input text element
    var name_box = document.getElementById("search_name_box");

    //because the user wants to search for records with a specific name, show the input text element to the user
    name_box.style.visibility = "visible";

    //add an event listener to the input text that will wait for the user to enter data and press enter
    name_box.addEventListener("change", function(){
        //once the user presses enter, create an expression with the data the user entered to make a get call to the server
        var entryName = new String("/records_by_name/" + name_box.value);

        //alert the user that their request has been sent and to check for changes
        alert("loading with name: " + name_box.value);
        window.location.href = entryName;
    }, false);
}

//onclick function for button with 'settings_button' id
function loadSettings()
{
    //make a call to the server and get the erb template for the settings and run it
    window.location.href = "/settings";
}