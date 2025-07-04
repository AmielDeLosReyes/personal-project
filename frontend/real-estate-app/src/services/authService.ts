type SignupPayload = {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    licenseNumber?: string;
};

export async function signup(payload: SignupPayload, role: string) {
    const response = await fetch(`http://localhost:8080/api/auth/signup/${role}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
  
    return response.json(); // assuming response contains user info or success message
}

export async function login(userName: string, password: string) {
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to login");
    }
  
    return response.json();
}
  