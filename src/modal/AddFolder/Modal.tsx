import { useState, Dispatch, SetStateAction } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import AlertComponent from "../../Components/AlertComponent";
import InputField from "../../Components/InputField";

import { NAMEFILED } from "../../constant/fields";
import { NAMESCHEMA } from "../../constant/schema";

import { useAuth } from "../../Contexts/useAuthContext";
import { createFolder } from "../../helper/AddFolder/createFolder";
import { currentPathType } from "../../hooks/useFolder";

export default function Modal({
	setShowModal,
	currentFolderId,
	currentPath,
}: Props) {
	const [error, setError] = useState("");
	const currentUser = useAuth();

	const handleSubmit: handleSubmitType = ({ name }, { setSubmitting }) => {
		setError("");
		if (currentUser) {
			createFolder({
				currentUser,
				currentPath,
				currentFolderId,
				name: name.toLowerCase(),
			})
				.then(() => {
					setSubmitting(false);
					setError("");
					setShowModal(false);
				})
				.catch(({ message }) => {
					setError(message);
					setSubmitting(false);
				});
		}
	};

	return (
		<div className="w-full fixed h-screen top-0 left-0 right-0 flex items-center justify-center bg-gray-600 bg-opacity-40">
			<div className="container">
				<div className="card space-y-2 sm:space-y-4">
					<Formik
						initialValues={{ name: "" }}
						validationSchema={NAMESCHEMA}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, errors }) => (
							<Form
								title="add folder"
								className="space-y-2 sm:space-y-4"
								autoComplete="off"
							>
								<AlertComponent message={error} />

								{NAMEFILED.map((val) => (
									<InputField
										{...val}
										key={val.name}
										errors={errors}
									/>
								))}
								<button
									type="submit"
									disabled={isSubmitting}
									className="btn btn-primary w-full block"
								>
									Submit
								</button>
							</Form>
						)}
					</Formik>

					<button
						onClick={() => setShowModal(false)}
						className="btn btn-success w-full block"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

interface Props {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	currentPath: currentPathType;
	currentFolderId: string | null;
}

type handleSubmitType = (
	values: { name: string },
	formikHalpers: FormikHelpers<{
		name: string;
	}>
) => void | Promise<any>;
