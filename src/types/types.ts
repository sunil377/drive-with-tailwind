import { FormikErrors, FormikHelpers } from "formik";
import { upLoadTask } from "../lib/firebase";

export interface uploadFileType {
	id: string;
	rate: number;
	name: string;
	failed: boolean;
	paused: boolean;
	upLoadTask: upLoadTask;
}

export type State = { id: string; name: string }[];

export type validateType<T> = (
	values: T
) => void | object | Promise<FormikErrors<T>>;

export type onSubmitType<T> = (
	values: T,
	formikHelpers: FormikHelpers<T>
) => void | Promise<any>;
