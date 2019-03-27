  let map;
  let position;
  let placeInfoText;

  $('#save').on('click', function() {
    let newPlace = {
      name: $('#placename').val(),
      lat: $('#placelat').val(),
      lng: $('#placelng').val()
    }

    let d = JSON.parse(localStorage.getItem('places'));

    if (!d)
      d = { places: [] };

    d.places.push(newPlace);
    localStorage.setItem('places', JSON.stringify(d));

    // alert('Gespeichert.');
    $('input').val('');
    loadPlaces();
  });

  function loadPlaces() {
    let d = JSON.parse(localStorage.getItem('places'));

    $('#places').empty();

    for (let i in d.places) {
      // console.log(d.places[i]);
      if (d.places[i].name) {
        $('<div>')
          // .attr('data-id', i)
          .appendTo('#places')
          .html(d.places[i].name /*+ '( ' + d.places[i].lat + '/' + d.places[i].lng + ' )'*/)
          .append( $('<button class="delPlace">Löschen</button>') )
          .append( $('<button class="showPlace">Zeigen</button>') )
          .data({
            pos: { lat: d.places[i].lat * 1, lng:  d.places[i].lng * 1 },
            index: i,
            name: d.places[i].name
          });
      }
    }

    if ($('#places > div').length == 0) {
      $('<em>derzeit keine Orte eingetragen</em>')
        .appendTo('#places');
    }
  } // Ende loadPlaces

  function getPage(pageNum){
    if(pageNum < 2 || pageNum > 4)
      throw Error('Ungültiger Wert pageNum: ' + pageNum);

    $('#bottom a[href="#page' + pageNum + '"]').get(0).click();
  }

  $(document).on('click', '.showPlace', function() {
    position = { lat: $(this).parent().data('pos').lat, lng: $(this).parent().data('pos').lng };
    placeInfoText = $(this).parent().data('name');
    getPage(4);
  });

  $(document).on('click', '.delPlace', function() {
    console.log('del');
    let id = $(this).parent().data('index');
    let d = JSON.parse(localStorage.getItem('places'));

    if (id >= d.places.length) {
      console.error('id is no valid array index, id: ' + id);
      return;
    }

    d.places.splice(id, 1);
    localStorage.setItem('places', JSON.stringify(d));

    alert('Gelöscht.');
    loadPlaces();
  });

  $('#bottom a').on('click', function() {
    $('.aktiv').removeClass('aktiv');
    $(this).addClass('aktiv');
    $('.page').hide();
    $($(this).attr('href')).show();

    if ($(this).attr('href') == '#page4') {
      showPlace();
    }
  });

  function initMap() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(pos) {
        position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        console.log('Position von Geolocation API ermittelt: lat: ' + pos.coords.latitude + ', lng: ' + pos.coords.longitude);
        placeInfoText = 'Du bist hier';
      });
    } else {
      console.warn('Geolocation API nicht verfügbar');
    }

    map = new google.maps.Map($('#googlemap').get(0), {
      center: { lat: 0, lng: 0 },
      zoom: 3
    });

    map.addListener('click', function(e) {
      // console.log('lat: ' + e.latLng.lat());
      // console.log('lng: ' + e.latLng.lng());

      let latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      showSaveOptions( latLng );
      showStreetView( latLng )
    });

    console.log('mapInitialized');
  } // Ende initMap()


  function showPlace() {
    //TODO: cleanup old view -> Übung

    map.setCenter(position);
    map.setZoom(15);

    // let marker = new google.maps.Marker({
    //   position: position,
    //   map: map
    // });
    // marker.setAnimation(google.maps.Animation.DROP);

    // let inp = $('<input type="text" placeholder="Du bist hier">');
    // inp.on('change', function(){
    //   console.log($(this).val());
    // });

    let info = new google.maps.InfoWindow ({
      position: position,
      map: map,
      // content: inp.get(0)
      content: placeInfoText
    });

    info.addListener('closeclick', function(){
      let marker = new google.maps.Marker({
        position: position,
        map: map
      });
      marker.setAnimation(google.maps.Animation.DROP);
    });
  }

  function showSaveOptions(pos){
    $('#placeInfo').text('lat: ' + pos.lat + ', lng: ' + pos.lng);

    $('#btn_save').on('click', function(){
      $('#placelat').val(pos.lat);
      $('#placelng').val(pos.lng);
      getPage(2);
    });

    $('#save_options').show();
  }

  function showStreetView(pos){
    console.log(pos);

    new google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: pos,
        // position: {lat: 48.177971199999995, lng: 16.3528704},
        pov: { heading: 165, pitch: 0 },
        motionTracking: false,
        motionTrackingControl: false
      }
    );
  }

  $('input[type=text]').val('');
  loadPlaces();
