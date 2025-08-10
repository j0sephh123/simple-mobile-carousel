import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useRefresh } from "../useRefresh";

describe("useRefresh", () => {
  it("returns initial state", () => {
    const mockRefetch = jest.fn();
    const { result } = renderHook(() => useRefresh(mockRefetch));

    expect(result.current.refreshing).toBe(false);
    expect(typeof result.current.handleRefresh).toBe("function");
  });

  it("sets refreshing to true and then false when handleRefresh is called", async () => {
    const mockRefetch = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useRefresh(mockRefetch));

    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.handleRefresh();
    });

    expect(result.current.refreshing).toBe(true);

    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });
  });

  it("calls refetch function when handleRefresh is called", async () => {
    const mockRefetch = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useRefresh(mockRefetch));

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockRefetch).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });
  });
});
