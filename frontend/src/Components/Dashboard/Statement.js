import React, {useState, useEffect} from 'react'
import { MDBCard, MDBCardText, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { getTransactions, getAccountNameByAccountNumber, getAccountCustomerDetails } from '../../Services/Api';
import { stringToDate } from '../../Utils/Date';

export const Statement = () => {
    // const transactions = [
    //     { toAccount: '987654321', name: 'Jane Smith', amount: 1000, balance: 9500, sign :'-' ,timestamp: '2023-08-17 10:30 AM' },
    //     { toAccount: '876543210', name: 'John Doe', amount: 2000, balance: 11500, sign: '+',timestamp: '2023-08-17 02:15 PM' },
        
    // ];

    const [balance, setBalance] = useState(0)
    const [acNumber, setAcNumber] = useState(0)
    const [acOwner, setAcOwner] = useState('Mr. Abc Xyz')

    useEffect(() => {
        //To fetch data from backend
        getAccountCustomerDetails()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAcNumber(data.accountNumber)
            setAcOwner(`${data.title} ${data.firstName} ${data.middleName} ${data.lastName}`)
            setBalance(data.balance)
        })
    }, []);

    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        getTransactions()
        .then(res => {
            if(!res.ok){
                return res.text()
                .then(data => {
                    console.log("Err: ", data)
                    throw new Error(data)
                }
                )
            }
            else{
                res.json()
                .then(data => {   
                    data.debit = data.debit.map( item => {
                        return {
                            ...item,
                            type: 'debit',
                        }
                    })
                    data.credit = data.credit.map( item => {
                        return {
                            ...item,
                            type: 'credit',
                        }
                    })                 

                    let allTrans = data.debit.concat(data.credit)
                    allTrans = allTrans.map( item => {
                        const acName = getAccountNameByAccountNumber(item.type === 'credit' ? item.fromAccount : item.beneficiaryAccount)
                        return {
                            ...item,
                            name: acName,
                            timestamp: stringToDate(item.timestamp)
                        }
                    })
                    allTrans.sort((a, b) => {
                        return b.timestamp - a.timestamp
                    })
                    
                    console.log("Transactions: ", allTrans)
                    setTransactions(allTrans)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })


        // getAccountNameByAccountNumber(12345678901234)
        .then(data => console.log("User:", data))
    }, [])




    return (
        <div className="container">
            <MDBCard className="my-4 p-4">
                <MDBCardText className='fs-4 mb-4'>Account Details</MDBCardText>
                <MDBCardText className='mb-2'>Account Number: {acNumber}</MDBCardText>
                <MDBCardText className='mb-2'>Account Holder Name: {acOwner}</MDBCardText>
                <MDBCardText>Account Balance: INR {balance}</MDBCardText>
            </MDBCard>

            <MDBTable bordered>
                <MDBTableHead>
                    <tr>
                        <th>Account Number</th>
                        {/* <th>Name</th> */}
                        <th>Transfer Amount</th>
                        <th>Timestamp</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {transactions.map((item, index) => (
                        <tr key={item.referenceId}>
                            <td>{item.type === "credit"? item.fromAccount : item.beneficiaryAccount}</td>
                            {/* <td>{transaction.name}</td> */}
                            <td>
                                <span style={{ color: item.type === 'debit' ? 'red' : 'green' }}>{item.type === 'debit' ? '-':'+'}</span>
                                <span style={{ color: item.type === 'debit' ? 'red' : 'green' }}>{(item.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR'})}</span>
                            </td>
                            <td>{item.timestamp.toString()}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    )
}
 



        


 





    
        