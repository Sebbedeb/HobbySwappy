import React, { useState } from 'react';

interface UserSignUpFormProps {
    handleSubmit: (newUser: { userName: string, userPassword: string, userAddress: string, userZip: number }) => void;
}

const UserSignUpForm: React.FC<UserSignUpFormProps> = ({ handleSubmit }) => {
    const [newUser, setNewUser] = useState({
        userName: '',
        userPassword: '',
        userAddress: '',
        userZip: 0
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [zipError, setZipError] = useState<boolean>(true);
    const [passwordError, setPasswordError] = useState<boolean>(true);
    const [addressError, setAddressError] = useState<boolean>(true);
    const [nameError, setNameError] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: name === 'userZip' ? parseInt(value) : value // Convert userZip to number
        }));
    };

    const validateFormData = async () => {
        if ((newUser.userZip.toString().length !== 4) || isNaN(newUser.userZip)) {
            console.log('zip error:'+ newUser.userZip);
            setZipError(true);
            console.log('zip errorState:'+ zipError);
        }
        else {
            setZipError(false);
        }
        if (newUser.userPassword.length < 3) {
            console.log('password error:'+ newUser.userPassword.length);
            setPasswordError(true);
            console.log('password errorState:'+ passwordError);
        }
        else {
            setPasswordError(false);
        }

        if (newUser.userAddress.length < 3) {
            console.log('address error:'+ newUser.userAddress.length);
            setAddressError(true);
            console.log('address errorState:'+ addressError);
        }
        else {
            setAddressError(false);
        }

        if (newUser.userName.length < 3) {
            console.log('name error:'+ newUser.userName.length);
            setNameError(true);
            console.log('name errorState:'+ nameError);
        }
        else {
            setNameError(false);
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        await validateFormData();
        validateFormData();


        if (zipError || passwordError || addressError || nameError) {
            console.log('Error in form');
            setIsSubmitting(false);
            return;
        }

        if (!zipError && !passwordError && !addressError && !nameError) {
            console.log('should all be false: ', zipError, passwordError, addressError, nameError)
             handleSubmit(newUser); 
            }

        setIsSubmitting(false);
    };



    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="userName">Username: </label>
                    <input type="text" id="userName" name="userName" value={newUser.userName} onChange={handleChange} />
                    {nameError && <p>Username must be at least 3 characters</p>}
                </div>
                <div>
                    <label htmlFor="userPassword">Password: </label>
                    <input type="password" id="userPassword" name="userPassword" value={newUser.userPassword} onChange={handleChange} />
                    {passwordError && <p>Password must be at least 3 characters</p>}
                </div>
                <div>
                    <label htmlFor="userAddress">Address: </label>
                    <input type="text" id="userAddress" name="userAddress" value={newUser.userAddress} onChange={handleChange} />
                    {addressError && <p>Address must be at least 3 characters</p>}
                </div>
                <div>
                    <label htmlFor="userZip">Zip: </label>
                    <input type="number" id="userZip" name="userZip" value={newUser.userZip} onChange={handleChange} />
                    {zipError && <p>Zip code must be 4 digits</p>}

                </div>
                <button type="submit" disabled={isSubmitting}>Sign Up</button>
            </form>
        </div>
    );
};

export default UserSignUpForm;
