import React from "react";

export default function Settings() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 min-h-screen p-4 sm:p-6">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-4">
        ⚙️ Settings
      </h1>
      <p className="text-gray-700 mb-6 sm:mb-8">
        Manage your store details, account preferences, and security settings.
      </p>

      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Store Profile */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-emerald-400">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-4">
            🏪 Store Profile
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Logo
              </label>
              <input
                type="file"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                defaultValue="GreenLeaf Nursery"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Description
              </label>
              <textarea
                rows="3"
                defaultValue="We sell indoor plants, saplings, and seeds to bring greenery to your home."
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="greenleaf@support.com"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-500 hover:to-teal-700 transition">
              Save Changes
            </button>
          </form>
        </div>

        {/* Account Settings */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-teal-400">
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-4">
            👤 Account Settings
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                defaultValue="greenleaf_seller"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue="+91-9876543210"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business GST/Tax ID
              </label>
              <input
                type="text"
                defaultValue="29ABCDE1234F2Z5"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-teal-500 hover:to-cyan-700 transition">
              Save Account Settings
            </button>
          </form>
        </div>

        {/* Password & Security */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-green-600">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-600 mb-4">
            🔒 Security
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" /> Enable Two-Factor
              Authentication (2FA)
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition">
              Update Security Settings
            </button>
          </form>
        </div>

        {/* Payment Preferences */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-emerald-400">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-4">
            💳 Payment Preferences
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Account Number
              </label>
              <input
                type="text"
                defaultValue="1234 5678 9101"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <input
                type="text"
                defaultValue="SBIN0001234"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                UPI ID
              </label>
              <input
                type="text"
                defaultValue="greenleaf@upi"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payout Frequency
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-300">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-500 hover:to-teal-700 transition">
              Save Payment Details
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-green-600">
          <h2 className="text-lg sm:text-xl font-semibold text-cyan-700 mb-4">
            🔔 Notification Preferences
          </h2>
          <div className="space-y-3 text-gray-700 text-base">
            <div>
              <input type="checkbox" className="mr-2" defaultChecked /> Order
              updates via Email
            </div>
            <div>
              <input type="checkbox" className="mr-2" /> Promotions & Offers
            </div>
            <div>
              <input type="checkbox" className="mr-2" /> Payment & Payout
              Notifications
            </div>
            <div>
              <input type="checkbox" className="mr-2" /> Low Stock Alerts
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border-l-4 border-green-800">
          <h2 className="text-lg sm:text-xl font-semibold text-rose-600 mb-4">
            ⚠️ Danger Zone
          </h2>
          <button className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg hover:from-amber-500 hover:to-amber-700 transition">
            Deactivate Store
          </button>
          <button className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-rose-700 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-rose-800 transition">
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
}
