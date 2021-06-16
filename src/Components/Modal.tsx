import { useCallback, useEffect, useRef } from "react";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";

import { useAuth } from "../Contexts/useAuthContext";
import { createFolder } from "../helper/AddFolder/createFolder";
import { currentPathType } from "../hooks/useFolder";

import Button from "../ui/Button";
import Container from "../ui/Container";
import Card from "../ui/Card";
import Input from "../ui/Input";

const keyList: Record<string, Boolean> = {};

export default function Modal({
	currentFolderId,
	currentPath,
	handleClose,
}: Props) {
	const currentUser = useAuth();

	const modalRef = useRef<HTMLDivElement>(null);

	const keyup = useCallback((e: KeyboardEvent) => {
		if (e.key === "Shift") {
			keyList[e.key] = false;
		}
	}, []);

	const keydown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case "Shift":
					keyList[e.key] = true;
					break;
				case "Escape":
					handleClose();
					break;
				case "Tab":
					const tabItems =
						modalRef.current &&
						(modalRef.current.querySelectorAll(
							"input ,button"
						) as TabList);

					if (tabItems) {
						const firstEle = tabItems[0];
						const lastEle = tabItems[tabItems.length - 1];

						if (keyList["Shift"]) {
							if (document.activeElement === firstEle) {
								e.preventDefault();
								lastEle.focus();
							}
						} else {
							if (document.activeElement === lastEle) {
								e.preventDefault();
								firstEle.focus();
							}
						}
					}

					break;
			}
		},
		[handleClose]
	);

	useEffect(() => {
		window.addEventListener("keydown", keydown);
		window.addEventListener("keyup", keyup);
		return () => {
			window.removeEventListener("keydown", keydown);
			window.removeEventListener("keyup", keyup);
		};
	}, [keydown, keyup]);

	const validate: validateType = ({ name }) => {
		const err: {
			name?: string;
		} = {};

		if (name.trim() === "") {
			err.name = "Required";
		} else if (name.match(/[><()]/)) {
			err.name = "Invalid, Remove Special Characters";
		} else if (name.trim().length < 3) {
			err.name = "Name Should Be 3 Character Long";
		}

		return err;
	};

	const handleSubmit: handleSubmitType = (
		{ name },
		{ setSubmitting, setErrors }
	) => {
		if (currentUser) {
			createFolder({
				currentUser,
				currentPath,
				currentFolderId,
				name: name.toLowerCase(),
			})
				.then(() => {
					setSubmitting(false);
				})
				.catch(({ message }) => {
					setErrors({
						name: message,
					});
					setSubmitting(false);
				});
		}
	};

	return (
		<div
			className={`  w-full fixed h-screen inset-0 flex items-center justify-center bg-gray-800 dark:bg-white  bg-opacity-40 dark:bg-opacity-30 z-10 `}
			role="dialog"
			aria-modal="true"
			ref={modalRef}
		>
			<Container>
				<Card className={`space-y-2 sm:space-y-4 animate-popup`}>
					<Formik
						initialValues={{ name: "" }}
						validate={validate}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, errors }) => (
							<Form
								title="Add Folder"
								className="space-y-3 sm:space-y-4"
								autoComplete="off"
							>
								<Input
									name="name"
									placeholder="Enter Name"
									type="text"
									required={true}
									errors={errors}
									as="field"
									autoFocus={true}
									active={"true"}
								/>
								<div className="flex space-x-2 sm:space-x-4 justify-end ">
									<Button
										type="submit"
										title="Submit"
										disabled={isSubmitting}
									/>
									<Button
										title="Cancel"
										variant="danger"
										onClick={handleClose}
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Card>
			</Container>
		</div>
	);
}

interface Props {
	handleClose: () => void;
	currentPath: currentPathType;
	currentFolderId: string | null;
	show: boolean;
}

type handleSubmitType = (
	values: { name: string },
	formikHalpers: FormikHelpers<{
		name: string;
	}>
) => void | Promise<any>;

type validateType = (values: {
	name: string;
}) => void | object | Promise<FormikErrors<{ name: string }>>;

type TabList = NodeListOf<HTMLButtonElement | HTMLInputElement>;
