import app from './src';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application is up and running on port ${port}`);
});
