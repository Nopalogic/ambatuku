import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";

import api from "@/services/api";
import { updateProduct } from "@/services/product";

import { Route } from "@/routes/admin/products/$id";

import { cn } from "@/lib/utils";

import { DEFAULT_PRODUCT_CATEGORIES } from "@/constants/product";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Main } from "@/components/admin/layout/main";
import FormField from "@/components/form-field";
import InputDropzone from "@/components/input-dropzone";

import { ProductValues, productSchema } from "@/validators/product";

import ProductDelete from "./delete";

export default function ProductEditPage() {
  const { id } = Route.useParams();
  const { response } = useLoaderData({ from: "/admin/products/$id" });

  const { toast } = useToast();
  const navigate = useNavigate();

  const product = {
    ...response.data,
    price: String(response.data.price),
    stock: String(response.data.stock),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const onSubmit = async (data: ProductValues) => {
    try {
      const payload = {
        ...data,
        image: data.image instanceof File ? data.image : undefined,
      };

      let requestData;
      let headers = {};

      if (payload.image instanceof File) {
        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value instanceof File ? value : String(value));
          }
        });
        headers = { "Content-Type": "multipart/form-data" };
        requestData = formData;
      } else {
        headers = { "Content-Type": "application/json" };
        requestData = payload;
      }

      const response = await api.put(
        `http://127.0.0.1:8000/api/products/${id}`,
        requestData,
        { headers }
      );
      if (response.data.success) {
        toast({
          title: "Update product successfully!",
        });
        navigate({ to: "/admin/products" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Submission failed",
      });
    }
  };

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors).map(
      (error: any) => error.message
    );

    toast({
      variant: "destructive",
      title: `There ${errorMessages.length > 1 ? "were" : "was"} ${errorMessages.length} error${errorMessages.length > 1 && "s"} with your submission`,
      description: (
        <ul className='list-disc pl-4'>
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
  };

  return (
    <Main fixed>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Update Product</h1>
        <Button
          variant='outline'
          onClick={() => navigate({ to: "/admin/products" })}
        >
          Back
        </Button>
      </div>
      <form className='space-y-2' onSubmit={handleSubmit(onSubmit, onError)}>
        <div className='flex gap-4'>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <InputDropzone
                label='Product Image'
                description='Click to browse image or drag & drop here'
                errors={errors}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className='w-full space-y-2'>
            <FormField label='Product Name' id='name'>
              <Input
                type='text'
                placeholder='Your product name'
                className={cn("border-gray-500", {
                  "border-destructive": errors.name,
                })}
                {...register("name")}
              />
            </FormField>
            <FormField label='Product Description' id='description'>
              <Textarea
                className={cn("h-[8.5em] resize-none border-gray-500", {
                  "border-destructive": errors.description,
                })}
                placeholder='Your product description (max. 1000 character)'
                {...register("description")}
              />
            </FormField>
          </div>
        </div>
        <div className='flex w-full gap-4'>
          <FormField label='Product Category' id='category' className='w-full'>
            <Controller
              name='category'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={cn("border-gray-500 capitalize", {
                      "border-destructive": errors.category,
                    })}
                  >
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className='capitalize'
                      >
                        {category.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField label='Product Stock' id='stock' className='w-full'>
            <Input
              type='text'
              className={cn("border-gray-500", {
                "border-destructive": errors.stock,
              })}
              min='0'
              placeholder='Your product stock (e.g. 100, 54)'
              {...register("stock")}
            />
          </FormField>
        </div>
        <div className='flex w-full gap-4'>
          <FormField label='Product Variant' id='variant' className='w-full'>
            <Input
              type='text'
              className={cn("border-gray-500", {
                "border-destructive": errors.variant,
              })}
              placeholder='Your product variant (e.g. 1kg, 600ml)'
              {...register("variant")}
            />
          </FormField>
          <FormField label='Product Price' id='price' className='w-full'>
            <Input
              type='text'
              className={cn("border-gray-500", {
                "border-destructive": errors.price,
              })}
              placeholder='Your product price (e.g. 10000, 40000)'
              {...register("price")}
            />
          </FormField>
        </div>
        <div className='flex w-full justify-end gap-4'>
          <ProductDelete id={id} />
          <Button type='submit' className='mt-6'>
            Submit
          </Button>
        </div>
      </form>
    </Main>
  );
}
