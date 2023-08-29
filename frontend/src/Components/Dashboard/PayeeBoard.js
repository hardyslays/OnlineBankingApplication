import React, {useState, useEffect} from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBCardFooter, MDBModal, MDBModalTitle, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { Container, Form, Toast } from "react-bootstrap";
import { getPayees, postAddPayee } from "../../Services/Api";
import { SERVER_URL } from "../../Utils/url";
import Auth from "../../Services/Auth";
import avatarImg from '../../assets/default-avatar.png'

const AddPayeeModal = ({updatePayee}) => {

    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({});
    const [err, setErr] = useState({});


    const changeVisibility = () => setVisible(!visible)
    const setField = (field, value) => setForm({...form, [field]:value})
    const clearField = () => setForm({'name': '', 'acNumber': '', 'nickname':''})

    const isValid = (form) => {
        setErr({})

        if(!form.name){
            setErr({...err, 'name': 'Name is required'})
            return 0;
        }
        if(form.acNumber.length !== 14){
            setErr({...err, 'acNumber': 'Account Number must be 14 digits'})
            return 0;
        }        

        return 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isValid(form))return;
        console.log(form)
        
        const formData = {
            'beneficiaryName': form.name,
            'beneficiaryAccountNumber': form.acNumber,
            'beneficiaryNickName': form.nickname
        }

        postAddPayee(formData)
        .then(res => {
            if(!res.ok){
                return res.text()
                .then(data => {
                    console.log(data)
                    throw new Error(data)
                })
            }
            else{
                const data = res.json()
                console.log('resp: ', data)
                clearField()
                setVisible(false)
                updatePayee()
            }
        })
        .catch(err => {
            console.log(err)
            window.alert(`Server error while adding Payee details:\n${err.message}`)
        })
    }

    return(
        <>
        <MDBBtn onClick={changeVisibility}>Add New Payee</MDBBtn>

        <MDBModal tabIndex='-1' show={visible} setShow={setVisible}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add A New Payee</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={changeVisibility}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>    

                        <div id='nameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.name)?'':'none'}}>{err.name}</div>
                        <MDBInput className={['mb-4', (!!err.name)?'is-invalid':''].join(' ')} type='text' id='name' label='Payee Name' value={form.name} onChange={e => setField('name', e.target.value)} aria-describedby='nameErr' required/>

                        <div id='acNumberErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.acNumber)?'':'none'}}>{err.acNumber}</div>

                        <MDBInput className={['mb-4', (!!err.acNumber)?'is-invalid':''].join(' ')} type='number' id='acNumber' label='Payee Account Number' value={form.acNumber} onChange={e => setField('acNumber', e.target.value)} required/>
                        

                        <div id='nicknameErr' className='ms-2 mb-2 form-text text-danger' style={{display:(!!err.nickname)?'':'none'}}>{err.nickname}</div>

                        <MDBInput className={['mb-4', (!!err.nickname)?'is-invalid':''].join(' ')} type='text' id='nickname' label='Payee Nickname' value={form.nickname} onChange={e => setField('nickname', e.target.value)}/>

                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn onClick={handleSubmit}>Add Payee</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    )
}

export const PayeeBoard = () => {

    const [payees, setPayees] = useState([])

    useEffect(() => {
        getPayees()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPayees(data)
        })

    },[])

    const updatePayee = () => {

        getPayees()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPayees(data)
        })
    }

    return(
        <Container >

            <MDBCard className=''>
                <MDBCardText className='fs-4 pt-3 ps-5'>Your Payees</MDBCardText>
                <MDBCardBody className='d-flex justify-content-around'>
                {payees.map((payee, i) => {
                    return(
                        <div>
                        <img className='shadow-4'
                        src={avatarImg}
                        alt='avatar'
                        style={{width: '80px'}}
                        />
                        <p className='fs-6 text-center'>{payee.beneficiaryName}</p>
                        </div>
                    )
                })}
                {(payees.length === 0) 
                && 
                <div className="text-secondary mb-2">
                    You have no Beneficiaries right now.
                </div>} 
                </MDBCardBody>
                
                <MDBCardFooter className='d-flex justify-content-center'>
                    <AddPayeeModal updatePayee={updatePayee}/>
                </MDBCardFooter>
            </MDBCard>
        </Container>
    )
}