import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 pt-24">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. Please read our privacy policy to understand how we handle your personal information.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
              <p className="text-gray-700">
                This Privacy Policy explains how we collect, use, and protect your personal information when you use Candric's Dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Information We Collect</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Account Information: Name, email address, and login credentials.</li>
                <li>Usage Data: Courses accessed, credits spent, and materials downloaded.</li>
                <li>Payment Information: Billing details for purchases.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. How We Use Your Information</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Provide access to courses and materials.</li>
                <li>Process payments and manage credits.</li>
                <li>Improve the Platform’s features and user experience.</li>
                <li>Communicate with you regarding updates and promotions.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">4. Sharing Your Information</h3>
              <p className="text-gray-700 mb-2">We do not sell your personal data. However, we may share data with:</p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Payment processors for transactions.</li>
                <li>Service providers that help operate the Platform.</li>
                <li>Authorities if required by law.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">5. Cookies and Tracking Technologies</h3>
              <p className="text-gray-700">
                The Platform uses cookies to enhance user experience. You can adjust cookie preferences in your browser settings.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">6. Data Security</h3>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">7. Your Rights</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Access, update, or delete your personal information.</li>
                <li>Withdraw consent for data collection at any time.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">8. Retention</h3>
              <p className="text-gray-700">
                We retain your information as long as your account is active or as needed for legal and operational purposes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">9. Updates to this Policy</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy. Changes will be notified via email or on the Platform.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">10. Contact Us</h3>
              <p className="text-gray-700">
                For questions or concerns about this Privacy Policy, contact us through the Contact page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;