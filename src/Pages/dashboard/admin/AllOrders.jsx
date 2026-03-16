import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import Pagination from '../../../components/ui/Pagination';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending:   'badge-warning',
  confirmed: 'badge-success',
  cancelled: 'badge-error',
  delivered: 'badge-info',
};

const AllOrders = () => {
  const [orders,  setOrders]  = useState([]);
  const [total,   setTotal]   = useState(0);
  const [pages,   setPages]   = useState(1);
  const [page,    setPage]    = useState(1);
  const [status,  setStatus]  = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page, limit: 10,
        ...(status && { status }),
      });
      const { data } = await api.get(`/orders?${params}`);
      setOrders(data.orders || []);
      setTotal(data.total  || 0);
      setPages(data.pages  || 1);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      setOrders(prev =>
        prev.map(o => o._id === id ? { ...o, status: newStatus } : o)
      );
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">All Orders</h1>
          <p className="text-base-content/50 text-sm">{total} total orders</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {['', 'pending', 'confirmed', 'delivered', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => { setStatus(s); setPage(1); }}
            className={`btn btn-sm rounded-xl ${status === s ? 'btn-primary' : 'btn-ghost'}`}
          >
            {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-base-content/50">
          No orders found
        </div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200 text-xs">
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id} className="hover">
                      <td className="font-medium text-sm max-w-[120px] truncate">
                        {o.productName}
                      </td>
                      <td className="text-xs text-base-content/60 max-w-[100px] truncate">
                        {o.buyerEmail}
                      </td>
                      <td>{o.quantity}</td>
                      <td className="font-bold text-primary text-sm">
                        {formatCurrency(o.price * o.quantity)}
                      </td>
                      <td className="text-xs">{o.phone}</td>
                      <td className="text-xs text-base-content/50">
                        {formatDate(o.createdAt)}
                      </td>
                      <td>
                        <span className={`badge badge-sm ${STATUS_COLORS[o.status] || 'badge-ghost'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={o.status}
                          onChange={e => updateStatus(o._id, e.target.value)}
                          className="select select-xs select-bordered rounded-lg"
                        >
                          {['pending', 'confirmed', 'delivered', 'cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AllOrders;