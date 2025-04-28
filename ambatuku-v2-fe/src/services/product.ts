import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";

import api, { handleApiError } from "./api";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await api.post("/products", productData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        "Content-type":
          productData instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteProduct = async (id: number | string) => {
  try {
    const token = localStorage.getItem("ambatuku-token");
    const response = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
