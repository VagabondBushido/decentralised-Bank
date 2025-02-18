// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SimpleBank.sol";

contract SimpleBankTest is Test {
    SimpleBank public bank;
    address alice = address(1);
    address bob = address(2);

    function setUp() public {
        bank = new SimpleBank();
        vm.deal(alice, 100 ether);
        vm.deal(bob, 100 ether);
    }

    function testDeposit() public {
        vm.startPrank(alice);
        uint256 depositAmount = 1 ether;
        bank.deposit{value: depositAmount}();
        assertEq(bank.getContractBalance(), depositAmount);
        assertEq(bank.getBalance(), depositAmount);
        vm.stopPrank();
    }

    function testWithdraw() public {
        vm.startPrank(alice);
        bank.deposit{value: 2 ether}();
        uint256 balanceBefore = address(alice).balance;
        bank.withdraw(1 ether);
        uint256 balanceAfter = address(alice).balance;
        assertEq(balanceAfter - balanceBefore, 1 ether);
        vm.stopPrank();
    }

    function testTransfer() public {
        vm.startPrank(alice);
        bank.deposit{value: 2 ether}();
        bank.transfer(bob, 1 ether);
        vm.stopPrank();

        vm.prank(bob);
        assertEq(bank.getBalance(), 1 ether);
    }

    function testRevertWithdrawInsufficientBalance() public {
        vm.prank(alice);
        vm.expectRevert("Insufficient balance");
        bank.withdraw(1 ether);
    }
}
