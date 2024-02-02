const PASSWORD = 'abc123';

// Check password
export const adminAuth = (req, res, next) => {
  const { password } = req.body;

  console.log(password);

  if (password !== PASSWORD) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  next();
};
