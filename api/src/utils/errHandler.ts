/* return error message */
export const getErrorMessage = (error:unknown) => {
    if(error instanceof Error) return error.message;
    return String(error);
}