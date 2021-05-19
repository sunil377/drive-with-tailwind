import { ChangeEvent, useState } from "react";

export const useInputChange = () => {
    const [value, setValue] = useState("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.trim();
        v = v.toLowerCase();
        setValue(v);
    }
    return { value, onChange };
};
