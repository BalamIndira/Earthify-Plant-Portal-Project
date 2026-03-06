import React from "react";

export default function Support() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">
        🆘 Seller Support Center
      </h1>
      <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
        Need help managing your store? Find answers to common questions,
        troubleshoot issues, and connect with our support team.
      </p>

      {/* Support Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-5">
            📖 Frequently Asked Questions
          </h2>
          <ul className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>
              <strong>Q: How do I add a new product?</strong>
              <p>
                After logging in, navigate to{" "}
                <b>Dashboard &rarr; Add Product</b>. Fill in the details and
                submit your product for approval.
              </p>
            </li>
            <li>
              <strong>Q: How can I check my earnings?</strong>
              <p>
                Visit the <b>Earnings</b> section in your seller account dashboard
                to view detailed sales reports and payout history.
              </p>
            </li>
            <li>
              <strong>Q: Can I edit or remove a product?</strong>
              <p>
                Yes. Go to <b>My Products</b> in your dashboard, choose the
                desired product, and select <b>Edit</b> or <b>Delete</b>.
              </p>
            </li>
            <li>
              <strong>Q: What if my product gets rejected?</strong>
              <p>
                You will find the rejection reason under the <b>History</b>{" "}
                section. Please address the issues and resubmit.
              </p>
            </li>
            <li>
              <strong>Q: How do I login to my seller account?</strong>
              <p>
                Visit the <b>Login</b> page from the homepage, enter your
                registered email and password, and click <b>Sign In</b>. If you
                forgot your password, use the <b>Forgot Password</b> link to
                reset it.
              </p>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-5">
            📞 Contact Support
          </h2>
          <p className="text-gray-700 mb-4 text-base leading-relaxed">
            Still stuck? Reach out to us:
          </p>
          <ul className="space-y-3 text-gray-700 text-base">
            <li>
              📧 Email:{" "}
              <a
                href="mailto:support@earthify.com"
                className="text-green-600 hover:underline"
              >
                support@earthify.com
              </a>
            </li>
            <li>📱 Phone: +91-9876543210</li>
            <li>💬 Live Chat: 9 AM – 9 PM IST (Monday – Saturday)</li>
            <li>
              🎫 Raise a Ticket:{" "}
              <a
                href="https://yourcompany.freshdesk.com/support/tickets/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Click Here
              </a>
            </li>
          </ul>
        </div>

        {/* Troubleshooting Section */}
        <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-600 mb-5">
            🔧 Troubleshooting
          </h2>
          <p className="text-gray-700 mb-4 text-base leading-relaxed">
            Quick fixes for common issues:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>Clear your browser cache and cookies if your dashboard doesn’t load.</li>
            <li>Make sure product images are under 5MB for faster uploads.</li>
            <li>Check your internet connection if order updates are delayed.</li>
            <li>Use the latest version of popular browsers like Chrome, Firefox, or Edge.</li>
          </ul>
        </div>

        {/* Policies Section */}
        <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-600 mb-5">
            📜 Seller Policies & Guidelines
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>All products must meet our quality and authenticity standards.</li>
            <li>Orders should be shipped within 48 hours of placement for timely delivery.</li>
            <li>Returns and refunds follow our marketplace refund policy.</li>
            <li>Commission charges apply per successful sale as described in your agreement.</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-green-600 mb-5">
            📚 Resources & Tutorials
          </h2>
          <ul className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>
              ▶️{" "}
              <a href="/tutorials/how-to-add-product" className="text-green-600 hover:underline">
                Video: How to Add a Product
              </a>
            </li>
            <li>
              📘{" "}
              <a href="/resources/seller-handbook.pdf" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Seller Handbook (PDF)
              </a>
            </li>
            <li>
              📰{" "}
              <a href="/updates" className="text-green-600 hover:underline">
                Latest Updates & Announcements
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
