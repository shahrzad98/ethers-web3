/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { IDOTokenBank } from "../IDOTokenBank";

export class IDOTokenBank__factory extends ContractFactory {
    constructor(signer?: Signer) {
        super(_abi, _bytecode, signer);
    }

    deploy(_usdToken: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<IDOTokenBank> {
        return super.deploy(_usdToken, overrides || {}) as Promise<IDOTokenBank>;
    }
    getDeployTransaction(
        _usdToken: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): TransactionRequest {
        return super.getDeployTransaction(_usdToken, overrides || {});
    }
    attach(address: string): IDOTokenBank {
        return super.attach(address) as IDOTokenBank;
    }
    connect(signer: Signer): IDOTokenBank__factory {
        return super.connect(signer) as IDOTokenBank__factory;
    }
    static connect(address: string, signerOrProvider: Signer | Provider): IDOTokenBank {
        return new Contract(address, _abi, signerOrProvider) as IDOTokenBank;
    }
}

const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_usdToken",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "ApproveTokens",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OperatorAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OperatorRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "ReceivedTokens",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "RemoveOperator",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "RewarderAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "RewarderRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "SetOperator",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "rewarder",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SetRewarderOfIDO",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "TransferTokens",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_poolAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_idoToken",
                type: "address",
            },
        ],
        name: "addIDOPredictionWithToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "addRewarder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_idoToken",
                type: "address",
            },
        ],
        name: "getIDOTokenBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getUSDBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getUSDToken",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "idos",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isOperator",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isRewarder",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "poolToIDOTokens",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_operator",
                type: "address",
            },
        ],
        name: "removeOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceRewarder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOperator",
                type: "address",
            },
        ],
        name: "setOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_idoToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transferUserIDOToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_stuckToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "withdrawTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const _bytecode =
    "0x60806040523480156200001157600080fd5b50604051620014ae380380620014ae833981810160405260208110156200003757600080fd5b5051600062000045620000fb565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620000a36200009d620000fb565b620000ff565b620000bc57620000bc620000b6620000fb565b62000122565b620000d0620000ca620000fb565b62000174565b620000e957620000e9620000e3620000fb565b62000191565b620000f481620001e3565b50620002f2565b3390565b60006200011c8260016200020560201b62000d6f1790919060201c565b92915050565b6200013d8160016200026e60201b62000dd61790919060201c565b6040516001600160a01b038216907fac6fa858e9350a46cec16539926e0fde25b7629f84b5a72bffaae4df888ae86d90600090a250565b60006200011c8260026200020560201b62000d6f1790919060201c565b620001ac8160026200026e60201b62000dd61790919060201c565b6040516001600160a01b038216907f9dfd431959d2d3358e3eb909555ad574123ea5881ff0e05a80f66d4984710c1b90600090a250565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b0382166200024e5760405162461bcd60e51b81526004018080602001828103825260228152602001806200148c6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6200027a828262000205565b15620002cd576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b61118a80620003026000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638a5ceabb116100ad578063ac8a584a11610071578063ac8a584a14610325578063b3ab15fb1461034b578063c120105414610371578063f2fde38b14610379578063f5e96fc91461039f57610121565b80638a5ceabb1461027e5780638da5cb5b1461029b5780638e478cab146102a35780639870d7fe146102c95780639bc5c509146102ef57610121565b806356d3590b116100f457806356d3590b146101a65780635da9953e146101cc5780636975a59a1461020e5780636d70f7ae1461023c578063715018a61461027657610121565b80631c65a539146101265780631cd0edf41461015e5780632ab6f8db1461019657806340cc85181461019e575b600080fd5b61014c6004803603602081101561013c57600080fd5b50356001600160a01b03166103a7565b60408051918252519081900360200190f35b6101946004803603606081101561017457600080fd5b506001600160a01b03813581169160208101359091169060400135610425565b005b6101946105ac565b6101946105be565b610194600480360360208110156101bc57600080fd5b50356001600160a01b03166105ce565b6101f2600480360360208110156101e257600080fd5b50356001600160a01b0316610620565b604080516001600160a01b039092168252519081900360200190f35b6101946004803603604081101561022457600080fd5b506001600160a01b038135811691602001351661063b565b6102626004803603602081101561025257600080fd5b50356001600160a01b03166107fc565b604080519115158252519081900360200190f35b61019461080f565b6101f26004803603602081101561029457600080fd5b50356108bb565b6101f26108e5565b610262600480360360208110156102b957600080fd5b50356001600160a01b03166108f4565b610194600480360360208110156102df57600080fd5b50356001600160a01b0316610901565b6101946004803603606081101561030557600080fd5b506001600160a01b03813581169160208101359160409091013516610950565b6101946004803603602081101561033b57600080fd5b50356001600160a01b0316610a37565b6101946004803603602081101561036157600080fd5b50356001600160a01b0316610aea565b61014c610be2565b6101946004803603602081101561038f57600080fd5b50356001600160a01b0316610c5e565b6101f2610d60565b604080516370a0823160e01b8152306004820152905160009183916001600160a01b038316916370a08231916024808301926020929190829003018186803b1580156103f257600080fd5b505afa158015610406573d6000803e3d6000fd5b505050506040513d602081101561041c57600080fd5b50519392505050565b610435610430610e57565b6108f4565b6104705760405162461bcd60e51b81526004018080602001828103825260348152602001806111216034913960400191505060405180910390fd5b6001600160a01b0382166104b55760405162461bcd60e51b81526004018080602001828103825260218152602001806110746021913960400191505060405180910390fd5b600560006104c1610e57565b6001600160a01b03908116825260208201929092526040016000205484821691161461051e5760405162461bcd60e51b8152600401808060200182810382526025815260200180610fcb6025913960400191505060405180910390fd5b6040805163a9059cbb60e01b81526001600160a01b038481166004830152602482018490529151859283169163a9059cbb9160448083019260209291908290030181600087803b15801561057157600080fd5b505af1158015610585573d6000803e3d6000fd5b505050506040513d602081101561059b57600080fd5b50516105a657600080fd5b50505050565b6105bc6105b7610e57565b610e5b565b565b6105bc6105c9610e57565b610e9d565b6105d9610430610e57565b6106145760405162461bcd60e51b81526004018080602001828103825260348152602001806111216034913960400191505060405180910390fd5b61061d81610edf565b50565b6005602052600090815260409020546001600160a01b031681565b61064b610646610e57565b6107fc565b6106865760405162461bcd60e51b81526004018080602001828103825260348152602001806110406034913960400191505060405180910390fd5b6001600160a01b038216158015906106a657506001600160a01b03811615155b6106e15760405162461bcd60e51b815260040180806020018281038252602a815260200180610ff0602a913960400191505060405180910390fd5b6001600160a01b03828116600090815260056020526040902054161561074e576040805162461bcd60e51b815260206004820152601f60248201527f30383131207468697320706f6f6c2068617320616e2049444f20746f6b656e00604482015290519081900360640190fd5b610757826105ce565b6001600160a01b03808316600081815260056020908152604080832080549587166001600160a01b031996871681179091556004805460018101825594527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b90930180549095168317909455835192835282015281517f50e788d847e5c05f470a1561c3507c2c9d168811485162c8b65aeed5fb34e8a3929181900390910190a15050565b6000610809600183610d6f565b92915050565b610817610e57565b6001600160a01b03166108286108e5565b6001600160a01b031614610871576040805162461bcd60e51b815260206004820181905260248201526000805160206110df833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600481815481106108cb57600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b031690565b6000610809600283610d6f565b61090c610646610e57565b6109475760405162461bcd60e51b81526004018080602001828103825260348152602001806110406034913960400191505060405180910390fd5b61061d81610f21565b610958610e57565b6001600160a01b03166109696108e5565b6001600160a01b0316146109b2576040805162461bcd60e51b815260206004820181905260248201526000805160206110df833981519152604482015290519081900360640190fd5b6040805163a9059cbb60e01b81526001600160a01b038381166004830152602482018590529151859283169163a9059cbb9160448083019260209291908290030181600087803b158015610a0557600080fd5b505af1158015610a19573d6000803e3d6000fd5b505050506040513d6020811015610a2f57600080fd5b505050505050565b610a3f610e57565b6001600160a01b0316610a506108e5565b6001600160a01b031614610a99576040805162461bcd60e51b815260206004820181905260248201526000805160206110df833981519152604482015290519081900360640190fd5b610aa281610e5b565b610aab81610e9d565b604080516001600160a01b038316815290517f6b4be2dd49eba45ba43390fbe7da13e2b965d255db41d6a0fcf6d2e15ac1fccb9181900360200190a150565b610af2610e57565b6001600160a01b0316610b036108e5565b6001600160a01b031614610b4c576040805162461bcd60e51b815260206004820181905260248201526000805160206110df833981519152604482015290519081900360640190fd5b6001600160a01b038116610b915760405162461bcd60e51b81526004018080602001828103825260298152602001806110b66029913960400191505060405180910390fd5b610b9a81610901565b610ba3816105ce565b604080516001600160a01b038316815290517fdbebfba65bd6398fb722063efc10c99f624f9cd8ba657201056af918a676d5ee9181900360200190a150565b600354604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b158015610c2d57600080fd5b505afa158015610c41573d6000803e3d6000fd5b505050506040513d6020811015610c5757600080fd5b5051905090565b610c66610e57565b6001600160a01b0316610c776108e5565b6001600160a01b031614610cc0576040805162461bcd60e51b815260206004820181905260248201526000805160206110df833981519152604482015290519081900360640190fd5b6001600160a01b038116610d055760405162461bcd60e51b815260040180806020018281038252602681526020018061101a6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031690565b60006001600160a01b038216610db65760405162461bcd60e51b81526004018080602001828103825260228152602001806110ff6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b610de08282610d6f565b15610e32576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b3390565b610e66600182610f63565b6040516001600160a01b038216907f80c0b871b97b595b16a7741c1b06fed0c6f6f558639f18ccbce50724325dc40d90600090a250565b610ea8600282610f63565b6040516001600160a01b038216907fce699c579f0b70ea4ccd6a4b38be26726a2c248b89c7102ccbc5d0f3060ef6d090600090a250565b610eea600282610dd6565b6040516001600160a01b038216907f9dfd431959d2d3358e3eb909555ad574123ea5881ff0e05a80f66d4984710c1b90600090a250565b610f2c600182610dd6565b6040516001600160a01b038216907fac6fa858e9350a46cec16539926e0fde25b7629f84b5a72bffaae4df888ae86d90600090a250565b610f6d8282610d6f565b610fa85760405162461bcd60e51b81526004018080602001828103825260218152602001806110956021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff1916905556fe3038343020706f6f6c206861736e27742061636365737320746f207468697320746f656b6e3038313020506f6f6c206f7220746f6b656e20616464726573732063616e6e6f74206265207a65726f2e4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f70657261746f72526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204f70657261746f7220726f6c6530383330205573657220616464726573732063616e6e6f74206265207a65726f2e526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c6530383030204e6577204f70657261746f7220616464726573732063616e6e6f74206265207a65726f2e4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572526f6c65733a206163636f756e7420697320746865207a65726f20616464726573735265776172646572526f6c653a2063616c6c657220646f6573206e6f7420686176652074686520526577617264657220726f6c65a26469706673582212201c61b3feffedcb15bf8066dbd1239d379217b892e857682bcda055fc4e68b66664736f6c63430007060033526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";