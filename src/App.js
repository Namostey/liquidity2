import React, { useState } from 'react';
import Web3 from 'web3';
import LiquidityPoolABI from './abi.json'; // Import your ABI here

const LiquidityPool = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState('');

  const contractAddress = '0xd7933735d954CdE5E33f69d3dEc08E4bD9aC7dfd'; // Replace with your contract address

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccount(accounts[0]);

      const liquidityPoolContract = new web3Instance.eth.Contract(LiquidityPoolABI, contractAddress);
      setContract(liquidityPoolContract);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleDeposit = async () => {
    if (contract && account && amount) {
      try {
        await contract.methods.deposit(web3.utils.toWei(amount, 'ether')).send({ from: account });
        setMessage('Deposit successful!');
      } catch (error) {
        console.error(error);
        setMessage('Deposit failed.');
      }
    }
  };

  const handleWithdraw = async () => {
    if (contract && account && amount) {
      try {
        await contract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: account });
        setMessage('Withdraw successful!');
      } catch (error) {
        console.error(error);
        setMessage('Withdraw failed.');
      }
    }
  };

  const handleBorrow = async () => {
    if (contract && account && amount) {
      try {
        await contract.methods.borrow(web3.utils.toWei(amount, 'ether')).send({ from: account });
        setMessage('Borrow successful!');
      } catch (error) {
        console.error(error);
        setMessage('Borrow failed.');
      }
    }
  };

  const handleRepay = async () => {
    if (contract && account && amount) {
      try {
        await contract.methods.repay(web3.utils.toWei(amount, 'ether')).send({ from: account });
        setMessage('Repay successful!');
      } catch (error) {
        console.error(error);
        setMessage('Repay failed.');
      }
    }
  };

  const handleClaimReward = async () => {
    if (contract && account) {
      try {
        await contract.methods.claimReward().send({ from: account });
        setMessage('Reward claimed!');
      } catch (error) {
        console.error(error);
        setMessage('Claim reward failed.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Liquidity Pool</h2>
      <button onClick={connectWallet} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Connect Wallet</button>
      <br /><br />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button onClick={handleDeposit} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Deposit</button>
      <button onClick={handleWithdraw} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Withdraw</button>
      <button onClick={handleBorrow} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Borrow</button>
      <button onClick={handleRepay} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Repay</button>
      <button onClick={handleClaimReward} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Claim Reward</button>
      <br /><br />
      <div>{message}</div>
    </div>
  );
};

export default LiquidityPool;
