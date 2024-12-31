import useExamples from "./useExamples";
import { ExampleDetail } from "./ExampleDetail";

/**
 * Render all the Examples.
 */
export function ExamplesList() {
    const { examples } = useExamples();

    return (
        <>
            {examples.map((example) => (
                <ExampleDetail key={example.id} example={example} />
            ))}
        </>
    );
}
