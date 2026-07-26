import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllCustomers } from '../../services/adminService'

function AdminCustomers() {
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-customers', page],
    queryFn: () => fetchAllCustomers({ page }),
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-coconut-900">Customers</h1>
        <p className="text-coconut-500 text-sm mt-0.5">
          {data?.pagination?.total ?? '—'} registered customers
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-coconut-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          Failed to load customers.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-white rounded-2xl border border-coconut-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-coconut-100 bg-coconut-50">
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Customer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Phone</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Joined</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Addresses</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Auth</th>
                </tr>
              </thead>
              <tbody>
                {data?.customers?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-coconut-400">
                      No customers yet.
                    </td>
                  </tr>
                )}
                {data?.customers?.map((customer) => (
                  <>
                    <tr
                      key={customer._id}
                      onClick={() => setExpandedId(expandedId === customer._id ? null : customer._id)}
                      className="border-b border-coconut-100 hover:bg-coconut-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-coconut-200 flex items-center justify-center shrink-0">
                            <span className="text-sm font-semibold text-coconut-700">
                              {customer.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-coconut-900">{customer.name}</p>
                            <p className="text-xs text-coconut-400">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-coconut-600">
                        {customer.phone || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-coconut-600">
                        {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-coconut-600">
                        {customer.addresses?.length || 0} saved
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          customer.authProvider === 'google'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-coconut-100 text-coconut-700'
                        }`}>
                          {customer.authProvider === 'google' ? 'Google' : 'Email'}
                        </span>
                      </td>
                    </tr>

                    {/* Expanded: saved addresses */}
                    {expandedId === customer._id && customer.addresses?.length > 0 && (
                      <tr className="bg-coconut-50 border-b border-coconut-100">
                        <td colSpan={5} className="px-6 py-4">
                          <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">
                            Saved Addresses
                          </p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {customer.addresses.map((addr) => (
                              <div key={addr._id} className="bg-white rounded-xl p-3 border border-coconut-100 text-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs bg-coconut-100 text-coconut-600 px-2 py-0.5 rounded-full">
                                    {addr.label}
                                  </span>
                                  {addr.isDefault && (
                                    <span className="text-xs text-leaf-600 font-medium">Default</span>
                                  )}
                                </div>
                                <p className="font-medium text-coconut-900">{addr.fullName}</p>
                                <p className="text-coconut-500 text-xs mt-0.5">{addr.phone}</p>
                                <p className="text-coconut-600 text-xs mt-1">
                                  {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''},
                                  {' '}{addr.city}, {addr.state} — {addr.pincode}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data?.pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-coconut-500">
                Page {page} of {data.pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
                disabled={page === data.pagination.pages}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminCustomers