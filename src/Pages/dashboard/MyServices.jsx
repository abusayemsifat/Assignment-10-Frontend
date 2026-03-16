import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Pagination from '../../components/ui/Pagination';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [page,     setPage]     = useState(1);
  const [search,   setSearch]   = useState('');
  const [editItem, setEditItem] = useState(null);
  const [saving,   setSaving]   = useState(false);

  const LIMIT = 6;

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/services/my-services');
      setServices(data.services || []);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const filtered  = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated  = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const totalPages = Math.ceil(filtered.length / LIMIT);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title:             'Delete this listing?',
      text:              'This cannot be undone.',
      icon:              'warning',
      showCancelButton:  true,
      confirmButtonColor:'#ef4444',
      confirmButtonText: 'Yes, delete',
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(prev => prev.filter(s => s._id !== id));
      toast.success('Listing deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form    = e.target;
    const updated = {
      name:        form.name.value,
      category:    form.category.value,
      price:       parseFloat(form.price.value) || 0,
      location:    form.location.value,
      description: form.description.value,
      image:       form.image.value,
      date:        form.date.value,
    };
    try {
      await api.put(`/services/${editItem._id}`, updated);
      setServices(prev =>
        prev.map(s => s._id === editItem._id ? { ...s, ...updated } : s)
      );
      toast.success('Listing updated!');
      setEditItem(null);
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">My Listings</h1>
          <p className="text-base-content/50 text-sm">{services.length} total</p>
        </div>
        <Link to="/dashboard/add-service">
          <button className="btn btn-primary btn-sm">+ Add Listing</button>
        </Link>
      </div>

      <input
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search listings..."
        className="input-field max-w-xs mb-4"
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🐾</div>
          <h3 className="font-bold text-lg mb-2">No listings yet</h3>
          <Link to="/dashboard/add-service">
            <button className="btn btn-primary btn-sm">Create First Listing</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200 text-xs">
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(s => (
                    <tr key={s._id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            className="w-10 h-10 rounded-xl object-cover"
                            alt=""
                            onError={e => { e.target.src = 'https://placehold.co/40'; }}
                          />
                          <div>
                            <p className="font-semibold text-sm">{s.name}</p>
                            <p className="text-xs text-base-content/40 truncate max-w-[160px]">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm capitalize">
                          {s.category}
                        </span>
                      </td>
                      <td className="font-bold text-primary text-sm">
                        {s.price === 0 ? 'Free' : formatCurrency(s.price)}
                      </td>
                      <td className="text-xs text-base-content/50">
                        {formatDate(s.createdAt)}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditItem(s)}
                            className="btn btn-ghost btn-xs text-primary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="btn btn-ghost btn-xs text-error"
                          >
                            Delete
                          </button>
                          <Link to={`/details/${s._id}`}>
                            <button className="btn btn-ghost btn-xs">View</button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Listing"
        size="lg"
      >
        {editItem && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Name *</label>
                <input
                  name="name"
                  defaultValue={editItem.name}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Category *</label>
                <select
                  name="category"
                  defaultValue={editItem.category}
                  className="input-field"
                >
                  {['pets', 'food', 'accessories', 'care products'].map(c => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={editItem.price}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Location</label>
                <input
                  name="location"
                  defaultValue={editItem.location}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Description *</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={editItem.description}
                required
                className="input-field resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Image URL *</label>
              <input
                name="image"
                type="url"
                defaultValue={editItem.image}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Date</label>
              <input
                name="date"
                type="date"
                defaultValue={editItem.date}
                className="input-field"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={saving}
              >
                {saving
                  ? <span className="loading loading-spinner loading-sm" />
                  : 'Save Changes'
                }
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyServices;