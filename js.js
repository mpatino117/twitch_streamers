/**********************************************
USER NAME PROVIDED BY FREECODE CAMP FOR SPECIFIC API NAMES

**************************************************/

var usernames = ["freecodecamp", "storbeck", "AngryJoeShow", "habathcx",
    "RobotCaleb", "defrancogames", "noobs2ninjas", "beohoff", "ESWC"
];
/**********************************************
CALL FUNCTION TO OBAIN INFORMATION THROUGH THE TWITCH API

**************************************************/

function getTwitchInfo() {
    usernames.forEach(function(channel) {
        function createUrl(type, name) {
            return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?';
        };
     
        /**********************************************
GETJSON FUNCTION TO CHECK IF USER STREAM IS AVAILABLE

**************************************************/
     
        $.getJSON(createUrl("streams", channel), function(data) {
            var game,
                status;

            if (data.stream === null) {
                game = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                game = "Account Closed";
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            };

            /**********************************************
GETJSON FUNCTION TO CHECK IF USER STREAM IS AVAILABLE

**************************************************/

            $.getJSON(createUrl("channels", channel), function(data) {

                // var iconLogo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
                var iconLogo = "";
                if (data.logo != null) {
                    iconLogo = data.logo;
                } else {
                    iconLogo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
                }
                var nameD = data.display_name != null ? data.display_name : channel;
                var displayStatus = data.stream == null ? " " : ":" + data.status;

                /**********************************************
HTML TO DEPLOY ON TO  INDEX.HTML

**************************************************/

                var html = '<div class="row ' +
                    status + '" id="row" >' + '<div class="col-xs-2 col-sm-1" id="icon">' + '<img src="' +
                    iconLogo + '" class="logo"> </div> <div class="col-xs-10 col-sm-3" id="name"><a href="' +
                    data.url + '" target="_blank">' + nameD + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">' +
                    game + '<span class="hidden-xs">' +
                    displayStatus + '</span></div></div>';

                status === "online" ? $("#display").prepend(html) : $("#display").append(html);

            });

        });
    });

};

/**********************************************
GETJSON FUNCTION TO CHECK IF USER STREAM IS AVAILABLE

**************************************************/

$(document).ready(function() {
    getTwitchInfo();
    $(".selector").click(function() {
        $(".selector").removeClass("active");
        $(this).addClass("active");
        $(".selector").removeClass("active");
        var status = $(this).attr('id');
        if (status === "all") {
            $(".online, .offline").removeClass("hidden");
        } else if (status === "online") {
            $(".online").removeClass("hidden");
            $(".offline").addClass("hidden");
        } else {
            $(".offline").removeClass("hidden");
            $(".online").addClass("hidden");
        }
    });

});