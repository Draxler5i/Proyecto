import stadiumService from "../services/stadium.service";

const getStadiums = async (req: any, res: any) => {
    try {
        const stadiums = await stadiumService.getStadium()
        res.send({ status: 'OK', data: stadiums })
    } catch (error) {
        console.log(`Something go wron get all stadiums Controller':${error}`);
        res.send({ status: 'FAILED', data: { error } })
    }
}

const postStadium = async (req: any, res: any) => {
    try {
        const postStadiums = await stadiumService.postStadium(req.body) 
        res.status(201).send({
            status: `SUCCESS`,
            data: postStadiums,
        })
    } catch (error) {
        console.log(`Something go wrong with postStadium Controller  ${error}`);
        res.status(500).send({ data: error })
    }
}

const updateStadium = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(`ID is missing or empty`)
    }
    try {
        const putStadium = await stadiumService.putStadium(req.body)
        res.status(200).send({
            status: `SUCCESS`,
            data: putStadium,
        })
    } catch (error) {
        console.log(`Someting go wrong updateStadium Controller `);
        res.status(500).send({ data: error })
    }
}

const deleteStadium = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(`ID is missing or empty`)
    }
    try {
        const deleteStadium = await stadiumService.deleteStadium(id)
        res.status(200).send({
            status: `SUCCES`,
            data: deleteStadium,
        })
    } catch (error) {
        console.log(`Someting go wrong delete Stadium controller ${error} `);
        res.status(500).send({ data: error })
    }
}

const getStadiumById = async (req: any, res: any) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400).send(`ID is missing or empty`)
    }
    try {
        const getStadium = await stadiumService.getStadiumCapacity(id)
        res.status(200).send({
            status: `SUCCES`,
            data: getStadium,
        })
    } catch (error) {
        console.log(`Someting go wrong get Stadium controller ${error} `);
        res.status(500).send({ data: error })
    }
}

export = {
    getStadiums,
    postStadium,
    updateStadium,
    deleteStadium,
    getStadiumById
}
