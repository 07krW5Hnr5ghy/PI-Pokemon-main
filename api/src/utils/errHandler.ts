/* return error message */
export const getErrorMessage = (error:unknown) => {
    if(error instanceof Error) return error;
    return String(error);
}