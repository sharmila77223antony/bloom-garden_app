
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://bloom-garden-backend.onrender.com/api"
).replace(/\/+$/, "");

async function apiRequest(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getBlogs() {
  const data = await apiRequest("/blogs/");

  // Support both normal DRF responses and paginated responses.
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.results)) {
    return data.results;
  }

  return [];
}

export async function getBlogById(id) {
  return apiRequest(`/blogs/${encodeURIComponent(id)}/`);
}

export function getBlogImage(blog) {
  if (!blog?.image) {
    return "";
  }

  // Cloudinary or other absolute image URL.
  if (/^https?:\/\//i.test(blog.image)) {
    return blog.image;
  }

  // Relative image URL served by your Django backend.
  const backendBase = API_BASE_URL.replace(/\/api\/?$/, "");
  const imagePath = blog.image.replace(/^\/+/, "");

  return `${backendBase}/${imagePath}`;
}
