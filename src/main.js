import { decode } from '@here/flexpolyline';

document.getElementById('convert-button').addEventListener('click', () => {
    const input = document.getElementById('flex-polyline').value.trim();
    const outputElement = document.getElementById('geojson-output');

    if (!input) {
        outputElement.textContent = 'Please provide a valid flexible polyline.';
        return;
    }

    try {
        // Parse input as a single polyline or an array of polylines
        const polylines = input.startsWith('[') ? JSON.parse(input) : [input];

        if (!Array.isArray(polylines) || polylines.some(polyline => typeof polyline !== 'string')) {
            throw new Error('Input must be a single polyline or an array of polyline strings.');
        }

        // Decode each polyline and create GeoJSON features
        const features = polylines.map(polyline => {
            const decodedPolyline = decode(polyline);
            return {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: decodedPolyline.polyline.map(([lat, lon]) => [lat, lon]) // GeoJSON uses [lon, lat]
                },
                properties: {}
            };
        });

        // Create the GeoJSON FeatureCollection
        const featureCollection = {
            type: "FeatureCollection",
            features: features
        };

        // Format and display the GeoJSON
        outputElement.textContent = JSON.stringify(featureCollection, null, 2);
    } catch (error) {
        outputElement.textContent = `Error decoding polyline(s): ${error.message}`;
    }
});
