import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Lead, CreateLeadInput } from '@/models/Lead';
import { sendLeadNotification, sendPatientConfirmation, sendBookingAcknowledgement } from '@/lib/email';
import { validatePortuguesePhone, formatPhoneNumber, validateName, validateEmail } from '@/lib/booking-logic';

// GET: Fetch all leads (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    // Simple password protection
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const leads = await db
      .collection<Lead>('leads')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST: Create a new lead
export async function POST(request: NextRequest) {
  try {
    const input: CreateLeadInput = await request.json();

    // Validation
    if (!input.name || !validateName(input.name)) {
      return NextResponse.json(
        { error: 'Please provide your full name (first and last name)' },
        { status: 400 }
      );
    }

    if (!input.phone || !validatePortuguesePhone(input.phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid Portuguese phone number' },
        { status: 400 }
      );
    }

    if (!input.email || !validateEmail(input.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!input.service) {
      return NextResponse.json(
        { error: 'Please select a service' },
        { status: 400 }
      );
    }

    // Create lead object
    const lead: Lead = {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: formatPhoneNumber(input.phone),
      service: input.service,
      preferredDate: input.preferredDate,
      message: input.message,
      status: 'new',
      language: input.language || 'pt',
      createdAt: new Date(),
    };

    // Save to database
    const db = await getDatabase();
    const result = await db.collection<Lead>('leads').insertOne(lead);

    // Send email notification to clinic
    await sendLeadNotification({ lead });
    await sendBookingAcknowledgement(lead);

    return NextResponse.json({
      success: true,
      leadId: result.insertedId,
      message: input.language === 'pt'
        ? 'Marcação recebida! Entraremos em contacto em breve.'
        : 'Appointment received! We will contact you soon.'
    });

  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

// PATCH: Update lead status (for admin)
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { leadId, status } = await request.json();

    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    // Get the lead before updating to check previous status
    const lead = await db.collection<Lead>('leads').findOne({ _id: new ObjectId(leadId) });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update the lead status
    await db.collection<Lead>('leads').updateOne(
      { _id: new ObjectId(leadId) },
      { $set: { status, updatedAt: new Date() } }
    );

    // If status changed to 'scheduled', send confirmation email to patient
    if (status === 'scheduled' && lead.status !== 'scheduled') {
      if (!lead.email) {
        console.warn('Lead missing email address, skipping confirmation email.');
      } else {
        const updatedLead = { ...lead, status: 'scheduled' as const };
        await sendPatientConfirmation(updatedLead);
        console.log(`Confirmation email sent to ${lead.email} for scheduled appointment`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
