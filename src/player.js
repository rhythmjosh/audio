
function Player(tracksObj, playerMarkupTargetEl) {

    var tracksArray = tracksObj.tracks;
    var artistName = tracksObj.artist;
    var currentTrackIndex = 0;
    var markupReferences = {};

    var DEFAULT_PREVIEW_TIME = 30;
    var isPaused = false;
    var totalTime = 0;

    function init() {
        if(!playerMarkupTargetEl) {
            throw 'Missing player html target reference.';
        }

        // gather all the references here to manipulate DOM
        // this would not be needed if we use angular / react framework

        $playerEl = $(playerMarkupTargetEl);
        markupReferences.playerWrapper = $playerEl;
        markupReferences.backButton = $playerEl.find('.back__button');
        markupReferences.playButton = $playerEl.find('.play__button');
        markupReferences.pauseButton = $playerEl.find('.pause__button');
        markupReferences.forwardButton = $playerEl.find('.forward__button');
        markupReferences.audioPlayer = $playerEl.find('.audio__player')[0];

        markupReferences.audioImage = $playerEl.find('.audio__image');
        markupReferences.artistName = $playerEl.find('.artist__name');
        markupReferences.trackName = $playerEl.find('.track__name');
        markupReferences.progressBarPlaying = $playerEl.find('.progress__bar--playing');
        markupReferences.startTime = $playerEl.find('.player__start--timer');
        markupReferences.endTime = $playerEl.find('.player__stop--timer');

        bindEvents();
        renderFirstTrack();
    }

    function renderFirstTrack() {
        play();
    }


    function pause() {
        isPaused = true;
        markupReferences.audioPlayer.pause();
        markupReferences.playerWrapper.addClass('paused').removeClass('playing');
    }

    function resume() {
        markupReferences.playerWrapper.addClass('playing').removeClass('paused');
        markupReferences.audioPlayer.play();
        isPaused = false;
    }

    function play() {

        if(isPaused) {
            resume();
            return;
        }

        var track = tracksArray[currentTrackIndex];
        resetPlayState();
        loadTrack(track);
        markupReferences.playerWrapper.addClass('playing').removeClass('paused');
        markupReferences.audioPlayer.play();
        isPaused = false;

    }

    function updatePlayState() {

        var totalTime = markupReferences.audioPlayer.duration;

        if(isNaN(totalTime)) {
            return;
        }

        var formattedTotalTime = formatPlayTime(totalTime);
        markupReferences.endTime.html(formattedTotalTime);

        var currentTime = getCurrentTime();
        var percentage = currentTime * 100 / totalTime;

        markupReferences.startTime.html(formatPlayTime(currentTime));
        markupReferences.progressBarPlaying.css('width', percentage + '%');
    }

    function resetPlayState() {
        markupReferences.audioPlayer.currentTime = 0;
        markupReferences.startTime.html(formatPlayTime(0));
        markupReferences.progressBarPlaying.css('width', '0%');
    }


    function back() {
        // on 0 it will loop to last track
        if(currentTrackIndex === 0) {
            currentTrackIndex = tracksArray.length - 1;
        } else {
            currentTrackIndex--;
        }

        play();
    }

    function forward() {
        // on end of tracks it will loop to 0
        if(currentTrackIndex === tracksArray.length - 1) {
            currentTrackIndex = 0;
        } else {
            currentTrackIndex++;
        }

        play();
    }

    function loadTrack(track) {
        markupReferences.audioPlayer.src = track.url;
        markupReferences.trackName.html(track.name);
        markupReferences.artistName.html(artistName);
        markupReferences.audioImage.css("background", "url('"+ track.cover_image +"')");
    }

    function formatPlayTime(timeInSeconds) {
        var min = parseInt(timeInSeconds / 60);
        var sec = parseInt(timeInSeconds - (min * 60));

        if(min < 10) {
            min = '0'+ min;
        }
        if(sec < 10) {
            sec = '0'+ sec;
        }
        return min + ':' + sec;
    }

    function getCurrentTime() {
        return markupReferences.audioPlayer.currentTime;
    }

    function bindEvents() {
        markupReferences.backButton.on('click', back);
        markupReferences.playButton.on('click', play);
        markupReferences.pauseButton.on('click', pause);
        markupReferences.forwardButton.on('click', forward);
        markupReferences.audioPlayer.ontimeupdate = updatePlayState;
    }

    init();
}

