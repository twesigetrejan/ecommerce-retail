"use client";
import { useEffect, useState } from "react";
import Navbar from '../components/ui/navbar';
import Image from "next/image";
import ProductCard from "../components/ui/productCard";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg"
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    let cycles = 0;

    const changeImage = () => {
      setCurrentImage((prevImage) => {
        const nextIndex = (images.indexOf(prevImage) + 1) % images.length;
        if (nextIndex === 0) {
          cycles++;
          if (cycles >= 3) return prevImage;
        }
        return images[nextIndex];
      });
    };

    timer = setInterval(changeImage, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    console.log("Selected product:", product);
  }

  const closeProductClick = () => {
    setSelectedProduct(null);
  }

  return (
    <div className="relative">

      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <Navbar />
      <div className="container mx-auto px-4 mt-2 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-10">
          {products && products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white shadow-lg overflow-hidden w-full"
            >
              <Image
                src={product.image}
                alt={product.product_name}
                width={300}
                height={300}
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-200"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-500">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 mb-2 text-[12px] line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="price text-sm">
                    <p className="line-through text-gray-500 text-xs">${product.price + 1}</p>
                    <p className="text-yellow-600 text-xl flex items-center">
                      💥$
                      <span className="text-sm text-green-600 font-bold font-mono">

                        {product.price}
                      </span>
                    </p>
                  </div>
                  <p className="text-yellow-600 text-xs">Units left {product.quantity}</p>
                </div>
                <button onClick={() => handleProductClick(product)} className="mt-4 hover:bg-green-600 hover:text-white rounded-sm py-1 px-3 bg-white text-green-600 border border-green-600 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-4xl">Categories</div>
      </div>

      {selectedProduct && (
        <ProductCard
          id={selectedProduct.id}
          name={selectedProduct.product_name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          quantity={selectedProduct.quantity}
          image={selectedProduct.image}
          onClose={closeProductClick}
        />
      )}
    </div>
  );
}
