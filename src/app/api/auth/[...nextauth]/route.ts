import authOptions from "@/app/utils/authOptions";
import NextAuth from "next-auth";
import { custom } from 'openid-client';

custom.setHttpOptionsDefaults({
    timeout: 10000,
});

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}