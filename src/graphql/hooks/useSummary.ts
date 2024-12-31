import { useQuery } from "react-query";
import { useGraphQLClient } from "hooks/useGraphQLClient";
import { SUMMARY } from "../queries/summary";
import { SummaryModel, SummaryData, FilterVarsModel } from "../models";

const useSummary = () => {
    const graphQLClient = useGraphQLClient("spark");
    return useQuery<SummaryModel, FilterVarsModel>("get-summary", async () => {
        const { summary }: SummaryData = await graphQLClient.request(SUMMARY, {
            id: "2",
        });
        return summary;
    });
};

export default useSummary;
