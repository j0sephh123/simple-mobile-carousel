import { isNetworkError } from "@/src/lib/utils";
import { determineQueryStatus, type QueryState } from "../useQueryStatus";

jest.mock("@/src/lib/utils", () => ({
  isNetworkError: jest.fn(),
}));

const mockIsNetworkError = isNetworkError as jest.MockedFunction<
  typeof isNetworkError
>;

describe("determineQueryStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsNetworkError.mockReturnValue(false);
  });

  describe("single query", () => {
    it("returns loading when isLoading is true", () => {
      const result = determineQueryStatus({
        isLoading: true,
        error: null,
        data: undefined,
      });

      expect(result).toBe("loading");
    });

    it("returns offline when error is network error", () => {
      const error = new Error("Network error");
      mockIsNetworkError.mockReturnValue(true);

      const result = determineQueryStatus({
        isLoading: false,
        error,
        data: undefined,
      });

      expect(result).toBe("offline");
    });

    it("returns error when error exists and is not network error", () => {
      const error = new Error("API error");
      mockIsNetworkError.mockReturnValue(false);

      const result = determineQueryStatus({
        isLoading: false,
        error,
        data: undefined,
      });

      expect(result).toBe("error");
    });

    it("returns empty when no data", () => {
      const result = determineQueryStatus({
        isLoading: false,
        error: null,
        data: undefined,
      });

      expect(result).toBe("empty");
    });

    it("returns empty when data is empty array", () => {
      const result = determineQueryStatus({
        isLoading: false,
        error: null,
        data: [],
      });

      expect(result).toBe("success");
    });

    it("returns success when data exists", () => {
      const result = determineQueryStatus({
        isLoading: false,
        error: null,
        data: { id: 1, name: "test" },
      });

      expect(result).toBe("success");
    });

    it("returns success when data is non-empty array", () => {
      const result = determineQueryStatus({
        isLoading: false,
        error: null,
        data: [{ id: 1, name: "test" }],
      });

      expect(result).toBe("success");
    });
  });

  describe("array of queries", () => {
    it("returns loading when any query is loading", () => {
      const queries = [
        { isLoading: false, error: null, data: [] },
        { isLoading: true, error: null, data: undefined },
        { isLoading: false, error: null, data: [1, 2, 3] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("loading");
    });

    it("returns offline when any query has network error", () => {
      const error = new Error("Network error");
      mockIsNetworkError.mockReturnValue(true);

      const queries = [
        { isLoading: false, error: null, data: [] },
        { isLoading: false, error, data: undefined },
        { isLoading: false, error: null, data: [1, 2, 3] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("offline");
    });

    it("returns error when any query has non-network error", () => {
      const error = new Error("API error");
      mockIsNetworkError.mockReturnValue(false);

      const queries = [
        { isLoading: false, error: null, data: [] },
        { isLoading: false, error, data: undefined },
        { isLoading: false, error: null, data: [1, 2, 3] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("error");
    });

    it("returns empty when all queries have no data", () => {
      const queries = [
        { isLoading: false, error: null, data: undefined },
        { isLoading: false, error: null, data: [] },
        { isLoading: false, error: null, data: null },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("empty");
    });

    it("returns success when any query has data", () => {
      const queries = [
        { isLoading: false, error: null, data: undefined },
        { isLoading: false, error: null, data: [] },
        { isLoading: false, error: null, data: [1, 2, 3] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("success");
    });

    it("returns success when all queries have data", () => {
      const queries: QueryState<unknown, null>[] = [
        { isLoading: false, error: null, data: [1, 2] },
        { isLoading: false, error: null, data: { id: 1 } },
        { isLoading: false, error: null, data: "test" },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("success");
    });
  });

  describe("priority order", () => {
    it("prioritizes loading over other states", () => {
      const queries = [
        { isLoading: true, error: new Error("test"), data: [1, 2, 3] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("loading");
    });

    it("prioritizes offline over error", () => {
      const networkError = new Error("Network error");
      const apiError = new Error("API error");
      mockIsNetworkError.mockImplementation((err) => err === networkError);

      const queries = [
        { isLoading: false, error: networkError, data: undefined },
        { isLoading: false, error: apiError, data: undefined },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("offline");
    });

    it("prioritizes error over empty", () => {
      const queries = [
        { isLoading: false, error: new Error("test"), data: undefined },
        { isLoading: false, error: null, data: [] },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("error");
    });

    it("prioritizes empty over success", () => {
      const queries = [
        { isLoading: false, error: null, data: [] },
        { isLoading: false, error: null, data: undefined },
      ];

      const result = determineQueryStatus(queries);

      expect(result).toBe("empty");
    });
  });
});
