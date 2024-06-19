const adminAuthKey = process.env.ADMIN_AUTH_KEY;

// Verify password
export const adminAuth = (req, res, next) => {
  const { AuthKey } = req.headers;

  if (AuthKey !== adminAuthKey) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  next();
};
