import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    // ตรวจสอบว่าเราอยู่ใน browser environment
    if (typeof window !== 'undefined') {
      const hasToken = Boolean(localStorage.getItem("token"));

      if (hasToken) {
        req.headers = {
          ...req.headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
    }

    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data?.error?.includes("Unauthorized")
      ) {
        // ตรวจสอบว่าเราอยู่ใน browser environment
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
          window.location.replace("/");
        }
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;