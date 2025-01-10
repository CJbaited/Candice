import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <p className="text-gray-700 mb-4">
          We aim to provide our users with the best learning experience. If you need to cancel a course or class, our refund policy ensures clarity and fairness.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Refunds for Courses</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Refunds are available for multi-week courses up until 5 weeks remain in the course duration.</li>
                <li>The refund amount decreases by 10% of the total course price each week after the course starts.</li>
                <li>Once 5 weeks or fewer remain in the course, no refunds are available.</li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">Refund Example</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>Before Week 1 starts: 100% refund ($200).</li>
                <li>After Week 1 (9 weeks left): 90% refund ($180).</li>
                <li>After Week 2 (8 weeks left): 80% refund ($160).</li>
                <li>After Week 5 (5 weeks left): No refund available.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Refunds do not include fees for course materials already downloaded or used.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Refunds for Individual Classes</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Refunds are available if the request is made at least 4 hours before the class starts.</li>
                <li>No refunds are possible if the request is made less than 4 hours before the class begins.</li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">Rescheduling Policy</h4>
              <p className="text-gray-700">
                Rescheduling of individual classes is permitted with at least 4 hours’ prior notice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Exceptions</h3>
              <p className="text-gray-700">
                We understand that unexpected circumstances can arise. Refund exceptions may be granted in cases such as:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Medical emergencies.</li>
                <li>Technical issues preventing access to the platform.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To request an exception, please provide documentation (if applicable) by contacting [Support Email].
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">4. Refund Processing</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Refunds will be issued to the original payment method used for purchase.</li>
                <li>Refunds typically take 5-10 business days to process, depending on your payment provider.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">5. Contact Us</h3>
              <p className="text-gray-700">
                For refund requests or further assistance, please email us at [Support Email] with your account details and the specific course or class information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;