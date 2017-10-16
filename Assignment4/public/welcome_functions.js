//function that is called everytime the 'start_button' is pressed
function start_game()
{
    //obtaining references to three different objects from the html page
    var start_button = document.getElementById("start_button");
    var difficulty_slider = document.getElementById("difficulty_slider");
    var display_value = document.getElementById("display_value");

    //going to obtain the browser's window size so the lowest dimension can dictate the largest radius circle that the user can choose to be drawn and play with
    var width = window.innerWidth;
    var height = window.innerHeight;
    ///////
    ///////May need to change this to have -1 to make sure the game will be able to draw atleast one circle
    ///////
    //setting the maximum radius to be half the lowest screen dimension
    var maximum_radius = Math.floor(Math.min(width, height) / 2);

    //reflecting this upper bound for the difficulty slider
    difficulty_slider.max = maximum_radius;

    //adding an event listener that will activate everytime the user changes the slider position - will set the text box 'display_value' to the current slider value
    difficulty_slider.addEventListener("change", function(){
        display_value.value = difficulty_slider.value;
    }, false);

    //adding an event listener that will activate everytime the user changes the value inside the text box and presses enter - will set the slider to the current text value
    display_value.addEventListener("change", function(){
        if(display_value.value > maximum_radius) 
        {
            display_value.value = maximum_radius; 
        }
        difficulty_slider.value = display_value.value;
    }, false);
    
    //at the start of the app, the top button will say 'play' and when clicked it will change the button text to 'start' and make visible the difficulty slider and text box
    if (start_button.value == "play")
    {
        start_button.value = "start";
        difficulty_slider.style.visibility = "visible";
        display_value.style.visibility = "visible";
    }
    //if the 'start_button' has the text 'start' when clicked... 
    else if (start_button.value == "start")
    {
        //...and the slider value is set to something besides 0, then the game will start
        if (difficulty_slider.value != 0)
        {
            window.location.href = "/start_game";
        }
        //..and the slider value is still 0, then change the button text back to 'play' and hide the slider and text box
        else
        {
            start_button.value = "play";
            difficulty_slider.style.visibility = "hidden";
            display_value.style.visibility = "hidden";
        }
    }
}

function load_records_selection()
{
    //show 3 more buttons - top 5 all time, top 5 most recent, all time
}