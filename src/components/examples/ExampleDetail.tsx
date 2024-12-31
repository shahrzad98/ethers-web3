import type { Example } from "models/example";
import useExamples from "./useExamples";
type Props = {
    example: Example;
};

/**
 * Render the example' details.
 */
export function ExampleDetail({ example }: Props) {
    const { createExamples } = useExamples();
    return (
        <p>
            Title: {example.title}, Description: {example.description}
            <button onClick={createExamples}>َAdd Example</button>
        </p>
    );
}
