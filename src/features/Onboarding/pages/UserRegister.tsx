import React from 'react';

const UserRegister = () => {

    const handleNext = () => {
        // Handle the next step in the registration process
    }

    return (
        <div className="flex flex-row items-center justify-center bg-muted">
            <form onSubmit={handleNext} className='flex flex-col space-y-4 p-6 bg-white rounded shadow-md'>
                <div className='flex flex-row mb-4 justify-between'>
                    <label htmlFor="email" className='mr-3'>Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className='flex flex-row mb-4 justify-between'>
                    <label htmlFor="password" className='mr-3'>Senha:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit">Próximo</button>
            </form>
        </div>
    )
}

export default UserRegister;