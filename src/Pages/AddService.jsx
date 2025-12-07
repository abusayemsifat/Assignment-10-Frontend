import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AddService = () => {

    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {


        e.preventDefault();
        // Form submission logic would go here
        const form = e.target;

        const name = form.productName.value;
        const category = form.category.value;
        const price = form.price.value;
        const location = form.location.value;
        const description = form.description.value;
        const image = form.imageUrl.value;
        const date = form.pickupDate.value;
        const email = form.email.value;

        const formData = {
            name,
            category,
            price,
            location,
            description,
            image,
            date,
            email,
        }

        console.log(formData)

    };


    // Generated from deepseek
    const [formData, setFormData] = useState({
        category: 'pets',
        price: '',
        email: 'user@example.com'
    });

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData(prev => ({
            ...prev,
            category: selectedCategory,
            price: selectedCategory === 'pets' ? '0' : ''
        }));
    };

    const handlePriceChange = (e) => {
        const priceValue = e.target.value;
        // Allow empty string for non-pet categories
        setFormData(prev => ({
            ...prev,
            price: priceValue
        }));
    };


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        List a Product/Pet
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Fill in the details below to list your pet or pet-related product
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product/Pet Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product/Pet Name *
                            </label>
                            <input
                                type="text"
                                name="productName"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g., Golden Retriever Puppy or Premium Dog Food"
                            />
                        </div>

                        {/* Category and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="pets">Pets</option>
                                    <option value="food">Food</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="care products">Care Products</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price {formData.category !== 'pets' && '*'}
                                    {formData.category === 'pets' && (
                                        <span className="text-gray-500 ml-2">(Free for pets)</span>
                                    )}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handlePriceChange}
                                        min="0"
                                        step="0.01"
                                        required={formData.category !== 'pets'}
                                        disabled={formData.category === 'pets'}
                                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.category === 'pets'
                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
                                            : 'border-gray-300'
                                            }`}
                                        placeholder={formData.category === 'pets' ? '' : 'Enter price'}
                                    />
                                </div>
                                {formData.category === 'pets' ? (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Price automatically set to $0 for pets
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Enter a price greater than 0
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g., New York, NY or 123 Main St"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Describe the product/pet in detail..."
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="https://example.com/image.jpg"
                            />
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <div className="relative h-48 w-48 rounded-lg overflow-hidden border border-gray-300">
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pickup Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pickup Date *
                            </label>
                            <input
                                type="date"
                                name="pickupDate"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Email (Readonly) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                readOnly
                                value={user?.email}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                This will be used for contact purposes
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                List Product/Pet
                            </button>
                        </div>
                    </form>
                </div>

                {/* Form Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Form Instructions:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Fields marked with * are required</li>
                        <li>• Price is automatically set to 0 for "Pets" category</li>
                        <li>• Price field is empty by default for non-pet categories</li>
                        <li>• Enter a valid URL for the image</li>
                        <li>• Pickup date must be today or in the future</li>
                        <li>• Your email will be visible to potential buyers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddService;