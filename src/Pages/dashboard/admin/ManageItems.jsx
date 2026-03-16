import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';
import { formatCurrency, formatDate, CATEGORIES, SORT_OPTIONS } from '../../../utils/helpers';
import Pagination from '../../../components/ui/Pagination';
import useDebounce from '../../../hooks/useDebounce';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageItems = () => {
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 10);
      params.append('sort', sort);
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (category) params.append('category', category);
      const res = await api.get('/services?' + params.toString());
      setServices(res.data.services || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sort]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this listing?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete',
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete('/services/' + id);
      setServices(prev => prev.filter(s => s._id !== id));
      setTotal(t => t - 1);
      toast.success('Listing deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Manage Listings</h1>
          <p className="text-base-content/50 text-sm">{total} total listings</p>
        </div>
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <input
          value={search}
          onChange={function(e) {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search listings..."
          className="input-field w-52"
        />
        <select
          value={category}
          onChange={function(e) {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="input-field w-44"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(function(c) {
            return (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            );
          })}
        </select>
        <select
          value={sort}
          onChange={function(e) {
            setSort(e.target.value);
            setPage(1);
          }}
          className="input-field w-44"
        >
          {SORT_OPTIONS.map(function(o) {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {!loading && services.length === 0 && (
        <div className="text-center py-16 text-base-content/50">
          No listings found
        </div>
      )}

      {!loading && services.length > 0 && (
        <div>
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200 text-xs">
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Seller</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(function(s) {
                    return (
                      <tr key={s._id} className="hover">

                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={s.image}
                              className="w-10 h-10 rounded-xl object-cover"
                              alt=""
                              onError={function(e) {
                                e.target.src = 'https://placehold.co/40';
                              }}
                            />
                            <div>
                              <p className="font-semibold text-sm">{s.name}</p>
                              <p className="text-xs text-base-content/40">{s.location}</p>
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

                        <td className="text-xs text-base-content/60">
                          {s.email}
                        </td>

                        <td className="text-xs text-base-content/50">
                          {formatDate(s.createdAt)}
                        </td>

                        <td>
                          <div className="flex gap-1">
                            <a
                              href={'/details/' + s._id}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-ghost btn-xs"
                            >
                              View
                            </a>
                            <button
                              onClick={function() {
                                handleDelete(s._id);
                              }}
                              className="btn btn-ghost btn-xs text-error"
                            >
                              Delete
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={setPage}
          />
        </div>
      )}

    </div>
  );
};

export default ManageItems;
