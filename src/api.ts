const API_BASE = import.meta.env.VITE_API_URL;

export const fetchProducts = () => fetch(`${API_BASE}/products`).then(res => res.json());
export const fetchProductById = (id: string) => fetch(`${API_BASE}/products/${id}`).then(res => res.json());
// Add more here
