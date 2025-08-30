"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
