import { getRedirectUri, getAccessToken, getUserProfile } from '../../_utils/linkedin.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const url = new URL(request.url);
  
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const stateFromUrl = url.searchParams.get('state');

  // Handle if the user denied the request on LinkedIn
  if (error) {
    console.error("Auth failed with error:", error);
    return new Response(`Authentication failed: ${error}`, { status: 400 });
  }

  if (!code) {
    console.error("No authorization code provided.");
    return new Response('No authorization code provided.', { status: 400 });
  }

  // CSRF Protection: Verify the state parameter matches the one in our HTTP-only cookie
  const cookieHeader = request.headers.get('Cookie') || '';
  const stateCookieMatch = cookieHeader.match(/(?:^|; )linkedin_oauth_state=([^;]*)/);
  const stateFromCookie = stateCookieMatch ? stateCookieMatch[1] : null;

  if (!stateFromUrl || !stateFromCookie || stateFromUrl !== stateFromCookie) {
    console.error("CSRF Validation Failed: State mismatch or missing.");
    return new Response('Invalid or missing state parameter. CSRF blocked.', { status: 403 });
  }

  try {
    const redirectUri = getRedirectUri(request);
    
    // 1. Exchange the authorization code for an access token
    const tokenData = await getAccessToken(code, redirectUri, env);
    
    // 2. Use the access token to get the user's LinkedIn profile
    const profileData = await getUserProfile(tokenData.access_token);

    // 3. Store the user data in a cookie so the frontend React app can read it, then redirect
    
    const userData = {
      name: profileData.name,
      email: profileData.email,
      picture: profileData.picture
    };

    // SECURITY: Cryptographically sign the cookie data so it cannot be tampered with.
    if (!env.SESSION_SECRET) {
      throw new Error("Server misconfiguration: SESSION_SECRET is missing.");
    }
    
    const encoder = new TextEncoder();
    const dataString = JSON.stringify(userData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataString + env.SESSION_SECRET));
    const signature = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    const signedCookieData = { payload: userData, signature };

    // Dynamically apply Secure flag based on environment
    const isSecure = url.protocol === 'https:';
    const clearStateCookie = `linkedin_oauth_state=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=Lax`;
    const userCookie = `linkedin_user=${encodeURIComponent(JSON.stringify(signedCookieData))}; Path=/; Max-Age=86400; SameSite=Lax${isSecure ? '; Secure' : ''}`;

    // Use the Headers API to safely append multiple Set-Cookie headers
    const headers = new Headers();
    // Redirect with a query param to trigger the modal and hash to scroll down
    headers.set('Location', `${url.origin}/?action=leave-reference#references`);
    headers.append('Set-Cookie', clearStateCookie);
    headers.append('Set-Cookie', userCookie);

    return new Response(null, {
      status: 302,
      headers: headers
    });
  } catch (err) {
    console.error("Callback Error:", err);
    return new Response(`Error during LinkedIn authentication: ${err.message}`, { status: 500 });
  }
}