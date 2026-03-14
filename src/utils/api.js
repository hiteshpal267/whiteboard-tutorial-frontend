// call a put api to update the canvas on URL /canvas/:id

const API_BASE_URL = "http://localhost:4030/canvas";

export const updateCanvas = async (id, elements) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ elements }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update the canvas");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to update the canvas");
  }
};
