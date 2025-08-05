import React from 'react';

export default function Policies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 pb-4 mb-6">
            Employee SMS Notification Opt-In Policy
          </h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <p><strong>Effective Date:</strong> August 5, 2025</p>
              <p><strong>Issued by:</strong> Recovery Point West Virginia</p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Purpose</h2>
              <p>This policy establishes a clear and compliant process for obtaining consent from employees before sending SMS/text notifications through the Twilio platform for work-related communication.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Scope</h2>
              <p>This policy applies to all employees of Recovery Point West Virginia who may receive text messages through Twilio, including but not limited to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Shift reminders and schedule changes</li>
                <li>Emergency notifications</li>
                <li>Operational updates</li>
                <li>Internal announcements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Opt-In Requirements</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Affirmative Consent:</strong> Employees must explicitly opt in before receiving messages. Consent may be provided via:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>A signed SMS consent form during onboarding</li>
                    <li>A checkbox in the employee portal or application</li>
                    <li>Texting a designated keyword such as "START" to an assigned number</li>
                  </ul>
                </li>
                <li>
                  <strong>Confirmation Message:</strong> Upon enrollment, employees will receive a confirmation text including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Sender identification ("You are now subscribed to Recovery Point WV Employee Alerts")</li>
                    <li>Estimated message frequency</li>
                    <li>Instructions to opt out (e.g., "Reply STOP to unsubscribe")</li>
                  </ul>
                </li>
                <li>
                  <strong>Data Use:</strong> Phone numbers will only be used for internal notifications and will not be shared or used for marketing purposes.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Opt-Out and Revocation</h2>
              <p>Employees may opt out at any time by:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Replying <strong>STOP</strong> to any Twilio message</li>
                <li>Updating preferences via the employee portal</li>
                <li>Contacting HR at <em>[insert HR contact email or number]</em></li>
              </ul>
              <p className="mt-3">All opt-outs will be processed immediately and documented for compliance.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Message Frequency and Charges</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Messages will only be sent as necessary for internal communications</li>
                <li>Standard SMS/data rates may apply per employee phone plan</li>
                <li>Recovery Point West Virginia is not responsible for messaging charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Recordkeeping and Compliance</h2>
              <p>All opt-in and opt-out records will be securely maintained by HR and IT. The policy will be reviewed annually to ensure compliance with TCPA and CTIA regulations.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Acknowledgment</h2>
              <p>All employees must acknowledge this policy and provide their consent before receiving SMS notifications through Twilio.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}