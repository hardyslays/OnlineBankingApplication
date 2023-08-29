import React, {useEffect, useState} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';

import { SummaryCard } from './SummaryCard';
import { DetailsCard } from './DetailsCard';
import { PayeeBoard } from './PayeeBoard';
import { getTransactions } from '../../Services/Api';
import { stringToDate } from '../../Utils/Date';

const SideArea = () => {

    const [active, setactive] = useState('all')
    const [transactions, setTransactions] = useState([])

    const handleClick = (val) => {
        if(val === active){
            return
        }
        setactive(val)
    }

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

                    setTransactions(allTrans)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Container className='py-3'>
        <p className='fs-3 mt-2 ms-3'>Recent Transactions</p>
        <MDBTabs className='mb-3 ms-3 fs-0.75'>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleClick('all')} active={active === 'all'}>
                All
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleClick('credit')} active={active === 'credit'}>
                Credit
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleClick('debit')} active={active === 'debit'}>
                Debit
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane show={active === 'all'}>
                <MDBContainer>
                {transactions.slice(0, 3)
                .map((item) => {
                    return(
                        <>
                        <MDBRow key={item.referenceId} className='mb-2 fs-6'>
                            <MDBCol size={2} className='text-end'>
                                {item.type === "credit"? "CR": "DB"}
                            </MDBCol>
                            <MDBCol  size={6}>
                                {item.type === "credit"? item.fromAccount: item.beneficiaryAccount}
                            </MDBCol>
                            <MDBCol className='text-end'>
                                {item.amount}
                            </MDBCol>
                        </MDBRow>
                        <div className='border-bottom border-secondary border-2 mb-2'></div>
                        </>
                        )
                    })}
                </MDBContainer> 
            </MDBTabsPane>
            <MDBTabsPane show={active === 'credit'}>
            <MDBContainer>
            {transactions.filter(item => item.type === 'credit').slice(0, 3)
            .map((item) => {
                return(
                    <>
                    <MDBRow key={item.referenceId} className='mb-2 fs-6'>
                        <MDBCol size={2} className='text-end'>
                            {item.type === "credit"? "CR": "DB"}
                        </MDBCol>
                        <MDBCol  size={6}>
                            {item.type === "credit"? item.fromAccount: item.beneficiaryAccount}
                        </MDBCol>
                        <MDBCol className='text-end'>
                            {item.amount}
                        </MDBCol>
                    </MDBRow>
                    <div className='border-bottom border-secondary border-2 mb-2'></div>
                    </>
                    )
                })}
                </MDBContainer> 
            </MDBTabsPane>
            <MDBTabsPane show={active === 'debit'}>
            <MDBContainer>
                {transactions.filter(item => item.type === 'debit').slice(0, 3)
                .map((item) => {
                    return(
                        <>
                        <MDBRow key={item.referenceId} className='mb-2 fs-6'>
                            <MDBCol size={2} className='text-end'>
                                {item.type === "credit"? "CR": "DB"}
                            </MDBCol>
                            <MDBCol  size={6}>
                                {item.type === "credit"? item.fromAccount: item.beneficiaryAccount}
                            </MDBCol>
                            <MDBCol className='text-end'>
                                {item.amount}
                            </MDBCol>
                        </MDBRow>
                        <div className='border-bottom border-secondary border-2 mb-2'></div>
                        </>
                        )
                    })}
                </MDBContainer> 
            </MDBTabsPane>
        </MDBTabsContent>
        </Container>
    )
}

export const Dashboard = () => {
    

  return (
    <div className='w-100 m-0'>
        <Container>
            <Row>
                <Col md={6}>
                    <DetailsCard />
                    <SummaryCard />
                </Col>
                <Col md={5}>
                    <SideArea />
                    <PayeeBoard />
                </Col>
            </Row>
        </Container>
    </div>
  )
}
