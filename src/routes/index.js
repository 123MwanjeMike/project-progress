import authRoutes from './auth';
import projectRoutes from './projects';
import columnRoutes from './columns';
import cardRoutes from './cards';

export default (app) => {
  // index route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi! Welcome to project progress 🤸‍♂️🎉🎊' });
  });
  app.use('/auth', authRoutes);
  app.use('/projects', projectRoutes);
  app.use('/columns', columnRoutes);
  app.use('/cards', cardRoutes);
  // For non existent routes
  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, resource not found' });
  });
};
