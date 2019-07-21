const controlHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];

  try {
    let result;
    result = await promise(...boundParams);

    if (result) {
      // Handles the response sent
      return res.status(result.status || 200).json(result);
    }
    return res
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong. Please try again."
      });
  } catch (error) {
    if (error.isJoi && error.name === "ValidationError") {
      return res.status(400).json({ ValidationError: error.details });
    }
    return next(error);
  }
};

const c = controlHandler;
export default c;
