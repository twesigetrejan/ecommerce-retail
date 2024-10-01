import { NextResponse } from "next/server";
import { supabase } from '../../../lib/supabase';
import { error } from "console";

export async function GET() {
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function POST(req, res) {
//   const { product_name, product_description, product_price, product_quantity, product_image } = req.body;



//   try {
//     const { data, error } = await supabase.from('products').insert([
//       {
//         product_name: product_name,
//         description: product_description,
//         price: product_price,
//         quantity: product_quantity,
//         image: product_image, // Updated with uploaded image URL
//       },
//     ]);

//     if (error) {
//       throw error;
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// }

