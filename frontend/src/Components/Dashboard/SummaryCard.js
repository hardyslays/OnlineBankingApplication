import React, {useState,useEffect} from 'react';
import { MDBCard, MDBCardText } from 'mdb-react-ui-kit';
import CanvasJSReact from '@canvasjs/react-charts';

import { getTransactions, getAccountCustomerDetails } from '../../Services/Api';
import { stringToDate } from '../../Utils/Date';

const TransactionChart = (dataPoints) => {
    var CanvasJSChart =  CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        axisX: {
          title: 'Date',
          valueFormatString: 'MMM DD YYYY hh:mm:ss'
        },
        axisY: {
          title: 'Balance',
          valueFormatString: '#,##0.00'
        },
        height: 200,

        data: [{
          type: 'spline',
          markerSize: 10,
          xValueFormatString: 'MMM DD YYYY hh:mm:ss',
          yValueFormatString: '#,##0.00',
          dataPoints: dataPoints
        }]
      }

    return(
        <div className='px-5'>
            <CanvasJSChart options={options}/>
        </div>
    )
}

export const SummaryCard = () => {
    // const data = [
    //     { x: new Date('2023-08-10'), y: 1200 },
    //     { x: new Date('2023-08-11'), y: 1250 },
    //     { x: new Date('2023-08-12'), y: 1220 },
    //     { x: new Date('2023-08-13'), y: 1250 },
    //     { x: new Date('2023-08-14'), y: 1220 },
    //     { x: new Date('2023-08-18'), y: 150 },
    //     { x: new Date('2023-08-23'), y: 10 },
    // ]

    const [dataPoints, setDataPoints] = useState([])
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState(0)

    const calculateBalanceHistory = async() => {
        let curBalance = balance
        let data = [{x: new Date(), y: balance}]

        transactions.slice(0, 4).forEach( item => {
            if(item.type === 'credit'){
                curBalance -= item.amount
            }
            else{
                curBalance += item.amount
            }

            console.log("Transaction: ", item)
            console.log("Balance after trans: ", curBalance)
            
            data.push({
                x: item.timestamp,
                y: curBalance
            })
            console.log("Data: ", data)
        })
        setDataPoints(data.reverse())
        console.log("3. DataPoints: ", dataPoints)
    }

    useEffect(() => {
        calculateBalanceHistory()
    }, [balance])

    useEffect( () => {
        getAccountCustomerDetails()
            .then(res => res.json())
            .then(data => {
                setBalance(data.balance)
                console.log("Balance: ", balance)
            })
        }
    , [transactions])

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
                        return {
                            ...item,
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
    }, [])

    return (
        <MDBCard className='mx-2 mt-4 h-50'>
            <MDBCardText className='pt-3 ps-5 fs-3'>Balance Summary</MDBCardText>
            {TransactionChart(dataPoints)}
        </MDBCard>
    )
}