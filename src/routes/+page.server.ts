/** @type {import('./$types').Actions} */
import { convertImage, createFileName } from '$lib/utils/utils';
import { fail } from '@sveltejs/kit';
import fs from 'fs';
import type { FormatEnum } from 'sharp';
import type { Actions } from './$types';

export const actions: Actions = {
	convertImage: async (event) => {
		const formData = await event.request.formData();

		const images = formData.getAll('images') as File[];
		const imageType = formData.get('imageType');

		const filteredImages = images.filter((image) => image.type.includes('image'));

		const promises = filteredImages.map(async (image) => {
			const newImage = await convertImage(image, imageType as keyof FormatEnum);
			const fileName = createFileName(image.name, imageType as keyof FormatEnum);

			return { newImage, fileName };
		});

		const convertedImages = await Promise.all(promises);

		const writeFiles = convertedImages.map(async (image) => {
			return fs.writeFile(`src/output/${image.fileName}`, image.newImage, (err) => {
				if (err) console.log(err);
			});
		});

		try {
			await Promise.all(writeFiles);
		} catch (error) {
			console.log(error);
			return fail(400, { message: 'Failed writing to fs' });
		}

		const base64Images = convertedImages.map((image) => ({
			b64: image.newImage.toString('base64'),
			fileName: image.fileName
		}));

		return base64Images;
	}
};
