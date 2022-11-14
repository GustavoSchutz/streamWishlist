import * as mediaRepo from '../repositories/media.repositories.js';
import { newMediaSchema } from '../schemas/schemas.js';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidationResult } from 'joi';
import { type } from 'os';


async function newMedia(req: Request, res: Response) {

    type NewMediaData = { title: string; link: string; relevance: number; platform: string };

    const newMediaData: NewMediaData = req.body;

    const { title, link, relevance, platform } = newMediaData;

    const validation: ValidationResult = newMediaSchema.validate(newMediaData);
    if (validation.error) {
        return res.status(httpStatus.BAD_REQUEST).send('Os campos não estão preenchidos corretamente!');
    }

    try {
        const insertMedia = await mediaRepo.insertMedia({
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

async function newCategory(req: Request, res: Response) {


    type NewCategoryData = { mediaId: number; category: string }

    const newCategoryData: NewCategoryData = req.body;

    const { mediaId, category } = newCategoryData;

    try {


        const insertCategory = await mediaRepo.insertCategory({
            mediaId,
            category
        });

        return res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!");


    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(httpStatus.CONFLICT).send('Não era pra dar esse erro n');
        }

        return res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí');
    }
}

async function getMedia(req: Request, res: Response) {

    try {

        const selectMedia = await mediaRepo.selectMedia();
        return res.status(httpStatus.OK).send(selectMedia.rows);

    } catch(error) {
        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno');
    }

}

export { newMedia, newCategory, getMedia }