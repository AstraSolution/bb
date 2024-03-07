"use client"

import React, { useState } from 'react';

const ContactSupport = () => {
    const [selectedIssue, setSelectedIssue] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Reset form fields
      setEmail('');
      setMessage('');
      setSelectedIssue('');
      setImage(null);
      // Show confirmation message
      setShowConfirmation(true);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Contact Support</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="issue" className="sr-only">
                  Select Issue
                </label>
                <select
                  id="issue"
                  name="issue"
                  required
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                >
                  <option value="">Select an Issue</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Billing">Billing Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-2">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Message"
                  rows="4"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="image" className="sr-only">
                  Upload Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#016961] hover:bg-[#10857b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
  
          {showConfirmation && (
            <div className="text-center text-green-600">
              Thank you for contacting us! We will get back to you shortly.
            </div>
          )}
        </div>
      </div>
    );
  };


export default ContactSupport;
