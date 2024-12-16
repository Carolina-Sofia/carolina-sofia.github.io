function calculateDistance(pickupPlaceId, destinationPlaceId) {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
        {
            origins: [{ placeId: pickupPlaceId }],
            destinations: [{ placeId: destinationPlaceId }],
            travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
            if (status === google.maps.DistanceMatrixStatus.OK) {
                const result = response.rows[0].elements[0];
                const distanceInMeters = result.distance.value; // Distance in meters

                // Update the price using the distance
                updateSummary(distanceInMeters);
            } else {
                console.error("Distance Matrix API error:", status);
            }
        }
    );
}
