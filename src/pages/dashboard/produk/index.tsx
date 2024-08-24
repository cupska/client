import { NavLink, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../components/ui/Breadcrumb";
import { productServices } from "../../../services/product.services";
import SearchInput from "../../../components/form/Search.input";
import SelectInput from "../../../components/form/Select.input";
import { categoryServices } from "../../../services/category.services";
import Pagination from "../../../components/ui/Pagination";
import { useState } from "react";
import { productSchema } from "../../../lib/zod-validation/product.validation";
import { z } from "zod";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { currencyFormater } from "../../../utils/currencyFormater";
import Button from "../../../components/ui/Button";

// import { useDispatch } from "react-redux";
// import { setPopTime, toastSlice } from "../../../features/toastSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const dataProdukBreadcrums: { label: string; path: string }[] = [
  {
    label: "Daftar Produk",
    path: "/dashboard/produk",
  },
  {
    label: "Tambah Produk",
    path: "tambah-produk",
  },
  {
    label: "Ubah Produk",
    path: "ubah-produk",
  },
];

export default function Produk() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<number>();
  const [searchParam] = useSearchParams();
  const filter = {
    limit: Number(searchParam.get("limit")) || 5,
    page: Number(searchParam.get("page")) || 1,
  };
  const productQuery = productServices.useGetProductsQuery({
    paging: {
      ...(filter.limit && { limit: filter.limit }),
      ...(filter.page && { page: filter.page }),
      title: title,
      category: category,
    },
  });
  const categoryQuery = categoryServices.useGetCategoryQuery("categorys");
  return (
    <>
      <Breadcrumbs
        datas={[dataProdukBreadcrums[0]]}
        className=" text-xl font-semibold"
      />
      <div className=" flex max-md:gap-y-2  flex-wrap w-full max-md:flex-col justify-between md:items-end">
        <div className="flex gap-x-4">
          <SearchInput
            placeholder="Cari produk"
            onChange={(e) => setTitle(e.target.value)}
          />

          <SelectInput onChange={(e) => setCategory(Number(e.target.value))}>
            <option value={0} key={123}>
              Semua
            </option>
            {categoryQuery.isSuccess &&
              categoryQuery.data.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </SelectInput>
        </div>
        <div className=" flex space-x-4">
          <Button
            type="button"
            className=" btn-primary flex-1"
            onClick={async () => {
              const res = await fetch(
                import.meta.env.VITE_API_URL + "/export-csv",
                { credentials: "include" }
              );
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "data.csv"; // Nama file yang akan didownload
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            }}
          >
            Export
          </Button>
          <NavLink to={dataProdukBreadcrums[1].path} className="btn btn-accent flex-1">
            Tambah Produk
          </NavLink>
        </div>
      </div>
      <div className="overflow-x-auto max-w-full  relative mt-10  ">
        {productQuery.isLoading && (
          <span className=" loading absolute right-1/2 bottom-1/2 loading-spinner loading-md"></span>
        )}
        {productQuery.isSuccess &&
          (productQuery.data.data.length > 0 ? (
            <TableProduct
              onRefetch={productQuery.refetch}
              datas={productQuery.data.data}
              paging={productQuery.data.pagination}
            />
          ) : (
            <>
              <div className=" w-fit text-gray-500 m-auto">Belum ada data</div>
            </>
          ))}
      </div>
      <div className="flex justify-center mt-10">
        {productQuery.isSuccess && productQuery.data.data.length > 0 && (
          <Pagination
            limit={productQuery.data?.pagination.limit}
            maxRow={productQuery?.data?.pagination.totalRow}
            currentPage={productQuery.data.pagination.page}
          />
        )}
      </div>
    </>
  );
}

// function ExportCSVProducts() {

// }

function TableProduct({
  datas,
  paging,
  onRefetch,
}: {
  datas: (z.infer<typeof productSchema> & { category_name: string })[];
  paging: { page: number; limit: number; totalRow: number };
  onRefetch: () => void;
}) {
  const [mutateDelProduct, { isLoading }] =
    productServices.useDeleteProductMutation();

  const mutateDelProductHandler = (id: number) => {
    mutateDelProduct(id).then(onRefetch);
  };

  return (
    <>
      <table className="table table-md table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Gambar</td>
            <td>Nama Produk</td>
            <td>Kategori</td>
            <td>Harga Beli</td>
            <td>Harga Jual</td>
            <td>Stok Barang</td>
          </tr>
        </thead>
        {datas.map((row, i) => (
          <tbody key={i}>
            <tr key={row.id}>
              <th>{i + 1 + paging.limit * (paging.page - 1)}</th>
              <td>
                <img
                  className=" max-w-44"
                  src={import.meta.env.VITE_API_URL + "/img/" + row.image}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.category_name}</td>
              <td>{currencyFormater(row.buy_price)}</td>
              <td>{currencyFormater(row.sell_price)}</td>
              <td>{row.amount}</td>
              <td>
                <div className=" flex gap-x-2">
                  <NavLink
                    to={"ubah-produk/" + String(row.id)}
                    title="ubah"
                    type="button"
                    className=" btn-icon text-lg"
                  >
                    <FaEdit />
                  </NavLink>
                  <button
                    title="hapus"
                    disabled={isLoading}
                    onClick={() => mutateDelProductHandler(row.id as number)}
                    className=" btn-icon text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
