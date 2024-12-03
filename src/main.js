import {decode} from '@here/flexpolyline';

document.getElementById('convert-button').addEventListener('click', () => {
    const input = document.getElementById('flex-polyline').value.trim();
    const outputElement = document.getElementById('geojson-output');

    if (!input) {
        outputElement.textContent = 'Please provide a valid flexible polyline.';
        return;
    }

    try {
        // Decode the flexible polyline into coordinates
        const decodedPolyline = decode(input);

        // Create a GeoJSON FeatureCollection
        const featureCollection = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: decodedPolyline.polyline.map(([lat, lon]) => [lon, lat]) // GeoJSON uses [lon, lat]
                    },
                    properties: {}
                }
            ]
        };

        // Format and display the GeoJSON
        outputElement.textContent = JSON.stringify(featureCollection, null, 2);
    } catch (error) {
        outputElement.textContent = `Error decoding polyline: ${error.message}`;
    }
});