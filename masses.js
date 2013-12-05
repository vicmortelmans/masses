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
            select: "col0\x3e\x3e1",
            from: "1S3bnTRuZaeL7VOJq1FrImOKXH2mW81Et8n3Y-9Q",
            where: ""
        },
        options: {
            styleId: 2,
            templateId: 2
        }
    });
    
    // Try W3C Geolocation (Preferred)
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
