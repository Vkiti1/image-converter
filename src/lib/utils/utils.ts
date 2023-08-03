import type { FormatEnum } from 'sharp';
import sharp from 'sharp';

export const createFileName = (imageName: string, imageType: string) => {
	const fileName = `${imageName.split('.')[0] ?? 'output'}.${imageType}`;
	return fileName;
};

export const convertImage = async (image: File, imageType: keyof FormatEnum) => {
	const bytes = new Uint8Array(await image.arrayBuffer());
	const newImage = await sharp(bytes)
		.toFormat(imageType) // Specify the desired output format here (e.g., 'png', 'jpeg', 'webp', etc.)
		.toBuffer();

	return newImage;
};
