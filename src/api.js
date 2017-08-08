(function() {
    function getTracksData() {

        return $.ajax({
            type: 'GET',
            url: 'https://s3-us-west-1.amazonaws.com/fbx-fed-homework/fed_home_assignment_api.json'
        })
    }

    window.SpotifyApi = {
        getTracksData: getTracksData
    }


})();