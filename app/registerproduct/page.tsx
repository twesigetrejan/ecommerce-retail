"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

export default function RegisterProduct() {
    const [product_name, setProduct_name] = useState('');
    const [product_description, setProduct_description] = useState('');
    const [product_price, setProduct_price] = useState('');
    const [product_quantity, setProduct_quantity] = useState(1);
    const [product_image, setProduct_image] = useState();

    // const handleSubmit = (formData: any) => {
    //     onSubmit('/api/products', { method: 'POST', body: formData });

    // };

    const router = useRouter();
    const handleSubmit = async (e: any) => {
        const imageFile = product_image;

        if (!imageFile) {
            console.error('Please select an image to upload');
            return;
        }
        const uploadedImageUrl = await uploadImageToStorage(imageFile);

        if (uploadedImageUrl === null) {
            console.error('Error uploading image');
            return;
        }

        e.preventDefault();


        const { data, error } = await supabase.from('products').insert([{ product_name: product_name, description: product_description, price: product_price, quantity: product_quantity, image: uploadedImageUrl }])
        if (error) {
            console.error(`Failed to upload product ${error}`)
        } else {
            console.log(`Succesfully updated product ${data}`)

            router.push("/");
        }
    }
    return (

        <div className='relative'>
            <Navbar id={0} name={''} description={''} price={0} quantity={0} image={''} />
            <div className=" pt-8 items-center absolute left-1/3 border-white rounded-lg p-8 shadow-2xl bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://media.istockphoto.com/id/171316883/photo/green-shopping.jpg?b=1&s=612x612&w=0&k=20&c=8X7KTDQD-jfvCTrwObS7qAQJ0PGF2djtJP1KSHcubOo=')" }}>
                <div className="form-area flex justify-center bg-cover bg-center bg-no-repeat"  >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                        <label htmlFor="product_name" className="" >Product Name</label>
                        <input type="text"
                            value={product_name}
                            onChange={(e: any) => { setProduct_name(e.target.value) }} id="product_name"
                            placeholder='Product name' className='border-2 border-green-400 text-sm' required />

                        <label htmlFor="description">Description</label>
                        <textarea id="description"
                            value={product_description}
                            onChange={(e: any) => {
                                setProduct_description(e.target.value)
                            }}

                            placeholder='Product Description' className='border-2 border-green-400 text-sm' />

                        <label htmlFor="price" className="">Product Price</label>
                        <input type="number"
                            value={product_price}
                            onChange={(e: any) => { setProduct_price(e.target.value) }}
                            id="price" placeholder='Product price' className='border-2 border-green-400 text-sm' />

                        <label htmlFor="quantity" className=''>Quantity</label>
                        <input type="number"
                            value={product_quantity}
                            onChange={(e: any) => { setProduct_quantity(e.target.value) }}
                            id="quantity" placeholder="quantity of availabe products" className='border-2 border-green-400 text-sm' required />

                        <label htmlFor="image" className="">Product Image</label>
                        <input type="file"
                            onChange={(e: any) => { setProduct_image(e.target.files[0]) }}
                            placeholder='product image' id='image' className='' required />
                        <button type='submit' className="bg-green-400 text-white p-1 border-2 hover:bg-green-5 trasform hover:scale-105">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


function uploadImageToStorage(imageFile: never) {
    throw new Error('Function not implemented.')
}

