import * as Location from 'expo-location';
export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (addresses.length > 0) {
      const { city, region, country } = addresses[0];
      return { city, state: region, country };
    }
    return null;
  } catch (error) {
    console.error('Erro no reverse geocoding:', error);
  }
};
