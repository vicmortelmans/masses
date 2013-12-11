var tableId = '1JsfBqBIs-A9Buvs-smPqrNn4iBgJ6Ckn7GbONJM';
var locationColumn = 'col0\x3e\x3e2';

function initialize() {
    google.maps.visualRefresh = true;
    var mapDiv = document.getElementById('map-canvas');
    var map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(51.213282784793925, 4.427805411499094),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: false,
        streetViewControl: false
    });
    
    layer = new google.maps.FusionTablesLayer({
        map: map,
        heatmap: {
            enabled: false
        },
        query: {
            select: locationColumn,
            from: tableId,
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
        $('#church .content').empty();
        $('#masses').empty();
        var query = "SELECT * FROM %table WHERE Reconciled = '%Reconciled'";
        query = query.replace('%table','1JsfBqBIs-A9Buvs-smPqrNn4iBgJ6Ckn7GbONJM');
        query = query.replace('%Reconciled',e.row.Reconciled.value);
        var encodedQuery = encodeURIComponent(query);
        var url = ['https://www.googleapis.com/fusiontables/v1/query'];
        url.push('?sql=' + encodedQuery);
        url.push('&key=AIzaSyDN-6t7i93pOzKrcL56jsEi4kCsNezipq0');
        url.push('&typed=false'); // numbers returned as strings
        url.push('&callback=?');
        $.ajax({
            url: url.join(''),
            dataType: 'jsonp'
        })
            .done(function(data) {
                    var mass = $('<div class="mass"><div class="dayAndTime"><span class="day"/> <span class="time"/></div><div class="worship"/></div>');
                    $.each(data.rows, function() {
                        mass.clone()
                            .find('.day')
                                .text(this[2])
                            .end()
                            .find('.time')
                                .text(this[3])
                            .end()
                            .find('.worship')
                                .text(this[5])
                            .end()
                            .appendTo('#masses');
                    });
            });
        var church = $('<div class="church"><div class="reconciled"/><div class="diocese"/><div class="phone"/><div class="url"><a>Website</a></div></div>');
        church.clone()
            .find('.reconciled')
                .text(e.row['Reconciled'].value)
            .end()
            .find('.diocese')
                .text("Bisdom " + e.row['Diocese Name'].value)
            .end()
            .find('.phone')
                .text(e.row['Phone Number'].value)
            .end()
            .find('.url a')
                .attr('href', e.row['URL'].value)
            .end()
            .appendTo('#church .content');
        $("#filter-controls").hide();
        $("#church").show();
        $("#masses").hide();
        $('#cards').attr('class', 'bottom');
    });

    $('#church .close').on('click', function() {
        $("#filter-controls").show();
        $('#cards').attr('class', 'hidden');
    });
   
    $('#church .down').on('click', function() {
        $('#cards').attr('class', 'fullscreen');
        $("#masses").show();
    });
   
    $('#vandaag').on('click', function() {
        layer.setOptions({
            query: {
                select: locationColumn,
                from: tableId,
                where: "Timestamp < 600"
            }
        });
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

