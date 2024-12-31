/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { ProjectStatusPredict } from "./project-status-predict";
import { Icon } from "components/icon";
import ContentLoader from "react-content-loader";

import ido_logo from "assets/icons/svgs/spark.svg";
import medium_logo from "assets/icons/svgs/medium.svg";
import discord_logo from "assets/icons/svgs/discord.svg";
import telegram_logo from "assets/icons/svgs/telegram.svg";
import twitter_logo from "assets/icons/svgs/twitter.svg";
import website_logo from "assets/icons/svgs/website.svg";
import whitepaper_logo from "assets/icons/svgs/whitepaper.svg";
import info_logo from "assets/icons/svgs/info.svg";

import { Currency, CurrencyUnit, Tooltip } from "@totemfi/ui-components";

import "./ProjectSummary.scss";
import { PredictionPool } from "models";

export interface ProjectSummaryProps {
    data: PredictionPool;
    isLoading: boolean;
}
const ProjectSummary: FC<ProjectSummaryProps> = ({ data, isLoading }: ProjectSummaryProps) => {
    const {
        title,
        description,
        maxPerWallet = "TBA",
        totalAllocation = "TBA",
        idoPrice = "TBA",
        roi,
        socialLinks,
        logoUrl,
        status,
        stakeApr,
        prizeAmount,
    } = data;

    const stakeAprPercent = Number(stakeApr || 0) / 100;

    return (
        <div className="project-summary row box">
            <div className="project-summary-details col-md-7">
                <div>
                    <div className="project-summary-details-title">
                        <Icon src={logoUrl || ido_logo} style={{ width: "40px", borderRadius: "50%" }} />
                        <h1>
                            {isLoading ? (
                                <ContentLoader
                                    animate={true}
                                    speed={2}
                                    width={100}
                                    height={6}
                                    viewBox="0 0 100 6"
                                    backgroundColor="#737373"
                                    foregroundColor="#414244"
                                >
                                    <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                                </ContentLoader>
                            ) : (
                                title
                            )}
                        </h1>
                    </div>
                    <div className="project-summary-details-socials">
                        <div className="project-summary-details-socials-item">
                            <Icon src={website_logo} link={`/${socialLinks?.websiteUrl}`} target="_blank" />
                        </div>
                        <div className="project-summary-details-socials-item">
                            <Icon src={whitepaper_logo} link={`/${socialLinks?.whitePaperUrl}`} target="_blank" />
                        </div>
                        <div className="project-summary-details-socials-item">
                            <Icon src={twitter_logo} link={`/${socialLinks?.twitterUrl}`} target="_blank" />
                        </div>
                        <div className="project-summary-details-socials-item">
                            <Icon src={telegram_logo} link={`/${socialLinks?.telegramUrl}`} target="_blank" />
                        </div>
                        <div className="project-summary-details-socials-item">
                            <Icon src={discord_logo} link={`/${socialLinks?.discordUrl}`} target="_blank" />
                        </div>
                        <div className="project-summary-details-socials-item">
                            <Icon src={medium_logo} link={`/${socialLinks?.mediumUrl}`} target="_blank" />
                        </div>
                    </div>
                </div>

                <div className="project-summary-details-options">
                    <div className="project-summary-details-options-left">
                        <div className="flex">
                            <div className="project-summary-details-options-item">
                                <div className="project-summary-details-options-item-label">
                                    Total Allocation
                                    <Tooltip description=" Total Allocation">
                                        <Icon src={info_logo} />
                                    </Tooltip>
                                </div>
                                <div className="project-summary-details-options-item-value">
                                    {isLoading ? (
                                        <ContentLoader
                                            animate={true}
                                            speed={2}
                                            width={100}
                                            height={6}
                                            viewBox="0 0 100 6"
                                            backgroundColor="#737373"
                                            foregroundColor="#414244"
                                        >
                                            <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                                        </ContentLoader>
                                    ) : (
                                        <Currency value={totalAllocation} unit={CurrencyUnit.DOLLAR} />
                                    )}
                                </div>
                            </div>
                            <div className="project-summary-details-options-item">
                                <div className="project-summary-details-options-item-label">
                                    Max Per Wallet
                                    <Tooltip description=" Max Per Wallet">
                                        <Icon src={info_logo} />
                                    </Tooltip>
                                </div>

                                {isLoading ? (
                                    <ContentLoader
                                        animate={true}
                                        speed={2}
                                        width={100}
                                        height={6}
                                        viewBox="0 0 100 6"
                                        backgroundColor="#737373"
                                        foregroundColor="#414244"
                                    >
                                        <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                                    </ContentLoader>
                                ) : (
                                    <Currency value={maxPerWallet} unit={CurrencyUnit.DOLLAR} />
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="project-summary-details-options-item">
                                <div className="project-summary-details-options-item-label">
                                    IDO price
                                    <Tooltip description=" IDO price">
                                        <Icon src={info_logo} />
                                    </Tooltip>
                                </div>

                                {isLoading ? (
                                    <ContentLoader
                                        animate={true}
                                        speed={2}
                                        width={100}
                                        height={6}
                                        viewBox="0 0 100 6"
                                        backgroundColor="#737373"
                                        foregroundColor="#414244"
                                    >
                                        <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                                    </ContentLoader>
                                ) : (
                                    <Currency value={idoPrice} unit={CurrencyUnit.DOLLAR} />
                                )}
                            </div>
                            <div className="project-summary-details-options-item">
                                <div className="project-summary-details-options-item-label">
                                    Price after 24H
                                    <Tooltip description="Price after 24H  ">
                                        <Icon src={info_logo} />
                                    </Tooltip>
                                </div>
                                {isLoading ? (
                                    <ContentLoader
                                        animate={true}
                                        speed={2}
                                        width={100}
                                        height={6}
                                        viewBox="0 0 100 6"
                                        backgroundColor="#737373"
                                        foregroundColor="#414244"
                                    >
                                        <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                                    </ContentLoader>
                                ) : (
                                    <> {status === "Completed" ? roi : "-"}</>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="project-summary-details-options-right">
                        <div className="project-summary-details-options-right-item">
                            <div>
                                <div className="project-summary-details-options-right-item-title">
                                    Staking rewards APY
                                </div>
                                <div className="project-summary-details-options-right-item-note">
                                    The longer you stake, the greater your returns
                                </div>
                            </div>
                            <div className="project-summary-details-options-right-item-percent">
                                {isLoading ? (
                                    <ContentLoader
                                        animate={true}
                                        speed={2}
                                        width={40}
                                        height={6}
                                        viewBox="0 0 40 6"
                                        backgroundColor="#737373"
                                        foregroundColor="#414244"
                                    >
                                        <rect x="5" y="0" rx="3" ry="3" width="40" height="6" />
                                    </ContentLoader>
                                ) : (
                                    <>{stakeAprPercent}%</>
                                )}
                            </div>
                        </div>
                        <div className="project-summary-details-options-right-item mt-5">
                            <div>
                                <div className="project-summary-details-options-right-item-title">
                                    Predictions rewards
                                </div>
                                <div className="project-summary-details-options-right-item-note">
                                    Prediction within the range get higher rewards
                                </div>
                            </div>
                            <div className="project-summary-details-options-right-item-percent">
                                {isLoading ? (
                                    <ContentLoader
                                        animate={true}
                                        speed={2}
                                        width={40}
                                        height={6}
                                        viewBox="0 0 40 6"
                                        backgroundColor="#737373"
                                        foregroundColor="#414244"
                                    >
                                        <rect x="5" y="0" rx="3" ry="3" width="40" height="6" />
                                    </ContentLoader>
                                ) : (
                                    <> {prizeAmount || 0}</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="project-summary-status-box col-md-5">
                <ProjectStatusPredict data={data} />
            </div>
        </div>
    );
};
ProjectSummary.defaultProps = {};
export default ProjectSummary;
