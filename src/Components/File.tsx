import { fileType } from "../hooks/useFolder";

export default function File({ files }: Props) {
	if (files.length === 0) {
		return (
			<div className="p-6 border-t">
				<h1>No File Added </h1>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-3 sm:grid-col md:grid-cols-6 px-2 py-4 sm:p-6  border-t gap-2">
			{files.map(({ id, name, url }) => (
				<img src={url} alt={name} key={id} className="rounded-md" />
			))}
		</div>
	);
}

interface Props {
	files: fileType[];
}
