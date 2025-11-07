/**
 * Fetch a photo from NEW Google Places API based on location and activity
 */

interface PlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
}

interface Place {
  id: string;
  photos?: PlacePhoto[];
}

export async function getGooglePlacesImage(
  query: string,
  location?: string
): Promise<string | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  console.log('🔵 Google Places API called with query:', query, 'location:', location);
  console.log('🔵 API Key present:', !!apiKey);

  if (!apiKey) {
    console.log('❌ Google Places API key not configured');
    return null;
  }

  try {
    // Combine location and query for better results
    const searchQuery = location ? `${query} in ${location}` : query;
    console.log('🔵 Searching Places for:', searchQuery);

    // Step 1: Search for place using NEW Places API
    const searchUrl = 'https://places.googleapis.com/v1/places:searchText';

    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos'
      },
      body: JSON.stringify({
        textQuery: searchQuery
      })
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('❌ Google Places API HTTP error:', searchResponse.status, errorText);
      return null;
    }

    const searchData = await searchResponse.json();
    console.log('🔵 Places API response:', JSON.stringify(searchData).substring(0, 200));

    if (!searchData.places || searchData.places.length === 0) {
      console.log('❌ No places found for query:', searchQuery);
      return null;
    }

    const place: Place = searchData.places[0];
    console.log('🔵 Place found:', place.id);

    // Check if place has photos
    if (!place.photos || place.photos.length === 0) {
      console.log('❌ No photos available for place');
      return null;
    }

    // Step 2: Get Photo URL using NEW API format
    // Photo name format: places/{place_id}/photos/{photo_id}
    const photoName = place.photos[0].name;
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${apiKey}`;

    console.log('✅ Google Places photo found for:', searchQuery);
    return photoUrl;
  } catch (error) {
    console.error('❌ Error fetching from Google Places:', error);
    return null;
  }
}

/**
 * Generate a Places API search query from idea
 */
export function generatePlacesQuery(title: string, tags: string[]): string {
  // Extract key activity words
  const words = title.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'with', 'to', 'in', 'at', 'want', 'do'];
  const keywords = words.filter(w => !stopWords.includes(w) && w.length > 2);

  // Use tags for better context
  const goodTags = tags.filter(t => !['soon', 'now', 'someday'].includes(t));

  // Combine for search
  if (goodTags.length > 0) {
    return goodTags.slice(0, 2).join(' ');
  }

  return keywords.slice(0, 3).join(' ') || title;
}
