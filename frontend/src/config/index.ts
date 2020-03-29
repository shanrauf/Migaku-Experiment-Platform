export default {
  ROOT_FRONTEND_URL:
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
      ? 'http://localhost:8080'
      : 'https://trials.massimmersionapproach.com',
  ROOT_API_URL:
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
      ? 'http://localhost:3000'
      : 'https://trials.massimmersionapproach.com'
};
