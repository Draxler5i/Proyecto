import stadiumService from '../services/stadium.service'

const MESSAGE_ERROR = {
	status: 'FAILED',
	data: { error: 'Some attributes are missing or are empty' },
}

const deleteStadiumById = async (req: any, res: any) => {
	const idStadium = parseInt(req.params.id)
	if (!idStadium) res.status(400).send(MESSAGE_ERROR)
	try {
		const stadiumDeleted = await stadiumService.deleteStadiumById(idStadium)
		res.status(200).send({
			status: 'OK',
			data: stadiumDeleted,
			message: `Stadium deleted with ID:${idStadium}`,
		})
	} catch (error) {
		console.error(`Some wrong in stadium controller: ${error}`)
		res.send({ status: 'FAILED', data: { error } })
	}
}

export = {
	deleteStadiumById,
}
