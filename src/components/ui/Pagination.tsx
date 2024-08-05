import { useSearchParams } from "react-router-dom";

export default function Pagination({
  limit,
  currentPage,
  maxRow,
}: {
  limit: number;
  currentPage: number;
  maxRow: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const maxPage = Math.floor(maxRow / limit) + 1;

  const nextPage = () => {
    if (Number(searchParams.get("page")) < maxPage) {
      searchParams.set("page", String(Number(searchParams.get("page")) + 1));
      setSearchParams(searchParams);
    }
  };
  const prevPage = () => {
    if (Number(searchParams.get("page")) > 1) {
      searchParams.set("page", String(Number(searchParams.get("page")) - 1));
      setSearchParams(searchParams);
    }
  };
  const limitHandler = (val: string) => {
    searchParams.set("limit", val);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  return (
    <div className=" flex gap-4 justify-between  w-full">
      <div className=" space-x-2">
        <select
          className=" select select-sm select-accent"
          // defaultValue={limit}
          value={limit}
          onChange={(e) => limitHandler(e.target.value)}
        >
          {[5, 10, 20, 30].map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </select>
        <span>dari {maxRow}</span>
      </div>
      <div className="join">
        <button
          onClick={prevPage}
          className={
            "join-item btn btn-sm text-sm " +
            (currentPage == 1 && "btn-disabled")
          }
        >
          {"<"}
        </button>
        <span className="join-item btn btn-sm text-sm">{currentPage}</span>
        <button
          onClick={nextPage}
          className={
            "join-item btn btn-sm text-sm " +
            (maxPage == currentPage && " btn-disabled")
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
