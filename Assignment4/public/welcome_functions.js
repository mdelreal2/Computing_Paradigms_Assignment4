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
    ///////
    ///////May need to change this to have -1 to make sure the game will be able to draw atleast one circle
    ///////
    //setting the maximum radius to be half the lowest screen dimension
    var maximumRadius = Math.floor(Math.min(width, height) / 2);

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
            var radius = new Number(difficultySlider.value);
            //store the value of the difficulty_slider into the current session before switching the new url
            sessionStorage.setItem("ballRadius", JSON.stringify(radius));

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
    //show 3 more buttons - top 5 all time, top 5 most recent, all time
}