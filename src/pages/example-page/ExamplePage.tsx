import { Examples } from "components";
import "./ExamplePage.scss";

const ExamplePage = (): JSX.Element => (
    <div className="example-page row">
        Example Page
        {/* <Example /> */}
        <Examples />
    </div>
);

export default ExamplePage;
