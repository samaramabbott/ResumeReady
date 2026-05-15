import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { User } from "@shared/schema";
import { getSessionId } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const hasLinked = useRef(false);

  // Link session data to user account when logged in
  useEffect(() => {
    if (user && !hasLinked.current) {
      hasLinked.current = true;
      const sessionId = getSessionId();
      if (sessionId) {
        fetch("/api/session/link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId,
          },
          credentials: "include",
        }).catch(console.error);
      }
    }
  }, [user]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
