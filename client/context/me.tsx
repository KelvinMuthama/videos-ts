import { ReactNode, createContext, useContext } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { Me, QueryKeys } from "../types";
import { getMe } from "../pages/api";
import { Loader } from "@mantine/core";

const MeContext = createContext<{
  user: Me;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function MeContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.me, getMe);

  return (
    <MeContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </MeContext.Provider>
  );
}

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
