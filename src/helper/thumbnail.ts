export const thumbnail = (file: FileList) => {
	return createImageBitmap(file[0]).then((res) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const { width, height } = res;
		const base = 150;

		if (width > height) {
			canvas.width = base;
			canvas.height = (height / width) * base;
		} else {
			canvas.height = base;
			canvas.width = (width / height) * base;
		}

		ctx?.drawImage(res, 0, 0, canvas.width, canvas.height);
		const url = canvas.toDataURL();
		return url;
	});
};
