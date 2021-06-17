export const thumbnail = (file: FileList) => {
	const { type } = file[0];

	return createImageBitmap(file[0]).then((res) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		const { width, height } = res;

		if (width > height) {
			canvas.width = 100;
			canvas.height = (height / width) * 100;
		} else {
			canvas.height = 100;
			canvas.width = (width / height) * 100;
		}

		ctx?.drawImage(res, 0, 0, canvas.width, canvas.height);
		const url = canvas.toDataURL();
		return url;
	});
};
