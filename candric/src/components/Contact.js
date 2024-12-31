import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
};

export default Contact;