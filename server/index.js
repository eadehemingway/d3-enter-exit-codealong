const app = require('./app');
const port = app.get('port');

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
