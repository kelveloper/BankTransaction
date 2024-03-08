import React, { useState, useEffect } from "react";
import TransactionList from "../component/transactionList";
import TransactionAdd from "../component/transactionAdd";
import TransactionTransfer from "../component/transactionTransfer";

function Transaction() {
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [currentAccountId, setCurrentAccountId] = useState('');
  const [newAccountId, setNewAccountId] = useState('');




  function handleTransaction() {
    alert(`Transaction Details:\nType: ${transactionType}\nAmount: ${amount}\nCurrent Account: ${currentAccountId}\nNew Account: ${newAccountId}`);
  }

  return (
    <div className="Transaction">
      <TransactionList/>
      <TransactionAdd/>
      <TransactionTransfer/>
      
    </div>
  );
}

export default Transaction;
