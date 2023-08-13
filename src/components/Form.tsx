import { useState, ChangeEvent, FormEvent, useEffect, useCallback, useMemo, useContext } from "react";
import useWallContext from "../hooks/use-wall-context";
import Pagination from "./Pagination";

function Form() {
  const options = [20, 50, 100];
  const [accessToken, setAccessToken] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [countPostsOnPage, setCountPostsOnPage] = useState<number>(options[0] ?? 20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0)
  const [initialRender, setInitialRender] = useState<boolean>(false)

  const { fetchWallData, searchOnWall } = useWallContext()

  const fetchData = useCallback(
    async (offset: number) => {
      if (accessToken === "" || domain === "") {
        return 0
      }
      let allCounts;
      if (searchValue) {
        allCounts = await searchOnWall(accessToken, domain, countPostsOnPage, offset, searchValue);
      } else {
        allCounts = await fetchWallData(accessToken, domain, countPostsOnPage, offset);
      }
      return allCounts;
    },
    [searchValue, accessToken, domain, countPostsOnPage, fetchWallData, searchOnWall]
  );

  useEffect(() => {
    if(initialRender) {
      const offset = countPostsOnPage * (currentPage - 1);
      fetchData(offset).then((allCounts) => setTotalPostsCount(allCounts));
    }
  }, [countPostsOnPage, currentPage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const offset = 0;
    const allCounts = await fetchData(offset);
    setTotalPostsCount(allCounts);
    setInitialRender(true);
  };

  const handleChangeSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCountPostsOnPage(Number(event.target.value));
    setCurrentPage(1)
  }, []);

  const optionsList = useMemo(() => (
    options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))
  ), [options]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          type="text"
          placeholder="accessToken"
        />
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          type="text"
          placeholder="domain"
        />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="search"
        />
        <select value={countPostsOnPage} onChange={handleChangeSelect}>
          {optionsList}
        </select>
        <button type="submit">submit</button>
      </form>
      <div className="pagination-block">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalPostsCount}
          pageSize={countPostsOnPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default Form;
