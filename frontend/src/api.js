const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function registerUser(email, firstName, lastName) {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
}

export async function recognizeUser(email) {
  const response = await fetch(`${API_BASE_URL}/auth/recognize/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to recognize user.");
  }

  return data;
}

export async function verifyCode(email, code) {
  const response = await fetch(`${API_BASE_URL}/auth/verify-code/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Code verification failed.");
  }

  return data;
}

export async function submitCheckout(
  email,
  phone,
  shippingAddress
) {
  const response = await fetch(`${API_BASE_URL}/checkout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      phone,
      shipping_address: shippingAddress,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Checkout failed.");
  }

  return data;
}