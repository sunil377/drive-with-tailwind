export type folderType = {
	id: string;
	name: string;
	parentId: string | null;
	userId: string;
	path: [string];
	createdAt: string;
};

export type selectedFolderType = string | null;
export type currentPathType = string[];

export type fileType = {
	id: string;
	name: string;
	url: string;
	thumbURL: string;
	path: [string];
	type: string;
	userId: string;
};
