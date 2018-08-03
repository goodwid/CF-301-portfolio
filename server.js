const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('./'));

app.get('*', (req, res) => {
  console.log('New request:', req.url);
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
