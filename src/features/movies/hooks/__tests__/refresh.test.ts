import { act, renderHook } from "@testing-library/react-native";
import { useHomeRefresh } from "../useHomeScreen/refresh";

describe("useHomeRefresh", () => {
  it("exposes initial shape", () => {
    const { result } = renderHook(() =>
      useHomeRefresh(
        jest.fn().mockResolvedValue(undefined),
        jest.fn().mockResolvedValue(undefined),
        jest.fn().mockResolvedValue(undefined)
      )
    );

    expect(result.current.refreshing).toBe(false);
    expect(typeof result.current.handleRefresh).toBe("function");
  });

  it("calls all refetchers and resets refreshing", async () => {
    const refetchFeatured = jest.fn().mockResolvedValue(undefined);
    const refetchTrending = jest.fn().mockResolvedValue(undefined);
    const refetchPopular = jest.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useHomeRefresh(refetchFeatured, refetchTrending, refetchPopular)
    );

    await act(async () => {
      await result.current.handleRefresh();
    });

    expect(refetchFeatured).toHaveBeenCalledTimes(1);
    expect(refetchTrending).toHaveBeenCalledTimes(1);
    expect(refetchPopular).toHaveBeenCalledTimes(1);
    expect(result.current.refreshing).toBe(false);
  });
});
