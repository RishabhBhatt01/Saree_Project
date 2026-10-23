import axios from "axios";

// Backend base URL. The auth cookie is httpOnly, so we rely on
// `withCredentials: true` to send/receive it automatically —
// nothing in the frontend ever reads the token directly.
export const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ---------- Auth ----------
export const registerUser = (data) => api.post("/api/auth/register-user", data);

export const loginUser = (data) => api.post("/api/auth/login-user", data);

export const verifyEmail = (token, email) =>
  api.get("/api/auth/verify-email", { params: { token, email } });

export const resendVerification = (email) =>
  api.post("/api/auth/resend-verification", { email });

export const logoutUser = () => api.post("/api/auth/logout");

export const getCurrentUser = () => api.get("/api/fetch/get-user");

// ---------- Sarees ----------

export const getSarees = (params) =>
  api.get("/api/submit-get/getsarees", { params });
export const getOneSaree = (id) => api.get(`/api/submit-get/getOneSaree/${id}`);

// formData must contain: name, price, fabric, category, description, sareeImg (file)
export const createSaree = (formData) =>
  api.post("/api/submit-get/create-sarees", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateSaree = (id, formData) =>
  api.put(`/api/submit-get/update-saree/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteSaree = (id) =>
  api.delete(`/api/submit-get/delete-saree/${id}`);

// ---------- Cart ----------
export const addToCart = (sareeId, quantity) =>
  api.post("/api/cart/add-to-cart", { sareeId, quantity });

export const getCart = () => api.get("/api/cart/get-cart");

// quantity is a DELTA — pass positive to increase, negative to decrease
export const updateCartQuantity = (sareeId, quantity) =>
  api.patch(`/api/cart/update-cart-quantity/${sareeId}`, { quantity });

export const removeFromCart = (sareeId) =>
  api.delete(`/api/cart/delete-cart/${sareeId}`);

// ---------- Address ----------
export const submitAddress = (data) =>
  api.post("/api/address/submit-address", data);

export const getAddresses = () => api.get("/api/address/get-address");

// ---------- Orders ----------
export const verifyPayment = (data) =>
  api.post("/api/order/verify-payment", data);

export const cancelPayment = (orderId) =>
  api.post("/api/order/cancel-payment", { orderId });

export const createOrder = (addressId) =>
  api.post("/api/order/create-order", { addressId });

export const getOrders = () => api.get("/api/order/get-order");

export const getOneOrder = (orderId) =>
  api.get(`/api/order/get-one-order/${orderId}`);

// ---------- Admin ----------
export const getAdminDashboardData = () =>
  api.get("/api/dashboard-data/admin-dashboard-data");

export const getAdminOrders = (page = 1) =>
  api.get(`/api/admin-order/get-admin-orders?page=${page}`);

export const getSingleOrderDetailsAdmin = (orderId) =>
  api.get(`/api/fetch/single-order-details/${orderId}`);

export const updateOrderStatus = (orderId, status) =>
  api.post(`/api/fetch/update-order-status/${orderId}`, { status });

export default api;
