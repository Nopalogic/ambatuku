import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";

import { createProduct } from "@/services/product";

import { cn } from "@/lib/utils";

import { DEFAULT_PRODUCT_CATEGORIES } from "@/constants/product";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import FormField from "@/components/form-field";
import InputDropzone from "@/components/input-dropzone";

import { ProductValues, productSchema } from "@/validators/product";

export default function AddProductPage() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
      variant: "",
      price: "",
      stock: "",
      image: undefined,
    },
  });

  const handleSubmit = async (data: ProductValues) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      const response = await createProduct(formData);
      if (response.success) {
        toast({
          title: "Product created successfully!",
        });
        setOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Submission failed",
      });
    }
  };

  const handleError = (errors: any) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent
        className='min-w-[80%]'
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      >
        <ProductForm
          form={form}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
}

interface ProductFormProps {
  form: ReturnType<typeof useForm<ProductValues>>;
  onSubmit: (data: ProductValues) => Promise<void>;
  onError: (errors: any) => void;
}

const ProductForm = ({ form, onSubmit, onError }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
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
                      {category.label}
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
            {...register("stock", { valueAsNumber: true })}
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
            {...register("price", { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <div className='flex w-full justify-end'>
        <Button type='submit' className='mt-6'>
          Submit
        </Button>
      </div>
    </form>
  );
};
