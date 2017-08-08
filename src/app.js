(function() {

function initPlayer(response) {
    var $playerEl = $('.player__wrapper');
    var playerInstance = new Player(response, $playerEl);
}

function onSuccess(data) {
    var trackData = JSON.parse(data);
    initPlayer(trackData);
}

function onError(err) {
    alert('There is some error getting the data');
}

function initApp() {
    SpotifyApi.getTracksData().then(onSuccess, onError);
}

$(initApp);

})();
