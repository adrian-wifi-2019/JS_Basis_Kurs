$(document).ready(function() {

  // Darstellung Orte
  function loadPlaces () {
    let d = JSON.parse(localStorage.getItem('places'));
      console.log(d);

    $('#places').empty();
    for (let i in d.places) {
      console.log(d.places[i]);
      if (d.places[i].name) {
        $('<div>')
          .attr('data-id', i)
          .appendTo('#places')
          .html(d.places[i].name + '( ' + d.places[i].lat + '/' + d.places[i].lng + ' )')
          .append(
            $('<button class="delPlace">Löschen</button>')
          )
      }
    }

    if ($('#places > div').length == 0) {
      $('<em>derzeit keine Orte eingetragen</em>')
        .appendTo('#places');
    }
  }


  $('input[type=text]').val('');
  loadPlaces();

  $('#bottom a').on('click', function() {
    $('.aktiv').removeClass('aktiv');
    $(this).addClass('aktiv');
    $('.page').hide();
    $($(this).attr('href')).show();

    if ($(this).attr('href') == '#page4') {

      let map = new google.maps.Map($('#googlemap').get(0), {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 3
      });

      map.addListener('click', function(e){
        console.log(e);
        console.log('lat: ' + e.latLng.lat());
        console.log('lng: ' + e.latLng.lng());
      });

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition( function(position) {

          let userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(userPos);
          map.setZoom(15);

          let marker = new google.maps.Marker({
            position: userPos,
            map: map
          });

        });

      }
    }

  });

  $('#save').on('click', function() {
    let newPlace = {
      name: $('#placename').val(),
      lat: $('#placelat').val(),
      lng: $('#placelng').val()
    }

    let d = JSON.parse(localStorage.getItem('places'));

    if(!d)
      d = { places: [] };

    d.places.push(newPlace);
    localStorage.setItem('places', JSON.stringify(d));

    alert('Gespeichert.');
    $('input').val('');
    loadPlaces();

  });

  $('.delPlace').on('click', function() {
    let id = $(this).parent().attr('data-id');
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



}, false);
