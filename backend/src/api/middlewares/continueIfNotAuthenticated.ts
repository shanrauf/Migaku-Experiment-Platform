/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const continueIfNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated() && !('jwt' in req.cookies)) {
    return next();
  }
  res.redirect('/dashboard');
};

export default continueIfNotAuthenticated;
