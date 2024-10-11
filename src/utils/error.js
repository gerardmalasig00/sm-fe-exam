export const serializeError = (error) => {
  let status = 500;
  let message = "An unknown error occurred.";
  let data;

  if (error.response) {
    // The request was made and the server responded with a status code
    status = error.response.status;
    message = error.response.data?.message || "Server Error";
    data = error.response.data; // Pass the entire response data for debugging
  } else if (error.request) {
    // The request was made but no response was received (e.g., network issue)
    status = 0;
    message = "Network error. Please check your internet connection.";
  } else {
    // Something happened in setting up the request
    message = error.message;
  }

  return { status, message, data };
};
