import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiRequest } from "./queryClient";

interface SessionContextType {
  sessionId: string | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  sessionId: null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const stored = localStorage.getItem("resumeready_session");
        const response = await apiRequest("POST", "/api/session", { sessionId: stored });
        const data = await response.json();
        setSessionId(data.sessionId);
        localStorage.setItem("resumeready_session", data.sessionId);
      } catch (error) {
        console.error("Session error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initSession();
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
