import { FC } from "react";
import { Chart, ChartMode, Currency, CurrencyUnit } from "@totemfi/ui-components";
import "./ProjectTokenomics.scss";
import { PredictionPool } from "models";
export interface ProjectTokenomicsProps {
    data: PredictionPool;
}
const ProjectTokenomics: FC<ProjectTokenomicsProps> = ({ data }: ProjectTokenomicsProps) => {
    const { title, initialSupply, totalSupply, tokenomics } = data;
    const totalValue = (tokenomics?.map((tokenomic) => Number(tokenomic?.value)) || []).reduce(
        (partial_sum, a) => partial_sum + a,
        0,
    );
    return (
        <div className="project-tokenomics row">
            <div className=" project-tokenomics-supply col-md-5">
                <div className=" project-tokenomics-supply-chart">
                    {tokenomics && (
                        <Chart
                            size={190}
                            mode={ChartMode.RADIAL}
                            segments={{
                                "#345983": tokenomics ? Number(tokenomics[0]?.percent) : 0,
                                "#5081B9": tokenomics ? Number(tokenomics[1]?.percent) : 0,
                            }}
                        >
                            {title}
                            <br></br>

                            <Currency value={totalValue} unit={CurrencyUnit.NONE} />
                        </Chart>
                    )}
                </div>

                <div className=" project-tokenomics-supply-items">
                    <div className=" project-tokenomics-supply-items-item">
                        <div className=" project-tokenomics-supply-items-item-label">Initial supply</div>
                        <div className=" project-tokenomics-supply-items-item-value">
                            <Currency value={Number(initialSupply)} unit={CurrencyUnit.NONE} />
                        </div>
                    </div>
                    <div className=" project-tokenomics-supply-items-item">
                        <div className=" project-tokenomics-supply-items-item-label">Total supply</div>
                        <div className=" project-tokenomics-supply-items-item-value">
                            <Currency value={Number(totalSupply)} unit={CurrencyUnit.NONE} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div className=" project-tokenomics-details">
                    {tokenomics?.map((tokenomic, index) => (
                        <div key={tokenomic?.label || index} className=" project-tokenomics-details-item">
                            <div className=" project-tokenomics-details-item-label">
                                <div className=" project-tokenomics-details-item-label-percent">
                                    {tokenomic?.percent} %
                                </div>
                                <div className=" project-tokenomics-details-item-label-text">{tokenomic?.label}</div>
                            </div>
                            <div className=" project-tokenomics-details-item-value">
                                <Currency value={Number(tokenomic?.value)} unit={CurrencyUnit.NONE} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
ProjectTokenomics.defaultProps = {};
export default ProjectTokenomics;
