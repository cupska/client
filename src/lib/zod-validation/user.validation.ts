import { z } from "zod";
import { REQUIRED_MSG } from "../../components/constants";

const userSchema = z.object({
  id: z.number(),
  fullname: z.string().min(1, REQUIRED_MSG).max(100, "Maksimal 100 huruf"),
  image: z.string().max(255).optional(),
  role: z.string().max(255).default("admin").optional(),
  username: z
    .string()
    .min(6, "Minimal 6 huruf")
    .max(20, "Maksimal 20 huruf")
    .regex(/^(?!.*[_.]{2})[a-zA-Z0-9._]+$/, {
      message:
        "Hanya dapat menggunakan huruf, angka, underscore dan tanda titik",
    })
    .refine((value) => !/^[_.]/.test(value) && !/[_.]$/.test(value), {
      message:
        "Tidak boleh diawali atau diakhiri dengan underscore maupun tanda titik",
    }),
  password: z
    .string()
    .min(6, "Minimal 6 huruf")
    .max(100)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Hanya dapat menggunakan huruf kecil, angka, dan underscore"
    )
    .regex(/^(?=.*[A-Z]).*$/, "Gunakan minimal 1 huruf besar"),
});

const registerSchema = userSchema
  .omit({ id: true, image: true, role: true })
  .merge(
    z.object({
      passwordConfirm: z.string().min(1, REQUIRED_MSG),
    })
  )
  .refine((data) => data.password === data.passwordConfirm, {
    message: "konfirmasi kata sandi tidak sesuai",
    path: ["passwordConfirm"],
  });

const loginSchema = z.object({
  username: z.string().min(1, REQUIRED_MSG).max(150),
  password: z.string().min(1, REQUIRED_MSG).max(150),
});

export { registerSchema, userSchema, loginSchema };
