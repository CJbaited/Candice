import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          If you have any questions or need assistance, please do not hesitate to contact us. We are here to help!
        </p>
        <p className="text-gray-700 mb-4">
          Email: support@learningplatform.com
        </p>
        <p className="text-gray-700 mb-4">
          Phone: +1 234 567 890
        </p>
        <p className="text-gray-700">
          Address: 123 Learning St, Education City, Country
        </p>
      </div>
    </div>
  );
};

export default Contact;