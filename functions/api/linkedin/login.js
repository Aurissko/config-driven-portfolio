import { getRedirectUri } from '../../_utils/linkedin.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const redirectUri = getRedirectUri(request);
  // MUST trim here as well, otherwise the auth code is tied to a corrupted client_id
  const clientId = env.LINKEDIN_CLIENT_ID.trim();
  const state = crypto.randomUUID();
  const scope = 'openid profile email';

  const linkedInAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  linkedInAuthUrl.searchParams.append('response_type', 'code');
  linkedInAuthUrl.searchParams.append('client_id', clientId);
  linkedInAuthUrl.searchParams.append('redirect_uri', redirectUri);
  linkedInAuthUrl.searchParams.append('state', state);
  linkedInAuthUrl.searchParams.append('scope', scope);

  // Create an HTTP-only cookie to store the state for CSRF validation.
  // Only apply the 'Secure' flag if running on HTTPS (production) to prevent local HTTP drops.
  const isSecure = new URL(request.url).protocol === 'https:';
  const stateCookie = `linkedin_oauth_state=${state}; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=Lax; Max-Age=1800; Path=/`;

  // SECURITY: Enforce that this endpoint can ONLY be called internally by our React app via fetch.
  // Block direct browser navigation or external site links to prevent third-party initiation.
  const acceptHeader = request.headers.get('Accept') || '';
  if (!acceptHeader.includes('application/json')) {
    return new Response(JSON.stringify({ error: "Forbidden: Endpoint only accepts internal app requests." }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ url: linkedInAuthUrl.toString() }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': stateCookie
    }
  });
}