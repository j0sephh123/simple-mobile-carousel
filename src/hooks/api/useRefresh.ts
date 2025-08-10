import React from "react";

export function useRefresh(refetchFn: () => Promise<any> | Promise<any>[]) {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetchFn();
    } finally {
      setRefreshing(false);
    }
  };

  return { refreshing, handleRefresh };
}
