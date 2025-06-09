// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only Indonesia will use Indonesian language
const INDONESIAN_COUNTRIES = ['ID'];

// Default language to use during local development
const DEV_DEFAULT_LANGUAGE = 'id'; // Change to 'en' if you prefer English for local development

export async function middleware(request: NextRequest) {
  // Skip API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Get the real client IP address from various headers
  const clientIp = 
    request.headers.get('x-real-ip') || 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('cf-connecting-ip') || 
    request.headers.get('x-client-ip') ||
    request.ip || 
    '127.0.0.1';
  
  // Check if we're in a local development environment
  const isLocalEnvironment = 
    clientIp === '127.0.0.1' || 
    clientIp === '::1' || 
    clientIp.startsWith('192.168.') || 
    clientIp.startsWith('10.') || 
    clientIp.startsWith('172.16.');
  
  let lang;
  
  if (isLocalEnvironment) {
    // For local development, use the dev default language
    lang = DEV_DEFAULT_LANGUAGE;
  } else {
    try {
      // Call the IPGeolocation API with the client's IP
      const apiResponse = await fetch(
        `https://api.ipgeolocation.io/v2/ipgeo?apiKey=4bd22df85b5f4ffaa90d48466feee475&ip=${clientIp}`
      );
      
      if (!apiResponse.ok) {
        throw new Error('Failed to fetch geolocation data');
      }
      
      const data = await apiResponse.json();
      
      // Access the country_code2 from the nested location object
      const countryCode = data.location.country_code2;
      
      // Check if user is from Indonesia, otherwise default to English
      lang = INDONESIAN_COUNTRIES.includes(countryCode) ? 'id' : 'en';
    } catch (error) {
      // In case of error, default to English
      lang = 'en';
    }
  }
  
  // Check if the language parameter already matches what we detected
  const currentLang = request.nextUrl.searchParams.get('lang');
  
  if (currentLang === lang) {
    // Still update the cookie to refresh expiration time
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', lang, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return response;
  }
  
  // Create a URL object to modify the path
  const url = request.nextUrl.clone();
  
  // If there's already a ?lang parameter, replace it
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', lang);
  } else {
    // Otherwise, add it
    url.searchParams.append('lang', lang);
  }
  
  // Set a cookie for future requests
  const redirectResponse = NextResponse.redirect(url);
  redirectResponse.cookies.set('NEXT_LOCALE', lang, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  return redirectResponse;
}

// Run the middleware on all routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
