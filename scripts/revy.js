/**
 * Created by Olav Bech Br&aring;ten on 17.11.2015.
 *
 * ##    ##  ########  ##    ##    ########  ##    ##  ########  #######   ########
 * ##    ##  ##         ##  ##        ##     ##    ##  ##        ##    ##  ##
 * ##    ##  ####        ####         ##     ##    ##  ####      ##   ##   ####
 * ########  ##           ##          ##     ########  ##        #####     ##
 * ##    ##  ##           ##          ##     ##    ##  ##        ##  ##    ##
 * ##    ##  ##           ##          ##     ##    ##  ##        ##   ##   ##
 * ##    ##  ########     ##          ##     ##    ##  ########  ##    ##  ########
 *   ######  ########  ##    ##  ##    ##
 * ##        ##         ##  ##    ##  ##
 * ##        ####        ####      ####
 *   ####    ##           ##        ##
 *       ##  ##          ####       ##
 *       ##  ##         ##  ##      ##
 * ######    ########  ##    ##     ##
 *
 */
var SlideSpeed = 500;
var isMoving = false;
var currActor = 0;
var targetDate = new Date("2016-01-08T19:00:00.000Z").getTime();

var actors = {
    0: {
        "name": "Annvei Wathne",
        "image": "images/actors/Annvei-cover.jpg",
        "text": "F&oslash;rste &aring;ret p&aring; Rud VGS grillet vi og hygget oss. Plutselig fikk venninnen min en fugleb&aelig;sj p&aring; skulderen. Jeg lo s&aring; godt av det hele, men sekunder senere spl&aelig;ttet det en i pannen min som rant ned i munnviken og blandet seg med marsmallowsene.",
        "selvironi": 8,
        "snillhet": 7,
        "treffsikkerhet": 4,
        "danseferdigheter": 9
    },
    1: {
        "name": "Halvor Schultz",
        "image": "images/actors/Halvor-cover.jpg",
        "text": "Var lettere beruset og pr&oslash;vde &aring; klate over gjerdet p&aring; slottsfjell, ble tatt og unnskyldte meg med at jeg var Jonas Alaska. Ble utestengt fra resten av festivalen. Jeg hadde billett.",
        "selvironi": 9,
        "snillhet": 10,
        "treffsikkerhet": 6,
        "danseferdigheter": 7
    },
    2: {
        "name": "Julie Larsen",
        "image": "images/actors/Julie-cover.jpg",
        "text": "Jeg sovnet p&aring; do imens jeg tappet i badekaret. V&aring;knet av en kilende f&oslash;lelse p&aring; beina. Fukt- og vannskadene kom p&aring; 300 000kr. M&aring;tte avlyse sommerferien til Maldivene.",
        "selvironi": 7,
        "snillhet": 9,
        "treffsikkerhet": 3,
        "danseferdigheter": 6
    },
    3: {
        "name": "Mathilde Martinsen L&#248;naas",
        "image": "images/actors/Mathilde-cover.jpg",
        "text": "P&aring; scenen, if&oslash;rt et idiotisk blomsterkostyme, l&oslash;p jeg rett inn i en kulissevegg p&aring; to meter som treffer en p&aring; f&oslash;rste rad i hodet. I &oslash;yeblikkets hete tenkte jeg det lureste var &aring; gj&oslash;re meg s&aring; stor som mulig og fortsette forestillingen som kulissen.",
        "selvironi": 9,
        "snillhet": 8,
        "treffsikkerhet": 6,
        "danseferdigheter": 6
    },
    4: {
        "name": "Jonathan Johannesen",
        "image": "images/actors/Jonathan-cover.jpg",
        "text": "Jeg har en irrasjonell forkj&aelig;rlighet for Taylor Swifts \"Love Story\". Jeg sitter igjen like verdighetsl&oslash;s hver gang noen catcher meg i &aring; lytte til den.. <br/><br/>..mens jeg synger med..<br/><br/>..Og gr&aring;ter..",
        "selvironi": 9,
        "snillhet": 8,
        "treffsikkerhet": 6,
        "danseferdigheter": 5
    },
    5: {
        "name": "Margrete Skretting Bergset",
        "image": "images/actors/Margrete-cover.jpg",
        "text": "Satt i stua, og samtidig i min egen verden, med st&oslash;ytempende headsett p&aring;. Rapte. H&oslash;yt. S&aring; opp fra datamaskinen og rett i &oslash;ynene p&aring; min brors kamerat. Stirret ham inn i &oslash;ynene i fem sekunder f&oslash;r jeg vendte tilbake til dataskjermen.",
        "selvironi": 10,
        "snillhet": 8,
        "treffsikkerhet": 0,
        "danseferdigheter": 7
    },
    6: {
        "name": "Fredrik Nielsen Aure",
        "image": "images/actors/Fredrik-cover.jpg",
        "text": "Som en ellers pliktoppfyllende ansatt i brillebutikk glemte jeg en gang &aring; sp&oslash;rre om NAV-papirer. Sendte ut kunde med briller til 8000Kr uten &aring; ta betalt. N&aring; g&aring;r jeg med VG annen hver s&oslash;ndag.",
        "selvironi": 10,
        "snillhet": 10,
        "treffsikkerhet": 10,
        "danseferdigheter": 10
    },
    7: {
        "name": "Una Solvik Golmen",
        "image": "images/actors/Una-cover.jpg",
        "text": "Jeg sto glad, forn&oslash;yd og solbrun en sen sommerkveld og pratet med en attraktiv type. Han sa jeg minnet han om noen. I all min beskjedenhet h&oslash;rte jeg navn som \"Zooey Deschanel\" og \"Winona Ryder\". Det endte med at han kalte meg Wallace og lurte p&aring; hvor hunden min var.",
        "selvironi": 9,
        "snillhet": 7,
        "treffsikkerhet": 9,
        "danseferdigheter": 4
    },
    8: {
        "name": "H&aring;vard Jackwitz",
        "image": "images/actors/Havard-cover.jpg",
        "text": "Jeg sa til blind gutt som hadde sett meg spille Robin Hood: \"Takk for at du kom og s&aring; p&aring;. Alts&aring;, likte du musikken eller? Shit, jeg kan fikse gratis popcorn til deg jeg...\"",
        "selvironi": 7,
        "snillhet": 8,
        "treffsikkerhet": 5,
        "danseferdigheter": 6
    }
};

$(document).ready(function() {
    showActor(0, true);
    countdown();
});

function CurrentMargin() {
    // get current margin of slider
    var currentMargin = $("#slider-container").css("margin-left");

    // first page load, margin will be auto, we need to change this to 0
    if (currentMargin == "auto") {
        currentMargin = 0;
    }

    // return the current margin to the function as an integer
    return parseInt(currentMargin);
}

function nextSlide(auto) {
    // Set values
    if (isMoving) return;
    isMoving = true;

    var SlideWidth = parseInt($("#slider-parent").css("width"));
    var fullWidth = parseInt($("#slider-container").css("width"));
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() - SlideWidth;

    //Loop when end of slideshow
    if (newMargin <= -1 * fullWidth) {
        newMargin = 0;
    }

    // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-container").animate({ marginLeft: newMargin }, SlideSpeed, function () { isMoving = false });
    $("#slider-container").marginLeft += newMargin % SlideWidth;


    if (!auto) clearInterval(sliderTimer);
}

function previousSlide() {
    if (isMoving) return;
    isMoving = true;
    // Set values
    SlideWidth = parseInt($("#slider-parent").css("width"));
    fullWidth = parseInt($("#slider-container").css("width"));
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() + SlideWidth;

    //Loop backs
    if (newMargin > 0) {
        newMargin = -1 * fullWidth + SlideWidth;
    }

    // slide the wrapper to the right to show the previous panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-container").animate({ marginLeft: newMargin }, SlideSpeed, function () { isMoving = false });
    clearInterval(sliderTimer);
}

function showActor(actor, auto) {
    currActor = actor;

    //Remove any borders
    for (i =0; i < 9; i++) {
        $("#actor" + i).css("border", "none");
        $("#actor" + i).css("opacity", "0.5");
    }

    $("#connector").animate({height: 0}, 200, function() { $("#connector").css("left", $("#actor" + actor).position().left +  $("#actor" + actor).width()/2 - $("#connector").width()/2); });

    $("#connector").animate({height: "10vh"}, 200, function() {
        //Add border to currently selected
        $("#actor" + actor).css("border",  "3px solid #dc00ea");
        $("#actor" + actor).css("opacity", "1");

        //Update text and image
        $("#actorName").html(actors[actor]["name"]);
        $("#actorContainer").css("background-image", "url(" + actors[actor]["image"] + ")");
        $("#actorText").html(actors[actor]["text"]);

        //Resize all meters
        resizeMeter("#ironyMeter", actors[actor]["selvironi"]);
        resizeMeter("#niceMeter", actors[actor]["snillhet"]);
        resizeMeter("#accuracyMeter", actors[actor]["treffsikkerhet"]);
        resizeMeter("#danceMeter", actors[actor]["danseferdigheter"]);
    });
    //Remove auto-scroll on interaction
    if (!auto) clearInterval(actorTimer);
}

function resizeMeter(meter, size) {
    //Set size as a precentage
    var newSize = size * 10 + "%";
    $(meter).animate({width: newSize});
}

//Cycle through all the actors
function cycleActors() {
    currActor++;
    if (currActor >= 9) currActor = 0;
    showActor(currActor, true);
}

function setCountdown(days, hours, minutes, seconds) {
    $("#days").html(days > 9 ? days : "0" + days);
    $("#hours").html(hours > 9 ? hours : "0" + hours);
    $("#minutes").html(minutes > 9 ? minutes : "0" + minutes);
    $("#seconds").html(seconds > 9 ? seconds : "0" + seconds);
}

function countdown() {
    var timeLeft = (targetDate - new Date().getTime()) / 1000;
    if (timeLeft <= 0) setCountdown(0,0,0,0);

    var days = parseInt(timeLeft / (60*60*24));
    timeLeft %= (60*60*24);

    var hours = parseInt(timeLeft / (60*60));
    timeLeft %= (60*60);

    var minues = parseInt(timeLeft / (60));
    timeLeft %= 60;

    setCountdown(days, hours, minues, parseInt(timeLeft));
}

//Automatically change slides
var sliderTimer = setInterval("nextSlide(true)", 10000);
var actorTimer = setInterval("cycleActors()", 10000);
var countdownTimer = setInterval(countdown, 1000);