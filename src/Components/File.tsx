import { fileType } from "../hooks/useFolder";

export default function File({ files }: Props) {
	if (files.length === 0) {
		return (
			<div className="p-6 bg-white mt-10 rounded-md">
				<h1>No File Added </h1>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-4 md:grid-cols-6 p-6 bg-white mt-10 rounded-md gap-2">
			{files.map(({ id, name, url }) => (
				<img src={url} alt={name} key={id} />
			))}
		</div>
	);
}

interface Props {
	files: fileType[];
}
