function start_game()
{
    //start game - link game html canvas
    window.location.href = "/start_game";
}

function load_records_selection()
{
    //show 3 more buttons - top 5 all time, top 5 most recent, all time
}





function change_timer_button_text()
{
    var elem = document.getElementById("timer_button");
    if (elem.value == "start")
    {
        elem.value = "stop";
    }
    else if (elem.value == "stop")
    {
        elem.value = "start";
    }
}