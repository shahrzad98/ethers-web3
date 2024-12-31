import { RouteComponentProps, RouteProps, withRouter } from "react-router";
import { Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import { createBrowserHistory } from "history";
import { AnimatePresence } from "framer-motion";
const ExamplePage = lazy(() => import("../pages/example-page/ExamplePage"));
const AccountManagement = lazy(() => import("../pages/account-management/AccountManagement"));
const ProjectAll = lazy(() => import("../pages/project-all/ProjectAll"));
const ProjectDetails = lazy(() => import("../pages/project-details/ProjectDetails"));
const ProjectOverview = lazy(() => import("../pages/project-overview/ProjectOverview"));

import { Paths } from "./paths";
import { useThemeState } from "states/themeContext";
import { Layout } from "components/layout";

export const history = createBrowserHistory();

export function isAuthPathname(pathname: string): boolean {
    // return [Paths.login].includes(pathname)
    return ["Paths"].includes(pathname);
}

const RoutesBase: React.FC<RouteComponentProps> = () => {
    const authenticatedRoutes: {
        [path: string]: React.ComponentType;
    } = {
        [Paths.examplePage]: ExamplePage,
        [Paths.AccountManagement]: AccountManagement,
        [Paths.ProjectAll]: ProjectAll,
        [Paths.ProjectDetails]: ProjectDetails,
        [Paths.ProjectOverview]: ProjectOverview,
        [Paths.Home]: ProjectOverview,
    };

    const { theme } = useThemeState();

    return (
        <AnimatePresence exitBeforeEnter>
            <Switch>
                <>
                    <div className={`theme-${theme}`}>
                        <Layout>
                            {/* Authenticated-only routes */}
                            <Suspense fallback={<>loading...</>}>
                                {Object.keys(authenticatedRoutes).map((path) => {
                                    return (
                                        <AuthenticatedRoute
                                            exact={true}
                                            key={`authenticated-route${path.replace("/", "-")}`}
                                            path={path}
                                            component={authenticatedRoutes[path]}
                                        />
                                    );
                                })}
                            </Suspense>
                        </Layout>

                        {/* Unauthenticated-only routes */}
                        {/* <UnauthenticatedRoute exact={true} path={Paths.login} component={LoginPage} /> */}
                        {/* <Redirect to="/" /> */}
                    </div>
                </>
            </Switch>
        </AnimatePresence>
    );
};

/**
 * Returns a ReactRouter.Route that can only be accessed with a valid
 * session. Accessing it with an invalid or null session with redirect
 * to it's original route.
 */
function AuthenticatedRoute(props: RouteProps) {
    // const { isAuthenticated } = useAppState()
    const isAuthenticated = () => {
        return true;
    };
    const Component = props.component as React.ComponentType<any>;
    const rest = Object.assign({}, props);
    delete rest.component;

    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps): React.ReactNode => {
                // If the user is not authenticated, redirect to signup
                if (isAuthenticated() === false) {
                    return <p>Auth False</p>;
                }
                return <Component {...props} />;
            }}
        />
    );
}

/**
 * Returns a ReactRouter.Route that can only be accessed with a valid
 * session. Accessing it with an invalid or null session with redirect
 * the user to Auth0. Upon authentication, the user will be redirect
 * to it's original route.
 */

// function UnauthenticatedRoute(props: RouteProps) {
//     const isAuthenticated = () => {
//         return true
//     }
//     const Component = props.component as React.ComponentType<any>
//     const rest = Object.assign({}, props)
//     delete rest.component

//     return (
//         <Route
//             {...rest}
//             render={(props: RouteComponentProps) => {
//                 if (isAuthenticated() && isAuthPathname(props.location.pathname)) {
//                     // If the user is authenticated and this is an auth page, redirect to dashboard
//                     return <Redirect to={Paths.homeDashboard} />
//                 }

//                 return <Component {...props} />
//             }}
//         />
//     )
// }

const RoutesBaseRoutes = withRouter(RoutesBase);
export const Routes = () => {
    return (
        <Router history={history}>
            <RoutesBaseRoutes />
        </Router>
    );
};
