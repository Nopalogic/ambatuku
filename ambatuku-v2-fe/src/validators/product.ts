import { z } from "zod";

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z.object({
  id: z.number().min(1).optional(),
  image: z
    .union([z.instanceof(File), z.string()])
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png formats are supported."
    ),
  name: z.string().min(1, "Product name harus diisi!"),
  description: z
    .string()
    .min(1, "Product description harus diisi!")
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Deskripsi tidak boleh lebih dari ${MAX_DESCRIPTION_LENGTH} karakter`
    ),
  category: z.enum(["Food", "Drink"], {
    required_error: "Product category harus dipilih!",
  }),
  variant: z.string().min(1, "Product variant harus diisi!"),
  stock: z.coerce.string().min(1, "Product stock harus diisi!"),
  price: z.coerce.string().min(1, "Product price harus diisi!"),
});

export type ProductValues = z.infer<typeof productSchema>;
