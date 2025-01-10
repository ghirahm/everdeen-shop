import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '../utils/Alert';

interface ProductPageProps {
    addToCart: (product: { title: string; price: number; quantity: number; image: string }) => void;
}

const ProductDetails: React.FC<ProductPageProps> = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
                if (!response.ok) throw new Error('Failed to fetch product details');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setIsError('Error Fetching Product Details');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (isLoading) return <div className="gradient-loading w-full h-screen" />;

    return (
        <section className="w-full my-[120px] flex flex-col gap-12">
            {
                isError && <Alert isError={isError} setIsError={setIsError} />
            }
            {product && (
                <div className="w-[80%] mx-auto flex flex-row gap-6">
                    <div className='w-[50%] rounded-md overflow-hidden'>
                        <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover" />
                    </div>
                    <div className='flex flex-col gap-6 items-start'>
                        <h1 className="text-3xl font-semibold">{product.title}</h1>
                        <p className="text-lg">{product.description}</p>
                        <p className="text-xl font-semibold">${product.price}</p>
                        <button onClick={() => { addToCart({ title: product.title, price: product.price, quantity: 1, image: product.images[0], }); }} className='hover:underline'>Add to Cart</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
