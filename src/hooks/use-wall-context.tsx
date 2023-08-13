import { useContext } from "react";
import WallContext from "../context/wall";
import { WallContextType } from "../interfaces/interfaces";

function useWallContext() {
  const wallContextValue = useContext(WallContext);
  return wallContextValue as WallContextType;
}

export default useWallContext