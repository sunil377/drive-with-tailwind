import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const useLoading = () => {
	const [loading, setLoading] = useState(true);
	const [status, setStatus] =
		useState<"pending" | "success" | "failed">("pending");

	const { id: currentId } = useParams<{ id: string }>();

	useEffect(() => {
		setLoading(true);
		setStatus("pending");
	}, [currentId]);

	return { loading, status, setLoading, setStatus };
};
