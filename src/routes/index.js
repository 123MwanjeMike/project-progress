import userRoutes from './user';

export default (app) => {
  // index route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi! Welcome to project progress 🤸‍♂️🎉🎊' });
  });
  app.use('/user', userRoutes);
  // For non existent routes
  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, resource not found' });
  });
};
