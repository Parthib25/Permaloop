import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In-memory cache to store anonymized IP hash request timestamps.
// To ensure GDPR/CCPA compliance and protect user privacy, we NEVER store raw IP addresses.
// Instead, we store a one-way cryptographic SHA-256 hash of the IP + User-Agent combination.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const REQUEST_LIMIT = 3; // Maximum requests allowed per window
const WINDOW_MS = 30 * 1000; // 30 seconds window duration

/**
 * Periodically cleans up expired entries from the cache map to prevent memory leaks/outages.
 */
function cleanupCache() {
  const now = Date.now();
  for (const [hashedIp, rateData] of rateLimitMap.entries()) {
    if (now - rateData.lastReset > WINDOW_MS) {
      rateLimitMap.delete(hashedIp);
    }
  }
}

/**
 * Checks if a hashed client identifier has exceeded the submission rate limit.
 * @param hashedIp SHA-256 hash of the client IP address
 */
function isRateLimited(hashedIp: string): boolean {
  const now = Date.now();

  // Run cleanup to purge expired entries if map grows beyond 500 records
  if (rateLimitMap.size > 500) {
    cleanupCache();
  }

  const rateData = rateLimitMap.get(hashedIp);

  if (!rateData) {
    rateLimitMap.set(hashedIp, { count: 1, lastReset: now });
    return false;
  }

  // Check if current window has expired (30 seconds)
  if (now - rateData.lastReset > WINDOW_MS) {
    rateLimitMap.set(hashedIp, { count: 1, lastReset: now });
    return false;
  }

  rateData.count += 1;
  if (rateData.count > REQUEST_LIMIT) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Retrieve Client IP Address from request headers
    let clientIp = '';
    let resolvedVia = 'none';

    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const vercelIp = request.headers.get('x-vercel-forwarded-for');
    const userAgent = request.headers.get('user-agent') || '';

    if (forwardedFor) {
      clientIp = forwardedFor.split(',')[0].trim();
      resolvedVia = 'x-forwarded-for';
    } else if (realIp) {
      clientIp = realIp.trim();
      resolvedVia = 'x-real-ip';
    } else if (vercelIp) {
      clientIp = vercelIp.split(',')[0].trim();
      resolvedVia = 'x-vercel-forwarded-for';
    }

    // Log the resolved client IP details to the server console (visible in Vercel logs)
    if (clientIp) {
      console.log(`ℹ️ resolved client IP: [${clientIp}] via header: [${resolvedVia}]`);
    } else {
      console.warn('⚠️ Client IP could not be resolved from standard headers.');
    }

    // 2. Strict validation fallback block
    if (!clientIp) {
      if (process.env.NODE_ENV === 'development') {
        // Allow local development fallback to prevent blocking localhost tests
        clientIp = '127.0.0.1';
        console.log(`ℹ️ falling back to development local IP: [${clientIp}]`);
      } else {
        console.error('❌ Security check failed: Client IP could not be resolved from headers.');
        return NextResponse.json(
          { error: 'Security check failed: Client identity could not be verified.' },
          { status: 400 }
        );
      }
    }

    // 3. Anonymize using SHA-256 hashing (Ethical, GDPR-compliant device tracking)
    // We combine the IP address and User-Agent string to uniquely identify the browser/device.
    // This prevents blocking different users connected to the same Wi-Fi network.
    const clientSignature = `${clientIp}-${userAgent}`;
    const hashedClient = crypto
      .createHash('sha256')
      .update(clientSignature)
      .digest('hex');

    // 4. Perform Rate Limiting check on the hashed identifier
    if (isRateLimited(hashedClient)) {
      console.warn(`⚠️ Rate limit exceeded for anonymized client: ${hashedClient.substring(0, 8)}...`);
      return NextResponse.json(
        { error: 'Too many requests. Please wait 30 seconds before trying again.' },
        { status: 429 }
      );
    }

    // 5. Parse input body
    const { name, contact, need } = await request.json();

    if (!name || !name.trim() || !contact || !contact.trim() || !need || !need.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const formUrl = process.env.GOOGLE_FORM_URL;
    const nameField = process.env.GOOGLE_FORM_NAME_FIELD;
    const contactField = process.env.GOOGLE_FORM_CONTACT_FIELD;
    const needField = process.env.GOOGLE_FORM_NEED_FIELD;

    // Check if configuration variables are set on the server
    if (!formUrl || !nameField || !contactField || !needField) {
      console.error('❌ Missing Google Form configuration in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact developer.' },
        { status: 500 }
      );
    }

    // Google Forms expects application/x-www-form-urlencoded format
    const formParams = new URLSearchParams();
    formParams.append(nameField, name);
    formParams.append(contactField, contact);
    formParams.append(needField, need);

    // Perform server-to-server POST request to Google Forms endpoint
    // We send a standard User-Agent header to emulate a browser request and prevent Google from blocking it.
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://docs.google.com/forms',
      },
      body: formParams.toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(`❌ Google Form submission failed with status code: ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to submit request to Google Forms.' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('❌ Server proxy form submission error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
