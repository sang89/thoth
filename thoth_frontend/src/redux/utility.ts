export const updateObject = (oldObj: any, updatedProps: any) => {
    return {
        ...oldObj,
        ...updatedProps,
    }
};