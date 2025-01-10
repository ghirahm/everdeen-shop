import React, { useEffect, useState } from 'react';
import Alert from '../utils/Alert';

interface ProductPageProps {
    addToCart: (product: { title: string; price: number; quantity: number; image: string }) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ addToCart }) => {
    const [products, setProducts] = useState<any[]>([]);  // Define the type of your product list
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string | null>(null);

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            if (selectedCategory) {
                try {
                    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${selectedCategory}/products`);
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
    
                    const data = await response.json();
                    setProducts(data);
                }
                catch (error) {
                    setIsError('Error Fetching Products');
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchProductsByCategory();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const categoriesResponse = await fetch(`https://api.escuelajs.co/api/v1/categories`);
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);

            const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setIsError('Error Fetching Products');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    return (
        <section className="w-full my-[120px] flex flex-col gap-12">
            {
                isError && <Alert isError={isError} setIsError={setIsError} />
            }
            {isLoading ?
                (
                    <div className='gradient-loading w-full h-screen' />
                )
                :
                (
                    <div className='space-y-6'>
                        <div className="w-[90%] flex flex-row justify-end items-center gap-2 text-center">
                            <h2 className="text-xl font-medium">Filter by Category</h2>
                            <select onChange={(e) => handleCategoryChange(Number(e.target.value))} value={selectedCategory} className="border rounded-lg p-2 appearance-nonek">
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-center content-center">
                            {products.map((product) => (
                                <div key={product.id} className="w-full mx-auto border rounded-lg hover:shadow-md overflow-hidden">
                                    <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover" />
                                    <div className="h-64 flex flex-col justify-between p-10">
                                        <div className='flex flex-col gap-2'>
                                            <h3 className="text-xl font-semibold uppercase">{product.title}</h3>
                                            <p className="text-gray-500 truncate">{product.description}</p>
                                        </div>
                                        <div className='flex flex-row justify-between items-center'>
                                            <p className="text-lg font-semibold">${product.price}</p>
                                            <button onClick={() => addToCart({ title: product.title, price: product.price, quantity: 1, image: product.images[0], })} className='hover:underline'>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default ProductPage;