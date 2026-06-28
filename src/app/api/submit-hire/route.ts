import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
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
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
