/// <reference types="long" />
import { AminoSignResponse, OfflineAminoSigner, StdSignDoc } from '@cosmjs/amino';
import { Algo, DirectSignResponse, OfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing';
import { SignClientTypes } from '@walletconnect/types';
import { IconType } from 'react-icons';
import { ChainWalletBase, MainWalletBase } from '../bases';
import { ChainName, ChainRecord } from './chain';
import { AppEnv, Mutable } from './common';
export interface Key {
    readonly name: string;
    readonly algo: string;
    readonly pubKey: Uint8Array;
    readonly address: Uint8Array;
    readonly bech32Address: string;
    readonly isNanoLedger: boolean;
}
export interface SimpleAccount {
    namespace: string;
    chainId: string;
    address: string;
    username?: string;
}
export declare type WalletName = string;
export declare enum WalletStatus {
    Disconnected = "Disconnected",
    Connecting = "Connecting",
    Connected = "Connected",
    NotExist = "NotExist",
    Rejected = "Rejected",
    Error = "Error"
}
export interface DownloadInfo extends AppEnv {
    icon: IconType;
    link: string;
}
export declare type WalletMode = 'extension' | 'wallet-connect';
export interface Metadata {
    name: string;
    description: string;
    url: string;
    icons: string[];
}
export interface Wallet {
    name: WalletName;
    prettyName: string;
    mode: WalletMode;
    mobileDisabled: boolean;
    rejectMessage?: {
        source: string;
        target?: string;
    } | string;
    rejectCode?: number;
    connectEventNamesOnWindow?: string[];
    connectEventNamesOnClient?: string[];
    downloads?: DownloadInfo[];
    logo?: string;
    walletconnect?: {
        name: string;
        projectId: string;
    };
}
export declare type Bech32Address = string;
export interface WalletAccount {
    address: Bech32Address;
    pubkey?: Uint8Array;
    algo?: Algo | undefined;
    name?: string;
    isNanoLedger?: boolean;
}
export interface SignOptions {
    readonly preferNoSetFee?: boolean;
    readonly preferNoSetMemo?: boolean;
    readonly disableBalanceCheck?: boolean;
}
export interface DirectSignDoc {
    /** SignDoc bodyBytes */
    bodyBytes?: Uint8Array | null;
    /** SignDoc authInfoBytes */
    authInfoBytes?: Uint8Array | null;
    /** SignDoc chainId */
    chainId?: string | null;
    /** SignDoc accountNumber */
    accountNumber?: Long | null;
}
export declare enum BroadcastMode {
    /** Return after tx commit */
    Block = "block",
    /** Return after CheckTx */
    Sync = "sync",
    /** Return right away */
    Async = "async"
}
export interface WalletClient {
    getAccount: (chainId: string) => Promise<WalletAccount>;
    getOfflineSigner: (chainId: string) => Promise<OfflineSigner> | OfflineSigner;
    qrUrl?: Mutable<string>;
    appUrl?: Mutable<string>;
    connect?: (chainIds: string | string[], isMobile: boolean) => Promise<void>;
    disconnect?: () => Promise<void>;
    on?: (type: string, listener: EventListenerOrEventListenerObject) => void;
    off?: (type: string, listener: EventListenerOrEventListenerObject) => void;
    enable?: (chainIds: string | string[]) => Promise<void>;
    addChain?: (chainInfo: ChainRecord) => Promise<void>;
    getOfflineSignerAmino?: (chainId: string) => OfflineAminoSigner;
    getOfflineSignerDirect?: (chainId: string) => OfflineDirectSigner;
    signAmino?: (chainId: string, signer: string, signDoc: StdSignDoc, signOptions?: SignOptions) => Promise<AminoSignResponse>;
    signDirect?: (chainId: string, signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions) => Promise<DirectSignResponse>;
    getEnigmaPubKey?: (chainId: string) => Promise<Uint8Array>;
    getEnigmaTxEncryptionKey?: (chainId: string, nonce: Uint8Array) => Promise<Uint8Array>;
    enigmaEncrypt?: (chainId: string, contractCodeHash: string, msg: object) => Promise<Uint8Array>;
    enigmaDecrypt?: (chainId: string, ciphertext: Uint8Array, nonce: Uint8Array) => Promise<Uint8Array>;
    sendTx?: (chainId: string, tx: Uint8Array, mode: BroadcastMode) => Promise<Uint8Array>;
}
export declare type WalletAdapter = ChainWalletBase | MainWalletBase;
export interface IChainWallet {
    new (walletInfo: Wallet, chainInfo: ChainRecord): ChainWalletBase;
}
export declare type NameServiceName = string;
export interface NameServiceRegistry {
    name: NameServiceName;
    contract: string;
    chainName: ChainName;
    getQueryMsg: (address: Bech32Address) => any;
    slip173: string;
}
export interface WalletConnectOptions {
    signClient: SignClientTypes.Options;
}