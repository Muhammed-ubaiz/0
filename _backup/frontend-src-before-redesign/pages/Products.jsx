import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import { 
  Filter, SlidersHorizontal, ChevronRight, X, Search, 
  RotateCcw, Home, Sparkles, Check
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const ITEMS_PER_PAGE = 24;

const Products = () => {
  const { category: categoryRouteParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || categoryRouteParam || 'all';

  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(queryCategory);
    setCurrentPage(1);
  }, [queryCategory]);

  useEffect(() => {
    if (querySearch !== searchTerm) {
      setSearchTerm(querySearch);
      setCurrentPage(1);
    }
  }, [querySearch]);

  // Current category details
  const currentCategoryInfo = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return {
        name: 'All Products & Packaging Lines',
        description: 'Explore over 377+ high quality food packaging solutions, aluminium foil, microwave containers, kraft bags, and tableware.'
      };
    }
    const found = categories.find(c => c.handle === selectedCategory);
    return found || { 
      name: selectedCategory.replace(/-/g, ' ').toUpperCase(), 
      description: 'Browse packaging products crafted for food safety, freshness and strength.' 
    };
  }, [selectedCategory]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.handle.toLowerCase().includes(term)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (handle) => {
    setSelectedCategory(handle);
    setCurrentPage(1);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (handle === 'all') {
        next.delete('category');
      } else {
        next.set('category', handle);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('featured');
    setPriceRange([0, 500]);
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 pb-20 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#ed1c24] flex items-center gap-1 font-heading">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} />
          <span className="text-slate-800 font-bold font-heading">
            {selectedCategory === 'all' ? 'All Products' : currentCategoryInfo.name}
          </span>
        </nav>

        {/* Page Banner Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card-subtle mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-wider mb-2 font-heading">
                <Sparkles size={14} />
                <span>Ideal Pack Catalog</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
                {currentCategoryInfo.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1.5">
                {currentCategoryInfo.description}
              </p>
            </div>

            {/* Total count badge */}
            <div className="shrink-0">
              <span className="inline-block px-4 py-2 rounded-2xl bg-red-50 text-red-800 text-xs font-bold border border-red-200/60 font-heading">
                {filteredProducts.length} Products Found
              </span>
            </div>
          </div>

          {/* Quick Category Scroll Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-100 no-scrollbar font-heading">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                  : 'bg-[#f8f9fa] text-slate-600 hover:bg-red-50 hover:text-[#ed1c24] border border-slate-200'
              }`}
            >
              All ({products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.handle)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.handle
                    ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                    : 'bg-[#f8f9fa] text-slate-600 hover:bg-red-50 hover:text-[#ed1c24] border border-slate-200'
                }`}
              >
                {cat.name} ({cat.products_count})
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-8 shadow-card-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar inside catalog */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search in these products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f8f9fa] border border-slate-200 rounded-full py-2.5 pl-10 pr-10 text-xs sm:text-sm focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs font-heading">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#f8f9fa] border border-slate-200 rounded-full px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#ed1c24] cursor-pointer"
              >
                <option value="featured">Featured Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A-Z</option>
                <option value="name-desc">Alphabetical: Z-A</option>
              </select>
            </div>

            {/* Price Filter Pill */}
            <div className="flex items-center gap-2 text-xs font-heading bg-[#f8f9fa] border border-slate-200 rounded-full px-3.5 py-1.5">
              <span className="text-slate-500 font-medium">Max Price:</span>
              <span className="font-bold text-[#ed1c24]">AED {priceRange[1]}</span>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([0, Number(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-20 accent-[#ed1c24] cursor-pointer"
              />
            </div>

            {/* Reset Filter Button */}
            {(selectedCategory !== 'all' || searchTerm || sortBy !== 'featured' || priceRange[1] < 500) && (
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer font-heading"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-lg mx-auto shadow-card-subtle my-12">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#ed1c24] flex items-center justify-center mx-auto mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1 font-heading">No packaging products matched</h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find any products matching your current filters or search terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider font-heading cursor-pointer shadow-red-btn transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id || product.handle} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-heading">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items
                </span>

                <div className="flex items-center gap-1.5 font-heading">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                    .map((p, idx, arr) => {
                      const prevVal = arr[idx - 1];
                      return (
                        <React.Fragment key={p}>
                          {prevVal && p - prevVal > 1 && (
                            <span className="px-2 text-xs text-slate-400">...</span>
                          )}
                          <button
                            onClick={() => {
                              setCurrentPage(p);
                              window.scrollTo({ top: 180, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              currentPage === p
                                ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
