(($) => {
    $(document).ready(() => {

        const $map = $('.location__map');
        const map = new google.maps.Map (
            $map[0], {
                center: {lat: 44.397, lng: 150.644},
                zoom: 3,
                disableDefaultUI: true
            }
        );

        const iw = new google.maps.InfoWindow;

        $.getJSON('data/location.json',(data) => {
            let status = '<ul class="tile-cities">' ;
            $.each(data,(index, a) => {
                status += '<li class="tile-city">' + '<h3 class="tile-city-name">' + a.city + '</h3>';
                status += '<span class="tile-city-temperature">' + a.temp + '</span>';
                status += '<i class="wi">' + a.unicode + '</i>';
                status += '</li>';

                var image = {
                    url: '',
                    size: new google.maps.Size(20, 32)
                };
                const marker = new google.maps.Marker({
                                        position: {lat: a.lat, lng: a.lng},
                                        map: map,
                                        icon: image,
                                        label: {
                                        color: '#1e4bff',
                                        fontFamily: 'weathericons',
                                        fontSize: '35px',
                                        text: a.unicode }
                                    });
                                    marker.addListener('click', () => {
                                        iw.setContent(a.temp);
                                        iw.open(map,marker);
                                    });
            });
            status += '</ul>';
            $('#tile').html(status);
        });
    });
}) (jQuery);