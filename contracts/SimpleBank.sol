// First, a simple Bank contract
// Allows deposits, withdrawals, balance checks and selfdestruction

// simple_bank.sol (note .sol extension)
/* **** START EXAMPLE **** */

// Declare the source file compiler version
pragma solidity ^0.5.1;

// Start with Natspec comment (the three slashes)
// used for documentation - and as descriptive data for UI elements/actions

/// @title SimpleBank
/// @author nemild, siddalal

/* 'contract' has similarities to 'class' in other languages (class variables,
inheritance, etc.) */
contract SimpleBank { // CapWords
    // Declare state variables outside function, persist through life of contract

    // dictionary that maps addresses to balances
    // always be careful about overflow attacks with numbers
    mapping (address => uint) private balances;

    // "private" means that other contracts can't directly query balances
    // but data is still viewable to other parties on blockchain

    address public owner;
    // 'public' makes externally and internally readable (not writeable) by users or contracts

    // Events - publicize actions to external listeners
    event LogDepositMade(address accountAddress, uint amount);

    // Constructor, can receive one or many variables here; only one allowed
    // at the creation of contract
   	constructor() public {
        // msg provides details about the message that's sent to the contract
        // msg.sender is contract caller (here address of contract creator)
        owner = msg.sender;
    }
    	// Access control modifier
        // Modifiers validate inputs to functions such as minimal balance, or user auth
        //'_;' included as the last line in the body and indicates that it will wrap
        //around the function which refers to this modifier. 
	modifier onlyOwner {
		require(msg.sender == owner,
		        "Only the contract owner can call this function");
		_;
	}

    	// Accept any incoming amount and change balance
    	   /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    	
    function () external payable {
    // Use 'require' to test user inputs, 'assert' for internal invariants
    // Here we are making sure that there isn't an overflow issue
        require((balances[msg.sender] + msg.value) >= balances[msg.sender]);
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value); // fire event
     //return balances[msg.sender];
    }
    
     address public whoDeposited; 
     
     function deposit() public payable returns  (uint remainingBal) {
         whoDeposited=msg.sender;
        require((balances[msg.sender] + msg.value) >= balances[msg.sender]);
        balances[msg.sender] +=  msg.value;
        emit LogDepositMade(msg.sender, msg.value); // fire event
        return balances[msg.sender];
    }
    
    
    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    uint public wAmount;
    address public whoWithdrew;
    
    function withdraw(uint withdrawAmount) public payable returns (uint remainingBal) {
        whoWithdrew=msg.sender;
        wAmount=withdrawAmount;
        require(withdrawAmount <= balances[msg.sender]);

        // Note the way we deduct the balance right away, before sending
        // Every .transfer/.send from this contract can call an external function
        // This may allow the caller to request an amount greater
        // than their balance using a recursive call
        // Aim to commit state before calling external functions, including .transfer/.send
        balances[msg.sender] -= withdrawAmount;
        // this automatically throws on a failure, which means the updated balance is reverted
        msg.sender.transfer(withdrawAmount);
        return balances[msg.sender];
    }

    /// @notice Get balance
    /// @return The balance of the user
    // 'view' (ex: constant) prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance() view public returns (uint) {
        return balances[msg.sender];
    }
    /// Notice the contract can be destroyed only by owner (see check; modifier and require)
    // Sends remaning balance to msg.sender
    	function destroy() public onlyOwner {
	    require(msg.sender == owner, "Only the contract owner can call this function");
		selfdestruct(address(uint160(owner)));
	}
}
// ** END EXAMPLE **