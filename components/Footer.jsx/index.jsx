import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Company Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-600">
              Email: <a href="mailto:support@yourapp.com" className="hover:text-gray-900">support@yourapp.com</a>
            </li>
            <li className="text-gray-600">
              Phone: <a href="tel:+15551234567" className="hover:text-gray-900">+1 (555) 123-4567</a>
            </li>
            <li className="text-gray-600">
              Address: 123 Travel Lane, City, Country
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  )
}
