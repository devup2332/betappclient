import instance from "./instance";

export const validateEmailMethod = async (email: string) => {
    const res = await instance.post("api/users/validateEmail", { email });
    return res.data.isUsed;
};
