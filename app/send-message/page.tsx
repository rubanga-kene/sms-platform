'use client';

import { useState } from 'react';

export default function SendSMS() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [smsPackage, setSmsPackage] = useState('10');
  const [subscriptionType, setSubscriptionType] = useState('weekly');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSendSMS = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, messageBody }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to send SMS.');
        return;
      }

      setPhoneNumber('');
      setMessageBody('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  const handleSubscribe = async () => {
    const selectedPackage = smsPackage === '10' ? 300 : 600;
    const selectedPeriod = subscriptionType; // weekly or monthly

    // Here you would send this data to the server
    console.log(`Subscribing for ${smsPackage} SMS (${selectedPeriod}) at price ${selectedPackage}`);

    setSubscribeMessage(`Subscribed successfully for ${smsPackage} SMS (${selectedPeriod}) at price ${selectedPackage}`);
    setShowSubscribeForm(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSendSMS} className="flex flex-col items-center justify-center w-full max-w-md px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
          <div className="p-8 space-y-6 sm:p-10">
            <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
              Send SMS Message
            </p>

            <div className="flex flex-col gap-4">
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  placeholder="07********"
                  id="phoneNumber"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {/* Message Body */}
              <div>
                <label htmlFor="messageBody" className="block mb-2 text-sm font-medium text-gray-900">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  id="messageBody"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  required
                  rows={4}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              Send Message
            </button>

            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Subscribe Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowSubscribeForm(!showSubscribeForm)}
                className="mt-4 w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                {showSubscribeForm ? 'Cancel Subscription' : 'Subscribe for SMS'}
              </button>
            </div>

            {/* Subscription Form */}
            {showSubscribeForm && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="smsPackage" className="block mb-2 text-sm font-medium text-gray-900">
                    Number of SMS
                  </label>
                  <select
                    id="smsPackage"
                    value={smsPackage}
                    onChange={(e) => setSmsPackage(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="10">10 SMS - 300 UGX</option>
                    <option value="20">20 SMS - 600 UGX</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subscriptionType" className="block mb-2 text-sm font-medium text-gray-900">
                    Subscription Type
                  </label>
                  <select
                    id="subscriptionType"
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="w-full bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                >
                  Confirm Subscription
                </button>
              </div>
            )}

            {/* Success message after subscription */}
            {subscribeMessage && <p className="text-center text-green-600">{subscribeMessage}</p>}
          </div>
        </div>
      </form>
    </main>
  );
}
