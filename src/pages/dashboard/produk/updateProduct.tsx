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
  const [schema, setSchema] = useState<
    typeof updateProductSchema | typeof updateProductSchemaNoImg
  >(updateProductSchema);
  const { productId } = useParams();
  const [mutateUpdate] = productServices.useUpdateProductMutation();

  const { data: productQuery, isSuccess } =
    productServices.useGetProductByIdQuery(String(productId));

  const formProps = useForm<updateProductSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: productQuery?.data,
  });
  useSchemaSelectByImageVal(setSchema, [formProps.watch("image")]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => formProps.reset(productQuery?.data), [isSuccess]);

  const submitHandler = (
    datas: Partial<updateProductSchemaType> & { [key: string]: unknown }
  ) => {
    const formdata = new FormData();
    for (const [key, val] of Object.entries(datas)) {
      if (val != productQuery?.data[key]) {
        formdata.set(key, val as string);
      }
    }
    mutateUpdate({
      payload: formdata as unknown as updateProductSchemaType,
      productId: String(productId),
    });
  };

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

const useSchemaSelectByImageVal = (
  onSelect: (
    schema: typeof updateProductSchema | typeof updateProductSchemaNoImg
  ) => void,
  [imgVal]: [imgVal: string | File]
) => {
  useEffect(() => {
    if (typeof imgVal == "string") {
      onSelect(updateProductSchemaNoImg);
    } else {
      onSelect(updateProductSchema);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgVal]);
};
