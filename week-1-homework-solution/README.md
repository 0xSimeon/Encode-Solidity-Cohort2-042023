# Weekend Project 1 - Group 3.

### Group Members
| Name      | Discord ID |
| --------- | -----------|
| Simeon Udoh | Simeon#8769 |
| Stephen |  notchobby#9705 |
| Antonio | Hydra#6138 |
| Dickson | justice#1900 |

##### Weekend Project One Objectives:

- Interact with “HelloWorld.sol” within your group to change message strings and change owners
- Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed

<br>

##### Code
``` solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private text;
    address public owner;

    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }

    function helloWorld() public view returns (string memory) {
        return text;
    }

    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner()
    {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }
}
```

<br>


**Network used:** ETH Sepolia testnet<br>
***Deployment transaction*:** https://sepolia.etherscan.io/address/0x7e1082b5c833cd56535fcbb95ae1c5d9c3f7a3c3

### 1.  Interacting with HelloWorld.sol `setText()` method without being the Owner

After the deployment of the `HelloWorld.sol` contract, we tried to interact with the contract's `setText()` method. 

| Tag |  Addresss |
| ---- |  ------------- |
| Current Owner | 0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| Non-Owner | 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |

##### Notes
>When interacting with the contract's `setText()` without being an owner, we get the *gas estimation failed error/warning.*
>
>However, we can cancel the transaction or force send it using the “**Send Transaction**” button in the above screenshot. If we do force the transaction and confirm it, The transaction fails. 



##### Transaction Details: 
| Param | Data
| ---------------------- | ---------------|
| Current Owner address: | 0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| Transaction Hash  |  0xb4349d7099ecec77ca0a347681d5fdffa1cfe5d54bdec51fb2a1953bc3b21c43 |
| Address Interacting with the contract |  0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction cost | 24451 gas |
| Status | ❌ False Transaction mined but execution failed (failed tx). | 




### 2.  Transfering ownership

Moving on, we transferred ownership of the contract using the `transferOwnership()` and the details of the transactions are presented below: 

| Param | Data
| ---------------------- | ---------------|
| Old Owner address: | 0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| New Owner address: | 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction Hash  |  0xf9038d881ca566893772a934bd9d6f2925b47a0e9d7fc6af7ca2a030aa0f2dad |
| Address Interacting with the contract |  0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| Status | Successful ✅ |
 
<br>

### 3. After being transferred the owner access control and interacting with the HelloWorld.sol `setText()`  method. 

Now with the `Owner` priviledges after the performing [Transfer Ownership](#2-transfering-ownership) operation, we interacted with the contract's `setText()` method again and voila, *it worked this time*.


##### Transaction Details: 
| Param | Data
| ---------------------- | ---------------|
| Current Owner address: | 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction Hash  |  0x97ccad4da9c4045f99bbaf5715381cfd00e85c6a8411bdbec461cb4ead887943 |
| Address Interacting with the contract |  0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Status | Successful ✅ | 



