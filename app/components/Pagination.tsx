const Pagination = () => {
  const pageSizes = [10, 20, 30, 40, 50];
  return (
    <>
      <div className="flex flex-wrap justify-center shadow-sm p-1 ">
        <div className="flex flex-wrap justify-between gap-1 items-center">
          <button className="btn bg-zinc-200">«</button>
          <button className="btn bg-zinc-200">‹</button>
          <button className="btn bg-zinc-200">›</button>
          <button className="btn bg-zinc-200">»</button>
          <div className="flex flex-wrap items-center">
            <div className="mr-2">Page</div>
            <strong>1 of 10</strong>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            | Go to page :
            <input type="number" className="border rounded p-1" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            | Show :
            <select className="border rounded">
              {pageSizes.map((pageSize) => (
                <option key={pageSize}>{pageSize}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pagination;
