module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You are already logged in!");
    return res.redirect("/login");
  }
  next();
};
