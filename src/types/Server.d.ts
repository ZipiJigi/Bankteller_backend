interface BanktellerServer {
    bind: () => Promise<void>;
    start: () => Promise<void>;
    port: (port: number) => void;
    stop: () => Promise<void>;
}
