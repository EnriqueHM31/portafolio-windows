import { useState, useCallback } from "react";

export function useAction<Args extends unknown[]>(
    action: (...args: Args) => void | Promise<void>
) {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState({
        error: false,
        message: "",
    });

    const handleAction = useCallback(
        async (...args: Args) => {
            setIsPending(true);
            setIsError({ error: false, message: "" });
            try {
                await action(...args);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : String(err);
                setIsError({ error: true, message });
            } finally {
                setIsPending(false);
            }
        },
        [action]
    );

    const resetError = () => setIsError({ error: false, message: "" });

    return { isPending, isError, handleAction, resetError };
}
