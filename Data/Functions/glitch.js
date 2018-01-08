let methods = {
  run : function() {
    const express = require('express');
    const http = require('http');
    const app =  express();
    
    app.get("/", (request, response) => {
      console.log('[SYS] | 💻 | '+Date.now() + " | Ping Received");
      response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 250000);
  }
}

module.exports = methods;