import { createContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import type { KeycloakProfile } from "keycloak-js";

const kc = new Keycloak({
  url: "https://localhost:8080/",
  realm: "urlshort",
  clientId: "react-client",
});

export interface UserProfile extends KeycloakProfile {
  avatarUrl?: string;
}

interface AuthContextType {
  signIn: () => void;
  logout: () => void;
  accountManagement: () => void;
  isLoggedIn: boolean;
  token: string | undefined;
  profile: UserProfile | null;
}

export const AuthContext = createContext<AuthContextType>({
  signIn: () => { },
  logout: () => { },
  accountManagement: () => { },
  isLoggedIn: false,
  token: undefined,
  profile: null,
});

export const getAccessToken = async (): Promise<string | undefined> => {
  if (!kc.authenticated) return undefined;

  try {
    await kc.updateToken(30);
    return kc.token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return undefined;
  }
};
// end new

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loadProfile = () => {
    kc.loadUserProfile()
      .then((userProfile) => {
        const pictureAttr = userProfile.attributes?.picture;
        const avatarFromAttr = Array.isArray(pictureAttr)
          ? pictureAttr[0]
          : (pictureAttr as string | undefined);
        const avatarFromToken = (kc.tokenParsed as { picture?: string } | undefined)?.picture;
        const customAvatar = avatarFromToken || avatarFromAttr;

        const displayName = userProfile.firstName || userProfile.username || "User";
        const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`;

        setProfile({
          ...userProfile,
          avatarUrl: customAvatar || fallbackAvatar,
        });
      })
      .catch((err) => {
        console.error("Failed to load user profile", err);
      });
  };

  useEffect(() => {
    if (kc.didInitialize) return;

    kc.init({
      onLoad: "check-sso",
      checkLoginIframe: true,
      pkceMethod: "S256",
    }).then((authenticated) => {
      setIsLoggedIn(authenticated);
      setToken(authenticated ? kc.token : undefined);

      if (authenticated) {
        loadProfile();
      }
    });

    kc.onTokenExpired = () => {
      kc.updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            setToken(kc.token);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          setToken(undefined);
          setProfile(null);
        });
    };

    kc.onAuthLogout = () => {
      setIsLoggedIn(false);
      setToken(undefined);
      setProfile(null);
    };
  }, []);

  function signIn() {
    kc.login();
  }

  function logout() {
    setIsLoggedIn(false);
    setToken(undefined);
    setProfile(null);
    kc.logout();
  }

  function accountManagement() {
    kc.accountManagement();
  }

  return (
    <AuthContext.Provider
      value={{ signIn, logout, accountManagement, isLoggedIn, token, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
