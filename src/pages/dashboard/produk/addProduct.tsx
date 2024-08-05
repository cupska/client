import { useForm } from "react-hook-form";
import { dataProdukBreadcrums } from ".";
import Breadcrumbs from "../../../components/ui/Breadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../../../lib/zod-validation/product.validation";
import { z } from "zod";

import { productServices } from "../../../services/product.services";
import { useNavigate } from "react-router-dom";
import FormProduct from "./components/FormProduct";

type addProductsSchemaType = z.infer<typeof addProductSchema>;

export default function AddProduct() {
  const [mutateProduct, { isLoading: isLoadingMutate }] =
    productServices.useAddProductsMutation();

  const navigate = useNavigate();

  const formProps = useForm<addProductsSchemaType>({
    resolver: zodResolver(addProductSchema),
  });

  const submitHandler = (data: addProductsSchemaType) => {
    const formdata = new FormData();
    for (const [key, val] of Object.entries(data)) {
      formdata.set(key, val as string);
    }
    console.log({ data, formdata });
    // mutateProduct(formdata as unknown as addProductsSchemaType).then(() =>
    //   navigate("/dashboard/produk")
    // );
  };

  return (
    <>
      <Breadcrumbs
        datas={dataProdukBreadcrums.filter((_, i) => [0, 1].includes(i))}
        className=" text-xl font-semibold"
      />
      <FormProduct
        formProps={formProps}
        isMutateLoading={isLoadingMutate}
        onSubmit={submitHandler}
      />
    </>
  );
}
