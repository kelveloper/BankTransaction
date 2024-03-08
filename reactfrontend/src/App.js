import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Bank from "./pages/Bank"
import Customer from "./pages/Customer"
import Account from "./pages/Account"
import Transaction from "./pages/Transaction"
import NavBar from './component/navbar';
import AccountID from './pages/AccountID'
import TransactionID from './pages/TransactionID'
import NotFound from './pages/NotFound';
import TransactionsForAccount from './component/transactionsForAccount';
import SingleCustomer from './pages/SingleCustomer';

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/bank" element = {<Bank/>}/>
          <Route path = "/singleCustomer" element = {<SingleCustomer/>}/>

          <Route path = "/customer" element = {<Customer/>}/>
          <Route path = "/customer" element = {<Customer/>}/>

          <Route path= "customer/account/:Accountid" element={<AccountID/>} />
          <Route path= "customer/account/transaction/:TransactionID" element= {<TransactionID/>}/>
          <Route path = "/account" element = {<Account/>}/>
          <Route path = "/transaction" element = {<Transaction/>}/>
          <Route path = "/transactionsForAccount" element = {<TransactionsForAccount customerId={6}/>}/>

          <Route path='*' element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
