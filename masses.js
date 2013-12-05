function initialize() {
    google.maps.visualRefresh = true;
    var mapDiv = document.getElementById('map-canvas');
    var map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(51.213282784793925, 4.427805411499094),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    layer = new google.maps.FusionTablesLayer({
        map: map,
        heatmap: {
            enabled: false
        },
        query: {
            select: "col0\x3e\x3e2",
            from: "1JsfBqBIs-A9Buvs-smPqrNn4iBgJ6Ckn7GbONJM",
            where: ""
        },
        options: {
            styleId: 2,
            templateId: 2,
            suppressInfoWindows: true
        }
    });
    
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
    
    google.maps.event.addListener(layer, 'click', function(e) {
        $("#map-canvas").hide();
        return e;
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
