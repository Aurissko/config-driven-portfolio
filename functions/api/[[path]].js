// This catch-all route ensures that any missing /api/* endpoints
// return a 404 JSON error instead of falling through to Cloudflare Pages
// and serving the React app (which looks like a redirect to the homepage).

export async function onRequest() {
  return new Response(JSON.stringify({ error: "API route not found" }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}