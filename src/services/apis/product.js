import { serializeError } from "../../utils/error";
import apiInstance from "../instance"; // Assuming this is your axios instance

export const fetcher = async (endpoint, params) => {
  try {
    const { data } = await apiInstance.get(endpoint, { params });
    return data;
  } catch (error) {
    const serializedError = serializeError(error);
    throw serializedError;
  }
};
