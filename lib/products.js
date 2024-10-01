import { NextResponse } from "next/server";
import supabase from '../../../lib/supabase';
import { error } from "console";

export default async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    throw new Error(error.message); 
  }

  return data;
}

