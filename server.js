const requestProxy = require('express-request-proxy');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', (req, res) => {
  console.log('New request:', req.url);
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
