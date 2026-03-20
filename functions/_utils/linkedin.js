export function getRedirectUri(request) {
  const url = new URL(request.url);
  
  // url.origin safely guarantees identical strings between the login redirect and the callback
  const redirectUri = `${url.origin}/api/linkedin/callback`;
  return redirectUri;
}

export async function getAccessToken(code, redirectUri, env) {
  if (!env.LINKEDIN_CLIENT_ID || !env.LINKEDIN_CLIENT_SECRET) {
    throw new Error("LinkedIn credentials missing from the environment!");
  }

  // Aggressively strip any hidden newlines, spaces, or accidental quotes from .dev.vars
  const clientId = String(env.LINKEDIN_CLIENT_ID).replace(/[\r\n\s"']/g, '');
  const clientSecret = String(env.LINKEDIN_CLIENT_SECRET).replace(/[\r\n\s"']/g, '');

  const bodyParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code: String(code).trim(),
    redirect_uri: String(redirectUri).trim(),
    client_id: clientId,
    client_secret: clientSecret
  });

  const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: bodyParams.toString()
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Failed to fetch token: ${errorText}`);
  }
  
  return tokenResponse.json();
}

export async function getUserProfile(accessToken) {
  const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (!profileResponse.ok) {
    const errorText = await profileResponse.text();
    throw new Error(`Failed to fetch user profile: ${errorText}`);
  }
  
  return profileResponse.json();
}