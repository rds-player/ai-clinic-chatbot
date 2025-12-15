'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/models/Lead';
import { Loader2, Download, RefreshCw, Lock } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'scheduled'>('all');

  const fetchLeads = async () => {
    if (!password) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/leads?password=${encodeURIComponent(password)}`);

      if (response.status === 401) {
        setIsAuthenticated(false);
        setError('Invalid password');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data = await response.json();
      setLeads(data.leads);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads?password=${encodeURIComponent(password)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      // Refresh leads
      fetchLeads();
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Preferred Date', 'Status', 'Created At'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.service,
      lead.preferredDate || 'N/A',
      lead.status,
      new Date(lead.createdAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(lead => lead.status === filter);

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    scheduled: leads.filter(l => l.status === 'scheduled').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-6">
            Default password: clinic2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={fetchLeads}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-initial text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex-1 sm:flex-initial text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Leads</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">New</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Contacted</p>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.contacted}</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Scheduled</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.scheduled}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow mb-4 sm:mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'new', 'contacted', 'scheduled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table - Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preferred Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id?.toString()} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <a href={`mailto:${lead.email}`} className="text-primary-600 hover:text-primary-700">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.preferredDate || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead._id!.toString(), e.target.value as Lead['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Call
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No leads found
            </div>
          )}
        </div>

        {/* Leads Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {filteredLeads.map((lead) => (
            <div key={lead._id?.toString()} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{lead.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{lead.service}</p>
                </div>
                <a
                  href={`tel:${lead.phone}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Call
                </a>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Email:</span>
                  <a href={`mailto:${lead.email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-900 font-medium">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900">{lead.preferredDate || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <label className="block text-xs text-gray-500 mb-1.5">Status</label>
                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead._id!.toString(), e.target.value as Lead['status'])}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
              No leads found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
