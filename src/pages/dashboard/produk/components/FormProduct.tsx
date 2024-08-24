import { BiReset } from "react-icons/bi";
import { ErrorInputValidation } from "../../../../components/form/ErrorInputValidation";
import SelectInput from "../../../../components/form/Select.input";
import TextNumberInput from "../../../../components/form/TextNumber.input";
import Button from "../../../../components/ui/Button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { addProductSchema } from "../../../../lib/zod-validation/product.validation";
import { categoryServices } from "../../../../services/category.services";
import ImageInputV2 from "../../../../components/form/Image.input";

export default function FormProduct({
  formProps,
  onSubmit,
  isMutateLoading = false,
  isUpdate = false,
}: {
  formProps: UseFormReturn<z.infer<typeof addProductSchema>>;
  onSubmit: (data: z.infer<typeof addProductSchema>) => void;
  isMutateLoading: boolean;
  isUpdate?: boolean;
}) {
  const { data: categorys, isSuccess: categorySuccess } =
    categoryServices.useGetCategoryQuery("categorys");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
    watch,
  } = formProps;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-6 gap-4">
          <div className=" col-span-3">
            <TextNumberInput
              title="Judul"
              isError={!!errors.name}
              formRegister={register(`name`)}
            />
            <ErrorInputValidation>{errors.name?.message}</ErrorInputValidation>
          </div>
          <div className=" col-span-3">
            <SelectInput
              title="Kategori"
              isError={!!errors.category_id}
              formRegister={register("category_id")}
            >
              <option value={""} className=" text-gray-400">
                -- Pilih kategori --
              </option>
              {categorySuccess &&
                categorys?.data.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.name}
                  </option>
                ))}
            </SelectInput>
            <ErrorInputValidation>
              {errors.category_id?.message}
            </ErrorInputValidation>
          </div>
          <div className=" col-span-3 md:col-span-2">
            <TextNumberInput
              title="Harga beli (Rp)"
              type="number"
              isError={!!errors.buy_price}
              formRegister={register(`buy_price`)}
            />
            <ErrorInputValidation>
              {errors.buy_price?.message}
            </ErrorInputValidation>
          </div>
          <div className=" col-span-3 md:col-span-2">
            <TextNumberInput
              title="Harga jual (Rp)"
              type="number"
              isError={!!errors.sell_price}
              formRegister={register(`sell_price`)}
            />
            <ErrorInputValidation>
              {errors.sell_price?.message}
            </ErrorInputValidation>
          </div>
          <div className=" col-span-3 md:col-span-2">
            <TextNumberInput
              title="Stok"
              type="number"
              isError={!!errors.amount}
              formRegister={register(`amount`)}
            />
            <ErrorInputValidation>
              {errors.amount?.message}
            </ErrorInputValidation>
          </div>
          <div className=" col-span-6">
            <ImageInputV2
              isError={!!errors.image}
              formRegister={register("image")}
              defaultImage={watch("image") as unknown as string}
            />
            <ErrorInputValidation>{errors.image?.message}</ErrorInputValidation>
          </div>
        </div>
        <div className=" flex justify-end gap-x-4 w-full  mt-4">
          <button
            type="button"
            title="reset"
            onClick={() => reset()}
            className=" btn btn-square mr-0"
          >
            <BiReset />
          </button>
          <Button className=" btn-primary" title="simpan" type="submit" isLoading={isMutateLoading}>
            {isUpdate ? "Ubah" : "Simpan"}
          </Button>
        </div>
      </form>
    </>
  );
}
