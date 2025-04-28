<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'success get all products data.',
            'data' => $products,
        ], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product Not Found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'success get all products data.',
            'data' => $product,
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'variant' => 'required|string',
            'price' => 'required|string',
            'stock' => 'required|string',
        ]);

        $image = $request->file('image');
        $image->storeAs('products/', $image->hashName());

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category' => $request->category,
            'image' => $image->hashName(),
            'variant' => $request->variant,
            'price' => (int)$request->price,
            'stock' => (int)$request->stock,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Add Product successfully',
        ], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product Not Found',
                ], 404);
            }

            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'category' => 'required|in:Food,Drink',
                'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
                'variant' => 'required|string',
                'price' => 'required|string',
                'stock' => 'required|string',
            ]);

            if ($request->file('image')) {
                Storage::delete('products/' . basename($product->image));
                $image = $request->file('image');
                $image->storeAs('products/', $image->hashName());
                $product->image = $image->hashName();
            }

            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'category' => $request->category,
                'variant' => $request->variant,
                'price' => (int)$request->price,
                'stock' => (int)$request->stock,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Success update product data.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Update failed',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product Not Found',
                ], 404);
            }

            Storage::delete('products/' . basename($product->image));
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Success delete product data.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
            ], 500);
        }
    }
}
