import "@testing-library/jest-native/extend-expect";

global.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock("expo-router", () => require("expo-router/testing-library"));
