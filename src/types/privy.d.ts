declare module '@privy-io/react-auth' {
  export interface PrivyProviderProps {
    appId: string;
    config?: {
      loginMethods?: string[];
      appearance?: {
        theme?: 'light' | 'dark';
        accentColor?: string;
        logo?: string;
      };
    };
    children: React.ReactNode;
  }

  export function PrivyProvider(props: PrivyProviderProps): JSX.Element;
  export interface WalletData {
    address: string;
    chainId: number;
    sendTransaction: (transaction: {
      to: string;
      data: string;
      from: string;
    }) => Promise<{
      hash: string;
      wait: () => Promise<{
        status: number;
        transactionHash: string;
      }>;
    }>;
  }

  export interface User {
    id: string;
    wallet?: WalletData;
    email?: string;
  }

  export interface PrivyInterface {
    ready: boolean;
    authenticated: boolean;
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
  }

  export function usePrivy(): PrivyInterface;
}
