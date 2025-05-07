// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only Indonesia will use Indonesian language
const INDONESIAN_COUNTRIES = ['ID'];

export async function middleware(request: NextRequest) {
  // Skip API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the language preference is already set in cookies
  const langCookie = request.cookies.get('NEXT_LOCALE');
  if (langCookie) {
    // User already has language preference, don't change it
    return NextResponse.next();
  }

  // Get client IP address
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  try {
    // Call the IPGeolocation API
    const apiResponse = await fetch(
      `https://api.ipgeolocation.io/v2/ipgeo?apiKey=6980c4c2ec9d45039a0b241b7382e7fe&ip=${ip}`
    );
    
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch geolocation data');
    }
    
    const data = await apiResponse.json();
    const countryCode = data.country_code2; // ISO country code (e.g., 'ID')
    
    // Check if user is from Indonesia, otherwise default to English
    const lang = INDONESIAN_COUNTRIES.includes(countryCode) ? 'id' : 'en';
    
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
    
  } catch (error) {
    console.error('Error detecting location:', error);
    // In case of error, default to English
    const url = request.nextUrl.clone();
    if (!url.searchParams.has('lang')) {
      url.searchParams.append('lang', 'en');
    }
    
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.cookies.set('NEXT_LOCALE', 'en', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return redirectResponse;
  }
}

// Run the middleware on all routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};