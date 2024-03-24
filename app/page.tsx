'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageLoader from "./components/page-loader";

export default function Blogs() {

  const { user, isLoading } = useUser();
  
  const router = useRouter();

  useEffect(() => {
    
    if (!isLoading) {
      router.push(!!user ? '/blogs' : process.env.NEXT_PUBLIC_AUTH0_LOGIN_REDIRECT_URL || '/api/auth/login');
    }
  console.log(process.env.NEXT_PUBLIC_AUTH0_LOGIN_REDIRECT_URL);
  
  }, [user, isLoading, router]);

  return isLoading ? <PageLoader /> : null;

}
