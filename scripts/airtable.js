async function fetchPricingData() {
    const apiKey = 'pathUf7Yuf6itRikJ.742efdc2dd54cd391fc9b3f9751e8330ad7b3d1d2bcc0570b05a35e97c4f20c1'; // Replace with your real key
    const baseId = 'appsqaZVX0u2cl39e';     // Your base ID
    const tableName = 'Preços';

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // data.records is an array of records from Airtable
        return data.records.map(record => ({
            ...record.fields,
            RecordId: record.id
        }));
    } catch (error) {
        console.error('Error fetching pricing data:', error.message);
        return [];
    }
}

// Example function to get a specific record's fields
async function getPricingByRecordId(recordId) {
    const allData = await fetchPricingData();
    return allData.find(item => item.RecordId === recordId) || null;
}


