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

            //change to the location of the game
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

function loadRecordsSelection()
{
    var recordsButton = document.getElementById("records_button");
    var allTimeHighestButton = document.getElementById("all_time_highest");
    var mostRecentButton = document.getElementById("most_recent");
    var searchByName = document.getElementById("by_name");
    var displayRecords = document.getElementById("display_records");

    if (recordsButton.value == "records")
    {
        recordsButton.value = "hide";
        allTimeHighestButton.style.visibility = "visible";
        mostRecentButton.style.visibility = "visible";
        searchByName.style.visibility = "visible";

        displayRecords.style.visibility = "visible";
    }

    else if (recordsButton.value == "hide")
    {
        recordsButton.value = "records";
        allTimeHighestButton.style.visibility = "hidden";
        mostRecentButton.style.visibility = "hidden";
        searchByName.style.visibility = "hidden";
        displayRecords.style.visibility = "hidden";
    }

    
}

function loadAllTimeHighest()
{
    alert("loading all time highest");
    window.location.href = "/records_all_time";
}

function loadMostRecent()
{
    alert("loading most recent");
    window.location.href = "/records_most_recent";
}

function loadWithName()
{
    var name_box = document.getElementById("search_name_box");
    name_box.style.visibility = "visible";
    name_box.addEventListener("change", function(){
        var entryName = new String("/records_by_name/" + name_box.value);
        window.location.href = entryName;
        alert("loading with name");
    }, false);
}