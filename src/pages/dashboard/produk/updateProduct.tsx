import { useForm } from "react-hook-form";
import FormProduct from "./components/FormProduct";
import { z } from "zod";
import { updateProductSchema } from "../../../lib/zod-validation/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { productServices } from "../../../services/product.services";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/ui/Breadcrumb";
import { dataProdukBreadcrums } from ".";

type updateProductSchemaType = z.infer<typeof updateProductSchema>;
const updateProductSchemaNoImg = updateProductSchema.omit({
  image: true,
});
export default function UpdateProduct() {
  const [schema, setSchema] = useState(updateProductSchemaNoImg);
  const { productId } = useParams();
  const [mutateUpdate] = productServices.useUpdateProductMutation();
  const { data: productQuery, isSuccess } =
    productServices.useGetProductByIdQuery(String(productId));
  const formProps = useForm<updateProductSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: productQuery?.data,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => formProps.reset(productQuery?.data), [isSuccess]);
  const imgFormVal = formProps.watch("image");
  useEffect(() => {
    if (typeof imgFormVal === "string") {
      setSchema(updateProductSchema);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgFormVal]);

  const submitHandler = (
    datas: Partial<updateProductSchemaType> & { [key: string]: unknown }
  ) => {
    console.log({ datas });
    const formdata = new FormData();
    for (const [key, val] of Object.entries(datas)) {
      if (val != productQuery?.data[key]) {
        formdata.set(key, val as string);
        alert(key);
      }
    }
    mutateUpdate({
      payload: formdata as unknown as updateProductSchemaType,
      productId: String(productId),
    });
  };

  console.log({
    err: formProps.formState.errors,
    wat: formProps.watch("image") == productQuery?.data.image,
    schena: schema,
  });
  return (
    <>
      <Breadcrumbs
        datas={dataProdukBreadcrums.filter((_, i) => [0, 2].includes(i))}
        className=" text-xl font-semibold"
      />
      <FormProduct
        formProps={formProps}
        isMutateLoading={false}
        onSubmit={submitHandler}
        isUpdate
      />
    </>
  );
}
