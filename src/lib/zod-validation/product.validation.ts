import { z } from "zod";
import {
  ERR_REQ_NUMBER,
  IMG_RESTRICTION_TYPE,
  REQUIRED_MSG,
} from "../../components/constants";

const sizeMax = 3;
export const productSchema = z.object({
  id: z.number().max(255).optional(),
  name: z.string().min(1, REQUIRED_MSG).max(100),
  image: z
    .instanceof(FileList)
    .refine((filelist) => filelist.length == 1, "Harap upload gambar")
    .transform((filelist) => filelist[0])
    .refine(
      (image) => image.size <= sizeMax * 1024 * 1024,
      "Ukuran harus kurang dari " + sizeMax + "MB"
    )
    .refine(
      (image) => IMG_RESTRICTION_TYPE.includes(image.type),
      "Hanya dapat upload bertipe " + IMG_RESTRICTION_TYPE.join()
    ),
  sell_price: z.coerce.number().min(1, ERR_REQ_NUMBER),
  buy_price: z.coerce.number().min(1, ERR_REQ_NUMBER),
  category_id: z.coerce.number().min(1, "Pilih kategory yang tersedia"),
  amount: z.coerce.number().min(1, ERR_REQ_NUMBER),
  updated_at: z.date().optional(),
  created_at: z.date().optional(),
});

export const addProductSchema = productSchema;
export const updateProductSchema = productSchema.omit({
  updated_at: true,
  created_at: true,
});
