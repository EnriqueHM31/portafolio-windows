import { useState, useCallback } from "react";
export function useAction<T extends string[] | number[]>(action: (...args: T) => Promise<void>) {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    console.log({ isPending, isError })

    const handleAction = useCallback(async (...args: T) => {
        setIsPending(true);
        setIsError(false);
        try {
            await action(...args);
        } catch {
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }, [action]);

    return { isPending, isError, handleAction };
}
