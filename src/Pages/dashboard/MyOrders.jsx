import { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Pagination from '../../components/ui/Pagination';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending:   'badge-warning',
  confirmed: 'badge-success',
  cancelled: 'badge-error',
  delivered: 'badge-info',
};

const MyOrders = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,    setPage]    = useState(1);
  const [filter,  setFilter]  = useState('');
  const LIMIT = 8;

  useEffect(() => {
    api.get('/orders/my-orders')
      .then(({ data }) => setOrders(data.orders || []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const filtered   = filter ? orders.filter(o => o.status === filter) : orders;
  const paginated  = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const totalPages = Math.ceil(filtered.length / LIMIT);

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1">My Orders</h1>
      <p className="text-base-content/50 text-sm mb-6">
        {orders.length} total orders
      </p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {['', 'pending', 'confirmed', 'delivered', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            className={`btn btn-sm rounded-xl ${filter === s ? 'btn-primary' : 'btn-ghost'}`}
          >
            {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">📦</div>
          <h3 className="font-bold text-lg mb-2">No orders yet</h3>
          <p className="text-base-content/50 text-sm">
            Browse our listings and place your first order!
          </p>
        </div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-sm overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200 text-xs">
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(o => (
                    <tr key={o._id} className="hover">
                      <td className="font-medium text-sm">{o.productName}</td>
                      <td>{o.quantity}</td>
                      <td className="font-bold text-primary text-sm">
                        {formatCurrency(o.price * o.quantity)}
                      </td>
                      <td className="text-xs text-base-content/60 max-w-[120px] truncate">
                        {o.address}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {paginated.map(o => (
              <div key={o._id} className="card bg-base-100 shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-sm">{o.productName}</p>
                  <span className={`badge badge-sm ${STATUS_COLORS[o.status] || 'badge-ghost'}`}>
                    {o.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-base-content/60">
                  <span>Qty: {o.quantity}</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(o.price * o.quantity)}
                  </span>
                  <span>📍 {o.address}</span>
                  <span>📞 {o.phone}</span>
                  <span className="col-span-2">🗓️ {formatDate(o.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default MyOrders;