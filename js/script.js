/**
 * Current Variables
 * Setting default channel to sevenContinents
 */
var currentChannel = sevenContinents;
var currentLocation = {
    longitude: '48.265611',
    latitude: '11.670242',
    link: 'fehlt.verpassen.schaufel'
};

/**
 * Message Constructor
 */
function Message(text){
    this.createdBy = currentLocation.link;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date(Date.now());
    this.expiresOn = new Date(Date.now());
    this.expiresOn.setMinutes(this.expiresOn.getMinutes() + 15);
    this.text = text;
    this.own = true;
}

/* #6 start the #external #action and say hello */
console.log("App is alive");
console.log(currentLocation);


/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channel) {
    //Perform the channel switch only when different channel is selected
    if(channel != currentChannel){
        //Log the channel switch
        console.log("Tuning in to channel");
        currentChannel = channel;
        console.log(currentChannel);

        //Write the new channel to the right app bar
        document.getElementById('channel-name').innerHTML = channel.name;

        //#6 change the #channel #location
        //document.getElementById('channel-location').setAttribute('href', 'https://map.what3words.com/' + channel.createdBy);
        $('#channel-location strong').html(channel.createdBy);

        /* #6 #liking channels on #click */

        //starring
        channel.starred ? ($('#chat h1 i').attr('class', 'fas fa-star')) : ($('#chat h1 i').attr('class', 'far fa-star'));

        /* #6 #highlight the selected #channel.
        This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
        $('#channels li').removeClass('selected');
        $('#channels li:contains(' + channel.name + ')').addClass('selected');
    }
}

/* #6 #liking a channel on #click */
function star() {

    $('#chat h1 i').toggleClass('fas');
    $('#chat h1 i').toggleClass('far');



    if($('#chat h1 i').hasClass('fas')){
        // starring
        currentChannel.starred = true;
    } else{
        // unstarring
        currentChannel.starred = false;
    }
    
    
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/**
 * sending Messages 
 */
function sendMessage(){
    var input = $('#userInput').val();
    var newMessage = new Message(input);
    console.log(newMessage);
    $('#messages').append(createMessageElement(newMessage));
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
    $('#userInput').val('');

}

/**
 * transforming messages to html element
 */
function createMessageElement(messageObject){
    var expiresIn = getTimeToExpire(messageObject.expiresOn);
    var createdIn = getCreationTime(messageObject.createdOn);
    var ownMessage = messageObject.own ? ' own' : '';
    var newMessageHTMLtext = '<div class="message' + ownMessage + '">' + 
                                '<h3><a href="https://map.what3words.com/' + messageObject.createdBy + '"' + 
                                ' target="_blank"><strong> ' + messageObject.createdBy + '</strong></a> ' + 
                                    createdIn + ' <em>' + expiresIn + 'min. left</em></h3>' + 
                                '<p>' + messageObject.text + '</p>' +
                                '<button>+5 min.</button>' +  
                            '</div>';
    console.log(newMessageHTMLtext);
    return newMessageHTMLtext;

}

/**
 * helper functions to obtain message parameters
 */
function getTimeToExpire(date){
    var diff = Math.abs(new Date(Date.now()) - date);
    var minutes = Math.floor((diff/1000)/60);
    return minutes;
}

function getCreationTime(date){
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day = days[ date.getDay() ];
    var month = months[date.getMonth()];
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var creationTime = day + ', ' + month + ' ' + date.getDay() + 'th, ' + hours + ':' + minutes;
    return creationTime;
}

/**
 * create channels dynamically
 */

 function listChannels(){
    var newChannel = createChannelElement(yummi);
    $('ul').append(newChannel);
    var newChannel = createChannelElement(sevenContinents);
    $('ul').append(newChannel);
    var newChannel = createChannelElement(killerApp);
    $('ul').append(newChannel);
    var newChannel = createChannelElement(firstPersonOnMars);
    $('ul').append(newChannel);
    var newChannel = createChannelElement(octoberFest);
    $('ul').append(newChannel);
 }

 /**
  * create channel element
  */
 function createChannelElement(channelObject){
    
    var newListElement = $('<li>').attr('onclick', 'switchChannel('+ channelObject.varname +')').html(
                                    channelObject.name).append(
                                        $('<span>').addClass('channel-meta')
                                            .append($('<i>').addClass(channelObject.starred ? 'fas fa-star' : 'far fa-star'))
                                            .append($('<span>').html(channelObject.expiresIn + 'min'))
                                            .append($('<span>').html(channelObject.messageCount + 'new'))
                                            .append($('<i>').addClass('fas fa-chevron-right')));
            

    return newListElement;
 }


