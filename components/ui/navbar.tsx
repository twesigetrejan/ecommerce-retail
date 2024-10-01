"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
    const { cart } = useCart();
    const [loggedIn, setLoggedIn] = useState(false);

    const status = () => {
        setLoggedIn((prev) => !prev);
    };

    return (
        <div className="w-full h-[70px] bg-green-500 relative mb-4">
            <div className="container mx-auto flex justify-between items-center h-full px-4 relative">
                <div>
                    <Image
                        src="/logo.jpg"
                        width={50}
                        height={50}
                        alt="logo"
                        className="rounded-xl absolute -left-20 top-2 border-1 border-white"
                    />
                    <p className="text-white shadow-white shadow-md border-neutral-50">
                        localbiz welcomes you back
                    </p>
                </div>
                <div className="right flex justify-center gap-11 relative">
                    <div className="search-btn absolute -left-[600px] -top-2">
                        <input type="text" className="bg-gray-300 p-1" placeholder="search" />
                    </div>
                    <div className="links flex justify-center gap-3 absolute -left-[280px]">
                        <Link href="/" className="text-gray-300 hover:text-white hover:scale-110 transform pb-1">
                            Home
                        </Link>
                        <Link href="/explore" className="text-gray-300 hover:text-white hover:scale-110 transform pb-1">
                            Explore
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white hover:scale-110 transform pb-1">
                            About
                        </Link>
                        <div className="relative ">
                            <DropdownMenu>
                                <DropdownMenuTrigger> 🛒</DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white absolute -left-[150px] w-[250px]">
                                    <DropdownMenuLabel className="text-gray-300 font-medium items-center flex">LocalBiz Cart</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {cart.length > 0 ? (
                                        cart.map((item) => (
                                            <DropdownMenuItem key={item.id}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={60}
                                                                height={60}
                                                                className="rounded-md object-cover"
                                                            />

                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold">{item.name}</p>
                                                            <p className="text-xs text-gray-600">${item.price}</p>
                                                        </div>

                                                    </div>


                                                </div>
                                            </DropdownMenuItem>

                                        ))
                                    ) : (
                                        <DropdownMenuItem>
                                            <p className="text-sm text-gray-500">Cart is empty</p>
                                        </DropdownMenuItem>
                                    )}

                                </DropdownMenuContent>

                            </DropdownMenu>
                            <p className="cart-items border border-1 text-sm rounded-full px-1 absolute bg-green-500 text-white -top-2 -right-1">
                                {cart.length}
                            </p>
                        </div>
                        <div className="pb-1">
                            <Link href="/auth/login">
                                <button className="status bg-white text-green-500 px-1 pr-1 rounded-sm text-sm transform hover:scale-105 ml-6" onClick={status}>
                                    {loggedIn ? "Logout" : "Login"}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex relative text-wrap top-20">
                <Link href="/registerproduct">
                    <button className="rounded-none bg-green-500 text-white px-2 py-10 text-sm shadow-2xl shadow-green-500">
                        Register Product
                    </button>
                </Link>
            </div>
        </div>
    );
}
