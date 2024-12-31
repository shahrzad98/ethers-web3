import { useEffect } from "react";
import type { Example } from "models/example";
import useFetchExample from "services/useFetchExamples";
import { useQuery, useQueryClient } from "react-query";

const useExamples = () => {
    const { get } = useFetchExample();

    const queryClient = useQueryClient();
    const { data: examples, refetch } = useQuery("examples", get, { enabled: false });

    // const [examples, setExamples] = useState<Example[]>([])

    useEffect(() => {
        !examples && getExamples();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getExamples = () => {
        refetch();
    };
    const createExamples = () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryClient.cancelQueries("examples");

        // Snapshot the previous value
        const previousExamples = queryClient.getQueryData<Example[]>("examples") || [];

        queryClient.setQueryData<Example[]>("examples", [
            ...previousExamples,
            {
                id: previousExamples.length + 1,
                title: `The ${previousExamples.length + 1} Title`,
                description: `The ${previousExamples.length + 1} Description`,
            },
        ]);
    };

    return { examples: examples || [], getExamples, createExamples };
};

export default useExamples;
