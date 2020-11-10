import { Request, response, Response } from 'express'
import Orphanage from '../models/Orphanage'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import orphanageView from '../views/orphanages_views'

export default {
    async show (req: Request, res: Response) {
        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanage))
    },
 
    async index (req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },


    async create(req: Request, res: Response) {
    console.log(req.files)
        const {
            name, 
            latitude, 
            longitude, 
            about, 
            instrucions, 
            opening_hours, 
            open_on_weekend
        } = req.body
    
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages =  req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name, 
            latitude, 
            longitude, 
            about, 
            instrucions, 
            opening_hours, 
            open_on_weekend: open_on_weekend == "true",
            images
        }

        const scheema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instrucions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required() 
                })
            )
        })

        await scheema.validate(data, {
            abortEarly: false,
        })
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    }
}