"use client";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext"; 

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    onClose: () => void;
}

const ProductCard = ({ id, name, description, price, quantity, image, onClose }: ProductCardProps) => {
    const { addToCart } = useCart(); 

    const handleAddToCart = () => {
        const product = { id, name, description, price, quantity, image };
        addToCart(product); 
        onClose(); 
        console.log('Product successfully added to cart');
    };
    return (
        <div className="fixed inset-0 bg-opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-green-600 text-lg hover:scale-125"
                >
                    X
                </button>
                <div key={id} className="flex flex-col items-center">
                    <Image
                        src={image}
                        alt="product image"
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold text-green-500 mt-4">
                        {name}
                    </h3>
                    <p className="text-gray-600 mt-2 mb-4 text-sm">
                        {description}
                    </p>
                    <div className="flex flex-col items-center">
                        <p className="text-yellow-600 text-xl">
                            💥${price}
                        </p>
                        <p className="text-gray-500 text-xs">
                            Units left: {quantity}
                        </p>
                        <button onClick={handleAddToCart}
                            className="rounded-md bg-green-500 text-white border-green-400 flex justify-center hover:scale-105 transform px-4 py-1"
                        >
                            Add to Cart 🛒
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

