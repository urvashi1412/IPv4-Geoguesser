document.getElementById('ip-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const ipAddress = document.getElementById('ip-address').value;
    const apiKey = '620cb199a6d9aea5d38734e089b0c398fbb4491cf84e8d97ca81a80a';  /
    const apiUrl = `https://api.ipdata.co/${ipAddress}?api-key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);  

            document.querySelector('#continent span').textContent = data.continent_name || 'N/A';
            document.querySelector('#country span').textContent = data.country_name || 'N/A';
            document.querySelector('#region span').textContent = data.region || 'N/A';
            document.querySelector('#city span').textContent = data.city || 'N/A';
            document.querySelector('#latitude span').textContent = data.latitude || 'N/A';
            document.querySelector('#longitude span').textContent = data.longitude || 'N/A';
            document.querySelector('#name span').textContent = data.asn.name || 'N/A';
            document.querySelector('#ID span').textContent = data.asn.route || 'N/A
            const lat = data.latitude;
            const lng = data.longitude;

            console.log(`Latitude: ${lat}, Longitude: ${lng}`);  

            if (lat && lng && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                reverseGeocode(lat, lng);
            } else {
                console.error('Invalid coordinates:', lat, lng);
                document.querySelector('#google-location span').textContent = 'Invalid coordinates.';
            }
        })
        .catch(error => {
            console.error('Error fetching IP data:', error);
            alert('Failed to retrieve IP data. Please check the IP address and try again.');
        });
});

function reverseGeocode(lat, lng) {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=672cf7a614c86571978948yhgc34471`;

    console.log(`Calling Maps.co API with URL: ${apiUrl}`); 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Reverse Geocoding API Response:', data); 
            if (data.address) {
                const location = data.address;
            } else {
                console.error('No address found in the response');
            }
            generateMapImage(lat, lng);
        })
        .catch(error => {
            console.error('Error during reverse geocoding:', error);
        });
}
function generateMapImage(lat, lng) {
    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${lng}%2C${lat}&zoom=10&marker=lonlat%3A${lng}%2C${lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw&apiKey=6e1ff9db289448b48ba7b838e0d8b1a7`;

    console.log(`Static Map URL: ${mapUrl}`);  

    const mapImage = document.getElementById('map-image');
    mapImage.src = mapUrl;  
}
