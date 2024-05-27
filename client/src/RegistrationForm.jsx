import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phonenumber: yup.string().required('Phone number is required'),
    role: yup.string().oneOf(['buyer', 'seller'], 'Invalid role').required('Role is required')
});

const RegistrationForm = ({ onRegister }) => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [page, setPage] = useState(1);

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/api/register', data)
            .then(response => {
                console.log(response.data);
                onRegister(response.data);
                // Handle success
            })
            .catch(error => {
                console.error('Error registering user:', error);
                // Handle error
            });
    };

    const renderPage1 = () => (
        <>
            <div>
                <label>
                    First Name:
                    <Controller
                        name="firstname"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="text" {...field} />}
                    />
                    {errors.firstname && <p>{errors.firstname.message}</p>}
                </label>
            </div>
            <div>
                <label>
                    Last Name:
                    <Controller
                        name="lastname"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="text" {...field} />}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                </label>
            </div>
        </>
    );

    const renderPage2 = () => (
        <>
            <div>
                <label>
                    Email:
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="email" {...field} />}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="password" {...field} />}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </label>
            </div>
        </>
    );

    const renderPage3 = () => (
        <>
            <div>
                <label>
                    Phone Number:
                    <Controller
                        name="phonenumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="text" {...field} />}
                    />
                    {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                </label>
            </div>
            <div>
                <label>
                    Role:
                    <Controller
                        name="role"
                        control={control}
                        defaultValue="buyer"
                        render={({ field }) => (
                            <select {...field}>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        )}
                    />
                    {errors.role && <p>{errors.role.message}</p>}
                </label>
            </div>
        </>
    );

    const handleNext = () => setPage((prev) => prev + 1);
    const handleBack = () => setPage((prev) => prev - 1);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {page === 1 && renderPage1()}
            {page === 2 && renderPage2()}
            {page === 3 && renderPage3()}

            <div>
                {page > 1 && <button type="button" onClick={handleBack}>Back</button>}
                {page < 3 && <button type="button" onClick={handleNext}>Next</button>}
                {page === 3 && <button type="submit">Register</button>}
            </div>
        </form>
    );
};

export default RegistrationForm;
