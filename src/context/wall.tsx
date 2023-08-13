import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { WallContextType } from "../interfaces/interfaces";
import { Post } from "../interfaces/Post";

const WallContext = createContext<WallContextType | undefined>(undefined);

function WallProvider({children}: { children: ReactNode }) {
  const [wallData, setWallData] = useState<Post[]>([])

  const fetchWallData = useCallback(async (accessToken: string, domain: string, countPostsOnPage: number, offset: number) => {
    try {
      const response: AxiosResponse = await axios.get(`http://localhost:8010/proxy/method/wall.get?domain=${domain}&v=5.131&count=${countPostsOnPage}&offset=${offset}&access_token=${accessToken}`);
      setWallData(response.data.response.items);
      return response.data.response.count;
    } catch (error) {
      console.error('Error fetching wall data:', error);
      return 0;
    }
  }, []);


  const searchOnWall = useCallback(async (accessToken: string, domain: string, countPostsOnPage: number, offset: number, query: string) => {
    try {
      const response: AxiosResponse = await axios.get(`http://localhost:8010/proxy/method/wall.search?domain=${domain}&v=5.131&count=${countPostsOnPage}&query="${query}"&offset=${offset}&access_token=${accessToken}&owners_only=1`);
      setWallData(response.data.response.items);
      return response.data.response.count;
    } catch (error) {
      console.error('Error searching wall:', error);
      return 0;
    }
  }, []);

  const valueToShare: WallContextType = useMemo(() => {
    return {
      wallData,
      fetchWallData,
      searchOnWall,
    };
  }, [wallData, fetchWallData, searchOnWall]);

  return (
    <WallContext.Provider value = {valueToShare}>
      {children}
    </WallContext.Provider>
  )
}

export {WallProvider}
export default WallContext