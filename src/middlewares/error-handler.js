const errorHandler = async (err, req, res, _) => {
    console.log(err);
    return res.status(500).json({ message: err.message })
  }
  
  export default errorHandler;