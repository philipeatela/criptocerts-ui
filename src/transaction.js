const Web3 = require('web3');

const web3 = new Web3(window.web3.currentProvider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await web3.eth.sendTransaction({
    from: accounts[0],
    to: "0xaa11318DEff67cB37a3210f13a594C5B853123B8",
    gas: 2000000,
    data: "0x123456"
  });
  console.log(result);
};
deploy();
