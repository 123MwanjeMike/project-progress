import projectRoutes from './projects';

export default (app) => {
  // index route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi! Welcome to project progress 🤸‍♂️🎉🎊' });
  });
  app.use('/projects', projectRoutes);
  // For non existent routes
  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, resource not found' });
  });
};
