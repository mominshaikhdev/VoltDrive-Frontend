import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, Trash2, ShieldAlert, LayoutGrid, FileText, CheckCircle } from 'lucide-react';

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  price: number;
  rangeMi: number;
  category: string;
  createdBy?: string;
  createdAt: string;
}

export default function ManageVehicles() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // Fetch all vehicles
      const res = await fetch('/api/vehicles?limit=100');
      if (res.ok) {
        const data = await res.json();
        setVehicles(data.vehicles || []);
      }
    } catch (err) {
      console.error('Error fetching list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this vehicle?')) return;

    try {
      setErrorMsg('');
      setDeleteSuccessMsg('');
      
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setDeleteSuccessMsg('Vehicle removed from registry.');
        // Refresh list
        await fetchVehicles();
        setTimeout(() => setDeleteSuccessMsg(''), 4000);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || 'Permission denied. Only creators or admins can delete.');
        setTimeout(() => setErrorMsg(''), 5000);
      }
    } catch (err) {
      console.error('Error deleting:', err);
      setErrorMsg('Failed to connect to API server.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="radial-bg top-[-10%] right-[-10%]" />

      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Manage Vehicles</h1>
        <p className="text-gray-400 text-sm">
          Overview of listed electric vehicles. Admin roles can delete any entry; Standard users can delete their own listings.
        </p>
      </div>

      {/* Success/Error Alerts */}
      {deleteSuccessMsg && (
        <div className="p-4 mb-6 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-sm rounded-xl flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
          <span>{deleteSuccessMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 mb-6 bg-red-950/20 border border-red-900/30 text-red-400 text-sm rounded-xl flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Table Container */}
      <div className="glass rounded-2xl border border-gray-800/40 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse flex flex-col items-center justify-center space-y-3">
            <LayoutGrid className="h-8 w-8 text-cyber-cyan animate-spin" />
            <span className="text-sm">Fetching electric fleet specifications...</span>
          </div>
        ) : vehicles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-900 bg-gray-900/30 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4.5">Vehicle Details</th>
                  <th className="px-6 py-4.5 hidden sm:table-cell">Category</th>
                  <th className="px-6 py-4.5">Price (MSRP)</th>
                  <th className="px-6 py-4.5 hidden md:table-cell">Range</th>
                  <th className="px-6 py-4.5 hidden lg:table-cell">Created By</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/50 text-sm">
                {vehicles.map((v) => {
                  const isOwner = v.createdBy === user?.email;
                  const isAdmin = user?.role === 'admin';
                  const canDelete = isOwner || isAdmin;

                  return (
                    <tr key={v._id} className="hover:bg-gray-900/25 transition-all">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-extrabold text-white">{v.title}</p>
                          <p className="text-xs text-cyber-purple font-medium uppercase tracking-wide mt-0.5">{v.brand}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md bg-gray-950 border border-gray-800 text-gray-300">
                          {v.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        ${v.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-300 hidden md:table-cell">
                        {v.rangeMi} miles
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-mono hidden lg:table-cell">
                        {v.createdBy || 'System'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2.5">
                          <Link
                            to={`/vehicles/${v._id}`}
                            className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all"
                            title="View Specs"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(v._id)}
                            className={`p-2 rounded-lg border transition-all cursor-pointer ${
                              canDelete
                                ? 'bg-red-950/15 border-red-900/35 text-red-400 hover:bg-red-950/30'
                                : 'bg-gray-950/40 border-gray-900 text-gray-600 cursor-not-allowed'
                            }`}
                            title={canDelete ? 'Remove EV' : 'Unauthorized to Delete'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 space-y-4">
            <FileText className="h-10 w-10 mx-auto text-gray-700" />
            <p className="text-base font-bold text-white">No vehicles listed</p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">There are currently no models registered in the system database.</p>
            <Link to="/items/add" className="inline-block btn-primary text-xs">List First Vehicle</Link>
          </div>
        )}
      </div>
    </div>
  );
}
