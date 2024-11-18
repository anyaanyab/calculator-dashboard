// Function responsible for sending dashboard configuration to server via HTTP POST request

// 'async' function
const saveDashboardConfig = async (config) => {
  // 'fetch' called to make HTTP request to URL
    const response = await fetch('http://localhost:5000/api/dashboard/config', {
      method: 'POST',
      headers: {
        // JSON format of body of request
        'Content-Type': 'application/json',
        // Retrieve authentication token from browser's storage
        'x-auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ config })
    });
    // Parse response body as JSON, parsed JSON data returned 
    return response.json();
  };