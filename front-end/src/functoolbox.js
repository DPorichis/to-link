export  const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');

    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refresh": refresh_token
        })
    });

    if (response.ok) {
        const data = await response.json();
        // Update the access token in localStorage
        localStorage.setItem('access_token', data.access);
    } else {
        console.log("Failed to refresh access token, user is signed out");
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optionally, handle token expiration, logout the user, etc.
    }
};