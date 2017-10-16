var ballRadius = JSON.parse(sessionStorage.getItem("ballRadius"));
var ballX = 0;
var ballY = 0;
var timer = 5000;
var score = 0;

var canvas;
var context;

var modal;

var canvasWidth = 0;
var canvasHeight = 0;

window.onload = function()
{
    //obtain a reference to the canvas on the html page to apply an event listener
    canvas = document.getElementById("canvas");
    //add an event listener to the canvas that responds to mouse clicks and sends the data of the click to isCircleClicked()
    canvas.addEventListener("mousedown", isCircleClicked, false);

    //obtain a reference to the modal record form on the html page
    modal = document.getElementById("record_form");

    //obtain a context from the canvas to alter it
    context = canvas.getContext("2d");

    //max out the size of the canvas to perfectly fit the current window size
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    //set the global variables for the canvas width and height
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    //set the starting position to be in the middle of the window
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;

    //set the fill color to black and create a rectangle that spans the size of the canvas to set the background to a continuous color
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    //set the fill color to white and create an initial circle to start the game
    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.fill();

    //draw white text with the timer value in the top left corner of the window
    context.textBaseline = "top";
    context.font = "20px arial";
    context.fillText(timer, 0, 0);
    

    //built in method that will call update() every 10 milliseconds
    var interval = setInterval(function() {
            if (timer > 0) 
            {
                update(); 
            }
            else 
            {
                stopUpdating(interval);
            }
        }, 10);
}

function isCircleClicked(event)
{
    //set the clicks position
    var x = event.pageX;
    var y = event.pageY;

    //algorithm that will decide whether or not a click's position is touching the current ball
    if (Math.sqrt((x - ballX) * (x - ballX) + (y - ballY) * (y - ballY)) <= ballRadius)
    {
        //cover up the current location of the ball
        coverCircle();

        //generate another random circle position that doesn't go outside the canvas 
        ballX = Math.floor((Math.random() * (canvasWidth - ballRadius - ballRadius)) + (ballRadius ));
        ballY = Math.floor((Math.random() * (canvasHeight - ballRadius - ballRadius)) + (ballRadius ));

        //make sure a point is selected that doesn't intersect the timer
        while (ballX - ballRadius <= 45 && ballY - ballRadius <= 20)
        {
            ballX = Math.floor((Math.random() * (canvasWidth - ballRadius - ballRadius)) + (ballRadius ));
            ballY = Math.floor((Math.random() * (canvasHeight - ballRadius - ballRadius)) + (ballRadius ));
        }

        //alert("ball postion: (" + ballX + ", " + ballY + ")\n" + "max bounds: (" + canvasWidth + ", " + canvasHeight + ")");

        //increase score counter
        score = score + 1;
    }
}

function update()
{
    //decrement the timer by ten because the timer will be updated every ten milliseconds
    timer = timer - 10;

    //set the fill style to black and draw a rectangle over the timer to make it dissapear
    context.fillStyle = "black";
    context.fillRect(0, 0, 45, 20);

    //set the fill style to white and draw text that represents the new timer value 
    context.fillStyle = "white";
    context.fillText(timer, 0, 0);

    //draw the current position of the circle (its position will be updated if the user clicks on it, 
    //and will be shown on the screen on the next 1/30 second)
    drawCircle();
}

function stopUpdating(interval)
{
    //stop the page from calling setInterval
    clearInterval(interval);

    //make visible the modal form that will display the score and request a name to create a record
    showRecordForm();
}

function coverCircle()
{
    //set the fillStyle to black to match the background so it can cover up the current circle location
    context.fillStyle = "black";
    context.beginPath();
    context.arc(ballX, ballY, ballRadius + 1, 0, 2 * Math.PI);
    context.fill();
}

function drawCircle()
{
    //set the fillStyle to white to draw a circle at the new position (set in isCircleClicked())
    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.fill();
}

function showRecordForm()
{
    //obtain references to the modal record_form, the text score_display, and the text name_entry
    var modal = document.getElementById("record_form");
    var userScore = document.getElementById("score_display");
    var userName = document.getElementById("name_entry");

    //set the value of the refernce to 'score_display' to the 'score'
    userScore.value = score;

    //adding an event listener that will activate whenever the 'name_entry' input box is changed and the user pressed enter
    userName.addEventListener("change", function(){
        //make sure the user enters in a value for the name in the input box
        if(userName.value != "")
        {
            //create objects to store the score from the game and the name the user entered
            var storeUserName = new String(userName.value);
            var storeScore = new Number(score);

            //store the name and score for the session. JSON.stringify is called to turn the object into a string so it can be parsed and returned without damage to the data
            sessionStorage.setItem("name", JSON.stringify(storeUserName));
            sessionStorage.setItem("score", JSON.stringify(storeScore));

            //send a popup that tells the user that their record was saved properly
            alert("Your record was created!");

            //go back to the welcome page
            window.location.href = "/";
        }
    }, false);

    //make visible the 'record_form' on the html page
    modal.style.display = "block";
}