const PASSWORD = 'abc123';

// Check password
export const adminAuth = (req, res, next) => {
  const { pass } = req.headers;

  if (pass !== PASSWORD) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  next();
};
