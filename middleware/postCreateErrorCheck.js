export const postCreateErrorCheck=(req,res,next)=>{
	console.log(req.body);
	const errors=validationResult(req)
	if (errors.isEmpty()) {
		next();
	} else {
		res.status(400).json({err:errors.array()})
	}
}