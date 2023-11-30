module.exports = {
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: "http://localhost:8080",
      headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
