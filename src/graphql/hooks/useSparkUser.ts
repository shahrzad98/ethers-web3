import { User } from "models";
import { useQuery } from "react-query";
import { useGraphQLClient } from "hooks/useGraphQLClient";
import { parseUser } from "utils/pool";
import { FilterVarsModel, UserDataModel } from "../models";
import { USER } from "../queries/sparkUser";

const useSparkUser = (id: string, account: any) => {
    const graphQLClient = useGraphQLClient("spark");
    return useQuery<User, FilterVarsModel>(
        ["get-user", account],
        async () => {
            const { user }: UserDataModel = await graphQLClient.request(USER, { id: id?.toLowerCase() });
            return parseUser(user) || ({} as User);
        },
        {
            enabled: !!account,
        },
    );
};

export default useSparkUser;
