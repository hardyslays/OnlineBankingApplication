import React, { useEffect, useState } from 'react'
import { Form, Col, Card, Button, Row, ListGroup } from 'react-bootstrap'
import { getCustomers,getCustomersApproved,getCustomersAll,getAccounts } from '../../Services/Admin';
import { useNavigate } from 'react-router-dom';




export const AdminDashboard = (main_props) => {

    const navigate = useNavigate()
    const [cust, setCust] = useState([]);
    const [allCust, setAllCust] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const isLogin = sessionStorage.getItem('adminSecret')

        if(!isLogin)navigate('/admin/login')
    })

    useEffect(() => {
            getCustomersAll()
            .then(data => {
                setCust(data)
                setAllCust(data)
                console.log(data)
            })
        
    }, [])

    function CustomCard(props) {
        const routeChange = (path) =>{
            console.log(path);
            setAccounts([])
            if (path==="/admin/all/"){
                // getCustomers()
                getCustomersAll()
                .then(data => {
                    setCust(data)
                    console.log(data)
                })
            }
            else if (path==="/admin/approved/"){
                getCustomersApproved()
                // getCustomersAll()
                .then(data => {
                    setCust(data)
                    console.log(data)
                })
            }
            else if(path==="/admin/pending/"){
                getCustomers()
                // getCustomersAll()
                .then(data => {
                    setCust(data)
                    console.log(data)
                })
            }
            else {
                getAccounts()
                // getCustomersAll()
                .then(data => {
                    setAccounts(data)
                    setCust([])
                    console.log(data)
                })
            }
            navigate(path);
            }
          return (
            <Col>
            <Card style={{ width: '18rem', height:'90%', margin:'auto', padding:'0 10px 0 10px'}}>
              <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                  {props.desc}
                </Card.Text>
                <Button onClick={() => routeChange(props.url)} variant="primary" className='m-3'>{props.url_title}</Button>
              </Card.Body>
            </Card>
            </Col>
          );
        }
    const AccountRow = () => {
        return (
            <Row xs={1} md={3} lg={4} className='w-100'>
                {accounts.map(account => {
                    return(
                    <Col key={account.customerId}>
                    <Card className='m-3' bg='light'>
                        <Card.Header className='px-3 py-2' as='h5'>CID: {account.customerId}</Card.Header>
                        <Card.Title className='px-3 py-2'>Acc No.: {`${account.accountNumber}`}</Card.Title>

                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>Username: {account.netBankingUserName}</ListGroup.Item>
                            <ListGroup.Item>Balance:  {account.balance}</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer className='w-100 px-3 d-flex justify-content-center'>
                            <Button variant='info' className='w-50' onClick={() => navigate('/admin/account/' + account.accountNumber)}>More Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                    )}
                )}
                
        </Row>
        )
    }
    const CustomerRow = () => {
        return (
            <Row xs={1} md={3} lg={4} className='w-100'>
                {cust.map(customer => {
                    return(
                    <Col key={customer.customerId}>
                    <Card className='m-3' bg='light'>
                        <Card.Header className='px-3 py-2' as='h5'>CID: {customer.customerId}</Card.Header>
                        <Card.Title className='px-3 py-2'>Name: {`${customer.firstName}  ${customer.lastName}`}</Card.Title>

                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>D.O.B: {customer.dob}</ListGroup.Item>
                            <ListGroup.Item>Mobile:  {customer.mobileNumber}</ListGroup.Item>
                            <ListGroup.Item>Residential Address: {customer.residentialLine1 + '\n' + customer.residentialLine2 + '\n' + customer.residentialState + ' ' + customer.residentialPincode}</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer className='w-100 px-3 d-flex justify-content-center'>
                            <Button variant='info' className='w-50' onClick={() => navigate('/admin/customer/' + customer.customerId)}>More Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                    )}
                )}
                
        </Row>
        )
    }

    const myFilter = (q) => {
        setCust(
            ()=>{
                let newCust = allCust.filter((ele)=>{
                    console.log(ele);
                    return ele.customerId.startsWith(q);
                });
                return newCust;
            }
        )
    }

  return (<>
    <h1 className='text-center'>Admin Dashboard</h1>
    <Row lg={4} mx={1}>
    <CustomCard title="Accounts" desc="This is list of all customers accounts" 
                url="/admin/accounts/" url_title="Accounts"/>
    <CustomCard title="All" desc="This is list of all customers who have applied" 
                url="/admin/all/" url_title="Customers"/>
    <CustomCard title="Approved" desc="This is list of all approved customers" 
                url="/admin/approved/" url_title="Approved"/>
    <CustomCard title="Pending" desc="This is list of all unapproved customers" 
                url="/admin/pending/" url_title="Pending"/>
    </Row>
    <Form className="akFilter">
        <Form.Group>
            <Form.Label>Search Customers</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Enter Customer Id'
                onChange={(e) => myFilter(e.target.value)}
            />
        </Form.Group>
    </Form>
    <h3 className='text-center'>{main_props.heading}</h3>
    <CustomerRow/>
    <AccountRow/>
    </>
  )
}
