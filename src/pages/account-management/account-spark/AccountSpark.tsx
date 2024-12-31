/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountSparkSummary } from "./account-spark-summary";
import { AccountSparkAllocationsList } from "./account-spark-allocations-list";
import "./AccountSpark.scss";
interface AccountSparkProps {
    data?: String;
}
const AccountSpark = ({ data }: AccountSparkProps) => {
    return (
        <>
            <div className="account-spark">
                <div className="row ">
                    <AccountSparkSummary />
                </div>

                <div className="row  ">
                    <div className="col-md-12 ">
                        <AccountSparkAllocationsList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSpark;
