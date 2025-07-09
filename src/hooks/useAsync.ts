import { useState, useCallback } from "react";
// 공용 에러 로딩 처리
export function useAsync<T, Args extends unknown[]>(asyncFn: (...args: Args) => Promise<T>) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(
        async (...args: Args): Promise<T> => {
            setLoading(true);
            setError(null);
            try {
                const result = await asyncFn(...args);
                return result;
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [asyncFn]
    );

    return { run, loading, error };
}
