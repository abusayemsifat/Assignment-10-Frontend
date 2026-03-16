import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { CATEGORIES } from '../../utils/helpers';

const AddService = () => {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [preview,  setPreview]  = useState('');
  const [form,     setForm]     = useState({
    name: '', category: 'pets', price: '', location: '',
    description: '', image: '', date: '',
  });

  const update = (f) => (e) => {
    const val = e.target.value;
    setForm(p => ({ ...p, [f]: val }));
    setErrors(er => ({ ...er, [f]: '' }));
    if (f === 'image') setPreview(val);
    if (f === 'category' && val === 'pets') {
      setForm(p => ({ ...p, category: val, price: '0' }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = 'Name is required';
    if (!form.category)           e.category    = 'Category is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.description.trim().length < 20) e.description = 'Min 20 characters';
    if (!form.image)              e.image       = 'Image URL is required';
    if (!form.location.trim())    e.location    = 'Location is required';
    if (form.category !== 'pets' && form.price === '') e.price = 'Price is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/services', {
        ...form,
        price: form.category === 'pets' ? 0 : parseFloat(form.price),
      });
      toast.success('Listing created successfully! 🐾');
      navigate('/dashboard/my-services');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-1">Add New Listing</h1>
      <p className="text-base-content/50 text-sm mb-8">
        Fill in the details to list your pet or product
      </p>

      <div className="card bg-base-100 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Pet / Product Name <span className="text-error">*</span>
            </label>
            <input
              value={form.name}
              onChange={update('name')}
              placeholder="e.g., Golden Retriever Puppy"
              className={`input-field ${errors.name ? 'border-error' : ''}`}
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category <span className="text-error">*</span>
              </label>
              <select
                value={form.category}
                onChange={update('category')}
                className={`input-field ${errors.category ? 'border-error' : ''}`}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="capitalize">
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Price{' '}
                {form.category === 'pets'
                  ? <span className="text-base-content/50">(Free for pets)</span>
                  : <span className="text-error">*</span>
                }
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.category === 'pets' ? '0' : form.price}
                  onChange={update('price')}
                  disabled={form.category === 'pets'}
                  placeholder="0.00"
                  className={`input-field pl-7 ${form.category === 'pets' ? 'opacity-60 cursor-not-allowed' : ''} ${errors.price ? 'border-error' : ''}`}
                />
              </div>
              {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Location <span className="text-error">*</span>
            </label>
            <input
              value={form.location}
              onChange={update('location')}
              placeholder="e.g., New York, NY"
              className={`input-field ${errors.location ? 'border-error' : ''}`}
            />
            {errors.location && <p className="text-xs text-error mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={update('description')}
              placeholder="Describe the pet or product in detail..."
              className={`input-field resize-none ${errors.description ? 'border-error' : ''}`}
            />
            <p className="text-xs text-base-content/40 mt-1">
              {form.description.length} characters (min 20)
            </p>
            {errors.description && <p className="text-xs text-error mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Image URL <span className="text-error">*</span>
            </label>
            <input
              type="url"
              value={form.image}
              onChange={update('image')}
              placeholder="https://example.com/image.jpg"
              className={`input-field ${errors.image ? 'border-error' : ''}`}
            />
            {errors.image && <p className="text-xs text-error mt-1">{errors.image}</p>}
            {preview && (
              <div className="mt-2">
                <p className="text-xs text-base-content/50 mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-xl object-cover border border-base-300"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Available From
              </label>
              <input
                type="date"
                value={form.date}
                onChange={update('date')}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Contact Email
              </label>
              <input
                value={user?.email || ''}
                readOnly
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading
                ? <span className="loading loading-spinner loading-sm" />
                : '🐾 Create Listing'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;