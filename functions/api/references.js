import config from '../../src/data/config.json';

async function isAdmin(request, env) {
  // Check secure linkedin_user cookie against adminEmails in config.json
  const cookieHeader = request.headers.get('Cookie') || '';
  const userCookieMatch = cookieHeader.match(/(?:^|; )linkedin_user=([^;]*)/);
  if (userCookieMatch) {
    try {
      const cookieData = JSON.parse(decodeURIComponent(userCookieMatch[1]));
      if (!cookieData.payload || !cookieData.signature) return false;

      // SECURITY: Verify the cryptographic signature to ensure the email wasn't forged
      if (!env.SESSION_SECRET) return false;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(JSON.stringify(cookieData.payload) + env.SESSION_SECRET));
      const expectedSignature = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (cookieData.signature !== expectedSignature) return false; // Tampered cookie rejected!

      const user = cookieData.payload;
      const adminEmails = Array.isArray(config.adminEmails) ? config.adminEmails : [];
      if (user.email && adminEmails.includes(user.email)) {
        return true;
      }
    } catch (e) {}
  }
  return false;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const url = new URL(request.url);
  const isReqAdmin = url.searchParams.get('admin') === 'true';

  try {
    if (!env.DB) throw new Error("Database binding 'DB' is missing.");
    
    if (isReqAdmin) {
      // Require admin access for dashboard
      if (!(await isAdmin(request, env))) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
      const { results } = await env.DB.prepare(`SELECT * FROM references_table ORDER BY created_at DESC`).all();
      return new Response(JSON.stringify(results), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      // Public view: Fetch only approved references for the frontend
      const { results } = await env.DB.prepare(
        `SELECT id, name, picture, comment, created_at FROM references_table WHERE approved = 1 ORDER BY created_at DESC`
      ).all();
      return new Response(JSON.stringify(results), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch references", details: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const origin = request.headers.get('Origin');
    const referer = request.headers.get('Referer');
    const url = new URL(request.url);
    
    if (origin && origin !== url.origin) return new Response(JSON.stringify({ error: "Forbidden: Invalid Origin" }), { status: 403 });
    if (referer && !referer.startsWith(url.origin)) return new Response(JSON.stringify({ error: "Forbidden: Invalid Referer" }), { status: 403 });

    const cookieHeader = request.headers.get('Cookie') || '';
    const userCookieMatch = cookieHeader.match(/(?:^|; )linkedin_user=([^;]*)/);

    if (!userCookieMatch) return new Response(JSON.stringify({ error: "Unauthorized. Please log in." }), { status: 401 });

    const cookieData = JSON.parse(decodeURIComponent(userCookieMatch[1]));
    if (!cookieData.payload || !cookieData.signature) {
      return new Response(JSON.stringify({ error: "Invalid cookie format." }), { status: 401 });
    }

    // Verify the signature for POST requests too
    if (!env.SESSION_SECRET) {
      return new Response(JSON.stringify({ error: "Server misconfiguration: SESSION_SECRET missing" }), { status: 500 });
    }
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(JSON.stringify(cookieData.payload) + env.SESSION_SECRET));
    const expectedSignature = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (cookieData.signature !== expectedSignature) return new Response(JSON.stringify({ error: "Forbidden: Tampered Token" }), { status: 403 });

    const user = cookieData.payload;
    const { comment } = await request.json();
    if (!comment || typeof comment !== 'string' || comment.trim() === '') return new Response(JSON.stringify({ error: "Comment is required." }), { status: 400 });

    if (!env.DB) throw new Error("Database binding 'DB' is missing.");

    await env.DB.prepare(`DELETE FROM references_table WHERE name = ? OR email = ?`).bind(user.name, user.email || 'N/A').run();

    // Ensure ALL edits/submissions go back to pending if requireReferenceApproval is true, even for admins.
    const initialApprovalStatus = config.requireReferenceApproval ? 0 : 1;

    await env.DB.prepare(`INSERT INTO references_table (name, email, picture, comment, approved) VALUES (?, ?, ?, ?, ?)`)
      .bind(user.name, user.email, user.picture, comment.trim(), initialApprovalStatus).run();

    return new Response(JSON.stringify({ success: true, approved: initialApprovalStatus === 1 }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
  }
}

export async function onRequestPatch(context) {
  const { request, env } = context;

  // SECURITY: Add CSRF protection for admin patching as well
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  const url = new URL(request.url);
  
  if (origin && origin !== url.origin) return new Response(JSON.stringify({ error: "Forbidden: Invalid Origin" }), { status: 403 });
  if (referer && !referer.startsWith(url.origin)) return new Response(JSON.stringify({ error: "Forbidden: Invalid Referer" }), { status: 403 });

  if (!(await isAdmin(request, env))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { id, approved, action } = await request.json();
    if (!env.DB) throw new Error("Database binding 'DB' is missing.");

    if (action === 'delete') {
      await env.DB.prepare(`DELETE FROM references_table WHERE id = ?`).bind(id).run();
    } else {
      await env.DB.prepare(`UPDATE references_table SET approved = ? WHERE id = ?`).bind(approved ? 1 : 0, id).run();
    }
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update reference", details: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}