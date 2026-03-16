import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../context/useAuth';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import ServiceCard from '../components/ui/ServiceCard';
import { formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const Stars = ({ rating, interactive = false, onRate }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        onClick={() => interactive && onRate && onRate(i)}
        className={`text-xl ${interactive ? 'cursor-pointer' : ''} ${
          i <= rating ? 'text-warning' : 'text-base-300'
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

const ServiceDetails = () => {
  const { id }   = useParams();
  const { user } = useAuth();

  const [service,    setService]    = useState(null);
  const [related,    setRelated]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [imgIdx,     setImgIdx]     = useState(0);
  const [orderOpen,  setOrderOpen]  = useState(false);
  const [ordering,   setOrdering]   = useState(false);
  const [review,     setReview]     = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/services/${id}`)
      .then(({ data }) => {
        setService(data.service);
        return api.get(`/services?category=${data.service.category}&limit=4`);
      })
      .then(({ data }) =>
        setRelated((data.services || []).filter(s => s._id !== id))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to place an order'); return; }
    setOrdering(true);
    const form = e.target;
    try {
      await api.post('/orders', {
        productId:   id,
        productName: service.name,
        quantity:    form.quantity.value,
        price:       service.price,
        address:     form.address.value,
        phone:       form.phone.value,
        note:        form.note.value,
      });
      toast.success('Order placed successfully! 🎉');
      setOrderOpen(false);
      form.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to leave a review'); return; }
    setSubmitting(true);
    try {
      await api.post(`/services/${id}/reviews`, review);
      toast.success('Review submitted!');
      setReview({ rating: 5, comment: '' });
      const { data } = await api.get(`/services/${id}`);
      setService(data.service);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🐾</div>
        <h2 className="text-2xl font-bold">Listing not found</h2>
        <Link to="/explore" className="btn btn-primary">Back to Explore</Link>
      </div>
    );
  }

  const images = [service.image, service.image, service.image];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="text-sm breadcrumbs mb-6 text-base-content/50">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li className="text-base-content">{service.name}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div>
          <div className="rounded-2xl overflow-hidden h-80 md:h-96 mb-3 bg-base-200">
            <img
              src={images[imgIdx]}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={e => {
                e.target.src = 'https://placehold.co/600x400?text=PawMart';
              }}
            />
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  imgIdx === i ? 'border-primary' : 'border-base-300'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = 'https://placehold.co/80'; }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-3">
            <Badge variant="primary" className="capitalize">
              {service.category}
            </Badge>
            <span className="text-sm text-base-content/50">
              {formatDate(service.createdAt)}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold mb-2">{service.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <Stars rating={Math.round(service.rating || 0)} />
            <span className="text-sm text-base-content/60">
              ({service.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-primary mb-6">
            {service.price === 0 ? 'Free / Adopt' : formatCurrency(service.price)}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {service.location && (
              <div className="bg-base-200 rounded-xl p-3">
                <p className="text-xs text-base-content/50 mb-0.5">Location</p>
                <p className="font-semibold text-sm">📍 {service.location}</p>
              </div>
            )}
            {service.date && (
              <div className="bg-base-200 rounded-xl p-3">
                <p className="text-xs text-base-content/50 mb-0.5">Available From</p>
                <p className="font-semibold text-sm">📅 {formatDate(service.date)}</p>
              </div>
            )}
            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-xs text-base-content/50 mb-0.5">Category</p>
              <p className="font-semibold text-sm capitalize">
                🏷️ {service.category}
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-xs text-base-content/50 mb-0.5">Contact</p>
              <p className="font-semibold text-sm truncate">✉️ {service.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {user ? (
              <button
                onClick={() => setOrderOpen(true)}
                className="btn btn-primary btn-lg flex-1"
              >
                🛒 Order / Adopt Now
              </button>
            ) : (
              <Link to="/login" className="flex-1">
                <button className="btn btn-primary btn-lg w-full">
                  Login to Order
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
          {service.description}
        </p>
      </div>

      <div className="card bg-base-100 shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-5">
          Reviews ({service.reviews?.length || 0})
        </h2>

        {user && (
          <form
            onSubmit={handleReview}
            className="bg-base-200 rounded-2xl p-5 mb-6"
          >
            <h3 className="font-semibold mb-3">Write a Review</h3>
            <Stars
              rating={review.rating}
              interactive
              onRate={r => setReview(rv => ({ ...rv, rating: r }))}
            />
            <textarea
              value={review.comment}
              onChange={e =>
                setReview(rv => ({ ...rv, comment: e.target.value }))
              }
              required
              placeholder="Share your experience..."
              rows={3}
              className="input-field resize-none mb-3 mt-3"
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={submitting}
            >
              {submitting
                ? <span className="loading loading-spinner loading-xs" />
                : 'Submit Review'
              }
            </button>
          </form>
        )}

        {service.reviews?.length === 0 ? (
          <p className="text-base-content/50 text-sm">
            No reviews yet. Be the first!
          </p>
        ) : (
          <div className="space-y-4">
            {service.reviews?.map((r, i) => (
              <div
                key={i}
                className="flex gap-4 pb-4 border-b border-base-200 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  {(r.userName || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{r.userName}</span>
                    <Stars rating={r.rating} />
                    <span className="text-xs text-base-content/40 ml-auto">
                      {formatDate(r.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-5">Related Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.slice(0, 4).map(s => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        title={`Order: ${service.name}`}
        size="md"
      >
        <form onSubmit={handleOrder} className="space-y-4">
          <div className="bg-base-200 rounded-xl p-3 flex items-center gap-3">
            <img
              src={service.image}
              className="w-12 h-12 rounded-lg object-cover"
              alt=""
              onError={e => { e.target.src = 'https://placehold.co/48'; }}
            />
            <div>
              <p className="font-semibold text-sm">{service.name}</p>
              <p className="text-primary font-bold">
                {service.price === 0 ? 'Free' : formatCurrency(service.price)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Quantity <span className="text-error">*</span>
              </label>
              <input
                name="quantity"
                type="number"
                min="1"
                defaultValue="1"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone <span className="text-error">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="+1 234 567"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Delivery Address <span className="text-error">*</span>
            </label>
            <input
              name="address"
              required
              placeholder="123 Main St, City"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Additional Note
            </label>
            <textarea
              name="note"
              rows={2}
              placeholder="Any special instructions..."
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOrderOpen(false)}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={ordering}
            >
              {ordering
                ? <span className="loading loading-spinner loading-sm" />
                : 'Place Order'
              }
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceDetails;