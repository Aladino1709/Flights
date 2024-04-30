const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "http://localhost:5024",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
