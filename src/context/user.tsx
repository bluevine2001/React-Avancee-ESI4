import { User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Type = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const UserContext = createContext<Type>({
  user: undefined,
  setUser: () => null,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
