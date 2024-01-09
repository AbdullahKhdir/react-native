export async function getAddressFromCoordinates(latitude, longtitude) {
    if (isNaN(latitude) || isNaN(longtitude)) {
        throw new Error('TypeError: Latitude and longtitude must be a number');    
    }

    let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longtitude}&format=geocodejson`,
        {
            headers: {
                'Accept-Language': 'de;q=0.7'
            }
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch address!')
    }

    const data    = await response.json();
    const address = data?.features[0]?.properties?.geocoding?.label;

    return Promise.resolve(address);
}