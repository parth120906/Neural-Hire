const isRecruiter = (req, res, next) => {
  if (!req.user.isRecruiter) {
    return res.status(403).json({
      success: false,
      message: "Recruiter access only",
    });
  }
  next();
};

export default isRecruiter;
