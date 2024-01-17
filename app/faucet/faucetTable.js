import Image from "next/image"

import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import {
  ConnectWallet,
  lightTheme,
  useChainId,
  useAddress,
  useConnectionStatus
} from "@thirdweb-dev/react";

const customTheme = lightTheme({
  colors: {
    primaryText: 'black',
    primaryButtonBg: '#b6feda',
    primaryButtonText: 'black',
    secondaryButtonBg: '#59ad8c',
    connectedButtonBgHover: '#59ad8c',
    borderColor: '#59ad8c'
  },
});

import { useBalance } from "@thirdweb-dev/react";

const FaucetTable = ({ title }) => {
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const recaptchaRef = useRef();
  // const { data, isLoading } = useBalance();

  const address = useAddress();
  const walletStatus = useConnectionStatus();
  const chainId = useChainId();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  // const tokens = ['XTZ', 'eUSD', 'USDT']

  useEffect(() => {
    if (txHash) {
      setIsClaimLoading(false);
    }
  }, [txHash]);

  // Commented out the TokenTable functionality
  // const TokenTable = () => {
  //   return (
  //     <table style={{border: '1px solid black', borderCollapse: 'collapse', width: '100%'}}>
  //       <thead>
  //         <tr>
  //           <th style={{padding: '10px', border: '1px solid black'}}>Token</th>
  //           <th style={{padding: '10px', border: '1px solid black'}}>Action</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tokens.map((token, index) => (
  //           <tr key={index}>
  //             <td style={{padding: '10px', border: '1px solid black'}}>{token}</td>
  //             <td style={{padding: '10px', border: '1px solid black'}}>
  //               <ClaimButton walletStatus={walletStatus} captchaCompleted={captchaCompleted} token={token} />
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

  const XTZBalanceDisplay = () => {
    const { data, isLoading } = useBalance();
    if (isLoading) {
      return <div>Loading...</div>;
    }

    const readableBalance = (data.value / 10 ** 18).toFixed(2);
    return <div>Balance: {readableBalance.toString()}</div>;
  };

  const USDBalanceDisplay = () => {
    const { data, isLoading } = useBalance("0x1A71f491fb0Ef77F13F8f6d2a927dd4C969ECe4f");
    if (isLoading) {
      return <div>Loading...</div>;
    }

    const readableBalance = (data.value / 10 ** 18).toFixed(2);
    return <div>Balance: {readableBalance.toString()}</div>;
  }; 

  const callFaucet = async (token) => {
    const body = JSON.stringify({ walletAddress: address, token: token });
    setIsClaimLoading(true);
    const response = await fetch('/api/faucet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  
    if (response.ok) {
      const data = await response.json();
      setTxHash(data.body.receipt.transactionHash);
      setTokensClaimed(true);
    } else {
      console.error('Error:', response.status);
    }
  }

  const ConnectWalletButton = () => {
    return (
      <ConnectWallet
        switchToActiveChain={true}
        theme={customTheme}
        modalSize={"wide"}
        welcomeScreen={{
          img: {
            src: "https://www.etherlink.com/logo.png",
            width: 170,
            height: 160,
          },
          title: "Build Web3 on Etherlink",
          subtitle:
            "Connect your wallet to claim testnet tokens",
        }}
        btnTitle="Connect Etherlink To Metamask"
      />
    )
  }

  const ClaimButton = ({ walletStatus }) => {
    const callWithReCAPTCHA = async (event) => {
      event.preventDefault();
      const token = await recaptchaRef.current.executeAsync();
      callFaucet(token);
    }

    return (
      walletStatus === "connected" && chainId === 128123 ?
        <button
          onClick={txHash ? () => window.open(`https://explorer.etherlink.com/tx/${txHash}`, '_blank') : callWithReCAPTCHA}
          disabled={isClaimLoading}
          className={`flex flex-row items-center justify-center py-3 text-lg font-medium text-center text-black bg-white border-solid border-2 border-black rounded-md px-7 lg:px-6 lg:py-4 hover:bg-darkGreen hover:border-black hover:text-white ${isClaimLoading  ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isClaimLoading ? <>
            <Image
              src="/img/home/logo.png"
              alt="Loading..."
              width={32}
              height={32}
              className={`w-8 mr-2 ${isClaimLoading ? 'spin-logo' : ''}`}
            />
            Loading...
          </> : txHash ?
            <>
              <Image
                src="/img/home/logo.png"
                alt="logo"
                width={32}
                height={32}
                className="w-8 mr-2"
              />
              {`${txHash.slice(0, 6)}...${txHash.slice(-4)}`}
            </> :
            `Claim tokens to ${shortAddress}`}
        </button> : ""
    )
  }

  return (
    <div className="flex items-center justify-center w-full lg:w-1/2 rounded-lg mt-10 mb-10 s">
      <div className="max-w-2xl text-center lg:text-center">
        <div className="flex flex-col space-y-2 mb-10">
          <h1 className="text-white font-bold text-3xl" >
            {title}
          </h1>
          <p> Connect your wallet below and click claim to receive 0.1 XTZ, 10 eUSD, 10 USDT, and more! </p>
          <p> Your current XTZ balance is: </p> <XTZBalanceDisplay />
          <p> Your current eUSD balance is: </p> <USDBalanceDisplay />
          {/* <p> {data && data.value.toString()} </p> */}
        </div>
        <div className="flex flex-col items-center">
          <ConnectWalletButton />
          {(walletStatus === "connected" && chainId === 128123) && <ReCAPTCHA
            sitekey="6Lel71EpAAAAABL0ioHbsj2MGmeiiz8wFxWkC6lK"
            ref={recaptchaRef}
            size="invisible"
            className="mt-10"
            theme="light"
          />}
          <ClaimButton walletStatus={walletStatus} />
          {/* <TokenTable walletStatus={walletStatus} captchaCompleted={captchaCompleted} /> */}
        </div>
      </div>
    </div >
  );
}

export default FaucetTable;



