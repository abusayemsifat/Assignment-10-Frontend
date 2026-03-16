import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ServiceCard from '../components/ui/ServiceCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import Pagination from '../components/ui/Pagination';
import useDebounce from '../hooks/useDebounce';
import { CATEGORIES, SORT_OPTIONS } from '../utils/helpers';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [services, setServices] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [pages,    setPages]    = useState(1);
  const [loading,  setLoading]  = useState(true);

  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort,     setSort]     = useState(searchParams.get('sort')     || 'newest');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [page,     setPage]     = useState(parseInt(searchParams.get('page') || '1'));

  const debouncedSearch   = useDebounce(search,   500);
  const debouncedMinPrice = useDebounce(minPrice, 600);
  const debouncedMaxPrice = useDebounce(maxPrice, 600);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(debouncedSearch   && { search:   debouncedSearch   }),
        ...(category          && { category                    }),
        sort, page, limit: 8,
        ...(debouncedMinPrice && { minPrice: debouncedMinPrice }),
        ...(debouncedMaxPrice && { maxPrice: debouncedMaxPrice }),
      });
      const { data } = await api.get(`/services?${params}`);
      setServices(data.services || []);
      setTotal(data.total || 0);
      setPages(data.pages  || 1);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, sort, page, debouncedMinPrice, debouncedMaxPrice]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  useEffect(() => {
    const p = {};
    if (debouncedSearch)   p.search   = debouncedSearch;
    if (category)          p.category = category;
    if (sort !== 'newest') p.sort     = sort;
    if (page > 1)          p.page     = page;
    if (debouncedMinPrice) p.minPrice = debouncedMinPrice;
    if (debouncedMaxPrice) p.maxPrice = debouncedMaxPrice;
    setSearchParams(p, { replace: true });
  }, [debouncedSearch, category, sort, page, debouncedMinPrice, debouncedMaxPrice, setSearchParams]);

  const change = (setter) => (val) => { setter(val); setPage(1); };

  const clearFilters = () => {
    setSearch(''); setCategory(''); setSort('newest');
    setMinPrice(''); setMaxPrice(''); setPage(1);
  };

  const hasFilters = search || category || minPrice || maxPrice || sort !== 'newest';

  return (
    <div className="min-h-screen">
      <div className="bg-base-200 border-b border-base-300 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Explore Listings</h1>
          <p className="text-base-content/60 text-sm">{total} listings found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">🔍</span>
              <input
                type="text"
                value={search}
                onChange={e => change(setSearch)(e.target.value)}
                placeholder="Search pets, products..."
                className="input-field pl-9"
              />
            </div>

            <select
              value={category}
              onChange={e => change(setCategory)(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="capitalize">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={e => change(setSort)(e.target.value)}
              className="input-field"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              disabled={!hasFilters}
              className="btn btn-outline btn-sm h-[46px] rounded-xl disabled:opacity-40"
            >
              Clear Filters
            </button>
          </div>

          <div className="flex gap-4 mt-4 items-center flex-wrap">
            <span className="text-sm text-base-content/60 font-medium">
              Price Range:
            </span>
            <input
              type="number" min="0" placeholder="Min $"
              value={minPrice}
              onChange={e => change(setMinPrice)(e.target.value)}
              className="input-field w-28 text-sm"
            />
            <span className="text-base-content/40">—</span>
            <input
              type="number" min="0" placeholder="Max $"
              value={maxPrice}
              onChange={e => change(setMaxPrice)(e.target.value)}
              className="input-field w-28 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <SkeletonGrid count={8} />
        ) : services.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-bold mb-2">No listings found</h3>
            <p className="text-base-content/60 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map(s => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={pages}
              onPageChange={p => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;