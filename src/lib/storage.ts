import { STORAGE_PROJECT_ID } from "$env/static/private";
import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
	projectId: STORAGE_PROJECT_ID
});