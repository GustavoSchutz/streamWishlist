import * as mediaRepo from '../repositories/media.repositories.ts';
import { newMediaSchema } from '../schemas/schemas.ts';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidationResult } from 'joi';


async function newMedia(req: Request, res: Response) {

    type NewMediaData = {title: string; link: string; relevance: number; platform: string};

    const { title, link, relevance, platform } = req.body;

    const newMediaData: NewMediaData = req.body;

    const validation: ValidationResult = newMediaSchema.validate(newMediaData);
    if (validation.error) {
        return res.status(httpStatus.BAD_REQUEST).send('Os campos não estão preenchidos corretamente!');
    }

    try {
        const insertMedia = await MediaRepo.insertMedia({
            title,
            link,
            relevance,
            platform
        });

        console.log(insertMedia);
        return res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!");

    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(httpStatus.CONFLICT).send('Esse título já foi adicionado!');
        }

        return res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí');
    }

}

export { newMedia }