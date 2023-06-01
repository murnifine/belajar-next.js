export { default } from "next-auth/middleware";

export const config = {
    // matcher: ["/profile"],
    matcher: ["/todo-client"],
    // matcher: ["/((?!register|api|login).*)", "/todo-client"],
};