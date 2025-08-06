import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RideNotificationRequest {
  requestId: string;
  notificationEmails?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Ride notification function called");
    
    const { requestId, notificationEmails }: RideNotificationRequest = await req.json();

    if (!requestId) {
      throw new Error("Request ID is required");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the transportation request details
    const { data: request, error } = await supabase
      .from('transportation_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error || !request) {
      console.error("Error fetching request:", error);
      throw new Error("Transportation request not found");
    }

    console.log("Found transportation request:", request.id);

    // Default notification emails (you can customize these)
    const defaultEmails = [
      "transport@recoverypoint.org", // Replace with actual email
      "admin@recoverypoint.org"     // Replace with actual email
    ];

    const emailList = notificationEmails || defaultEmails;

    // Format appointment date and time
    const appointmentDate = new Date(request.appointment_date).toLocaleDateString();
    const appointmentTime = request.appointment_time;

    // Create email content
    const emailSubject = `New Transportation Request - ${request.first_name} ${request.last_name}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4c6ef5 0%, #364fc7 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Transportation Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Recovery Point Transportation Services</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            
            <h2 style="color: #364fc7; margin-top: 0;">Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.first_name} ${request.last_name}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.phone}</td></tr>
              ${request.medicaid_id ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Medicaid ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.medicaid_id}</td></tr>` : ''}
            </table>

            <h2 style="color: #364fc7;">Appointment Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${appointmentDate}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${appointmentTime}</td></tr>
            </table>

            <h2 style="color: #364fc7;">Pickup Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              ${request.pickup_name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.pickup_name}</td></tr>` : ''}
              ${request.pickup_phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.pickup_phone}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Address:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.pickup_address}</td></tr>
            </table>

            <h2 style="color: #364fc7;">Destination Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Facility:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.dest_name}</td></tr>
              ${request.dest_phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.dest_phone}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Address:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.dest_address}</td></tr>
            </table>

            ${request.additional_info ? `
            <h2 style="color: #364fc7;">Additional Information</h2>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #4c6ef5;">${request.additional_info}</p>
            ` : ''}

            <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; margin-top: 25px; text-align: center;">
              <p style="margin: 0; color: #364fc7; font-weight: bold;">Request ID: ${request.id}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Submitted on ${new Date(request.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div style="background: #364fc7; color: white; padding: 15px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Recovery Point Transportation Services</p>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Please process this request promptly</p>
        </div>
      </div>
    `;

    // Send emails to notification list
    const emailPromises = emailList.map(email => 
      resend.emails.send({
        from: "Recovery Point <noreply@recoverypoint.org>", // Update with your verified domain
        to: [email],
        subject: emailSubject,
        html: emailHtml,
      })
    );

    const emailResults = await Promise.allSettled(emailPromises);
    
    // Count successful emails
    const successCount = emailResults.filter(result => result.status === 'fulfilled').length;
    const failCount = emailResults.filter(result => result.status === 'rejected').length;

    console.log(`Email notifications sent: ${successCount} successful, ${failCount} failed`);

    // Log any failures
    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send email to ${emailList[index]}:`, result.reason);
      }
    });

    // Also send confirmation email to the requester
    const confirmationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4c6ef5 0%, #364fc7 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Transportation Request Received</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Recovery Point Transportation Services</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p>Dear ${request.first_name},</p>
            
            <p>Thank you for submitting your transportation request. We have received your request and will contact you within 24 hours to confirm your ride details.</p>
            
            <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #4c6ef5; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #364fc7;">Your Appointment Details:</h3>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${appointmentTime}</p>
              <p><strong>Destination:</strong> ${request.dest_name}</p>
              <p style="margin-bottom: 0;"><strong>Request ID:</strong> ${request.id}</p>
            </div>
            
            <p>If you have any questions or need to make changes to your request, please contact us immediately.</p>
            
            <p style="margin-bottom: 0;">Best regards,<br>Recovery Point Transportation Team</p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Recovery Point <noreply@recoverypoint.org>", // Update with your verified domain
      to: [request.email],
      subject: "Transportation Request Confirmation",
      html: confirmationEmailHtml,
    });

    console.log("Confirmation email sent to requester");

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailsSent: successCount,
        emailsFailed: failCount,
        requestId: request.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-ride-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);