import { compile } from "path-to-regexp";

export const Paths = {
    login: "/login",
    // Paths

    examplePage: "/example",
    AccountManagement: "/account-management",
    ProjectAll: "/project-all",
    ProjectDetails: "/project-details/:id",
    ProjectOverview: "/project-overview",
    Home: "/",
};

export const Links = {
    login: compile(Paths.login),

    // Paths
    examplePage: compile(Paths.examplePage),
};
