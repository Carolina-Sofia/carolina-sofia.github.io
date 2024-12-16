// Configurable pricing variables
let basePrice = 55.00;       // Default base price in euros
let pricePerKm = 1.10;       // Default price per kilometer in euros
let cleaningFee = 5.00;      // Cleaning fee in euros
const discountRate = 0.10;   // Round-trip discount rate (10%)
let finalPrice = 0;          // Final price

// Long-distance pricing variables (greater than 150 km)
const longDistanceBasePrice = 120.00;  // Long-distance base price
const longDistancePricePerKm = 1.20;   // Long-distance price per kilometer

async function loadPricingFromAirtable(recordId) {
    const record = await getPricingByRecordId(recordId);
    if (record) {
        // Assuming these fields exist in Airtable
        if (record['PREÇO BASE']) {
            basePrice = parseFloat(record['PREÇO BASE']);
        }
        if (record['PREÇO KM']) {
            pricePerKm = parseFloat(record['PREÇO KM']);
        }
        if (record['TAXA DE LIMPEZA']) {
            cleaningFee = parseFloat(record['TAXA DE LIMPEZA']);
        }
        
        

        // If you need to re-calculate or update the displayed price, you can do it here
        updateTotal(); // For example, re-calculate the total if needed.
    } else {
        console.warn('No record found with the given RecordId');
    }
}

// Function to calculate price based on distance
function calculatePrice(distanceInKm) {
    let distanceCost;

    // Check if the distance exceeds 150 km
    if (distanceInKm > 150) {
        // Apply long-distance pricing
        distanceCost = distanceInKm * longDistancePricePerKm;
        return longDistanceBasePrice + distanceCost + cleaningFee;
    } else {
        // Apply normal pricing
        distanceCost = distanceInKm * pricePerKm;
        return basePrice + distanceCost + cleaningFee;
    }
}

// Function to update the total price (distance-based and round-trip logic)
function updateTotal() {
    // Get the round-trip toggle and total price elements
    const toggle = document.getElementById("round-trip-toggle");
    const totalPriceElement = document.getElementById("total-price");

    let totalWithDiscount = finalPrice;

    if (toggle.checked) {
        // Apply round-trip discount and double the price
        totalWithDiscount = (finalPrice * (1 - discountRate)) * 2;
    }

    // Update the total price element
    totalPriceElement.textContent = `${totalWithDiscount.toFixed(2).replace(".", ",")}€`;
}

// Function to update the price using distance
function updateSummary(distanceInMeters) {
    const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert meters to kilometers
    console.log(`Distance in km: ${distanceInKm}`);

    // Update the final price using the calculated distance
    finalPrice = calculatePrice(distanceInKm);

    // Recalculate and update the total price
    updateTotal();
}