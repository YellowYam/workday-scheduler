//Mem. Check for day change, and clear timeblock data on new days.
//Mem. Capture screenshot when color scheme can be seen.

var currentDay = $('#currentDay');  // References the jumbotron date display

var today = moment().format('dddd, MMMM Do'); //Calls Moment.js to calculate the day for the display

var container = $('.container');  //References the skeleton container that came with the assignment

$( function() {         // Begins the ready function
    //Set day for jumbotron
    $(currentDay).text(today);

    //Render timeblock input background colors
    function renderTimeblockColors() {
        var hour = moment().hour();  

        for(let i = 0; i < $(container).children().length; i++){  //For each timeblock
            if(hour > $(container).children().eq(i).index() + 9){    // Compare the moment.js hour to the 
                $(container).children().eq(i)                        // timeblock hour, and fill in the 
                   .find('textarea')                                 // background color accordingly.
                   .addClass('bg-light');
            }
            else if(hour === $(container).children().eq(i).index() + 9){
                $(container).children().eq(i)
                .find('textarea')
                .addClass('bg-danger');
            }
            else{
                $(container).children().eq(i)
                .find('textarea')
                .addClass('bg-success');
            }
        }
    }

    //Get timeblock info from local storage
    function getTimeblockInfo(){

        var timeBlockInfo = ['','','','','','','','','']; //An array for each of the 9 workday hours

        if(JSON.parse(localStorage.getItem('timeBlockInfo')) == null){
            return timeBlockInfo;
        }
        else{
             timeBlockInfo = JSON.parse(localStorage.getItem('timeBlockInfo'));
             return timeBlockInfo;
        }
    };

    //Render timeblock info to timeblocks
    function renderTimeblockInfo(){

        var timeBlockInfo = getTimeblockInfo(); //Get timeblock info from storage


        for(let i = 0; i < $(container).children().length; i++){  //For each timeblock
            $(container).children().eq(i).find('textarea').val(timeBlockInfo[i]); //Print the value from storage
        }
    }

    //Save timeblock info to local storage

    function saveTimeblockInfo(event){
        var target = event.target;
        var input = $(target).parent()
                          .find('textarea').val().trim();
        var timeBlockInfo = JSON.parse(localStorage.getItem('timeBlockInfo'));

            if(timeBlockInfo == null){
                timeBlockInfo = ['','','','','','','','','']; //An array for each of the 9 workday hours
            }

            timeBlockInfo[$(target).parent().index()] = input;
            localStorage.setItem('timeBlockInfo', JSON.stringify(timeBlockInfo));
        
    };

    renderTimeblockColors();
    renderTimeblockInfo();

    $(container).on('click', '.btn', saveTimeblockInfo) //Add event listener to the save buttons
});
