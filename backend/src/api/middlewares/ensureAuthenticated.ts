/**
 * Make sure user is authenticated before moving to next route
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || "jwt" in req.cookies) {
    return next();
  }
  // req.flash('error_msg', 'Please log in to view that resource');
};

export default ensureAuthenticated;
