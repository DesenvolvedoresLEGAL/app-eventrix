import React from 'react';
import { BrazilianState } from '../types/types';
import useBrazilianStates from '../hooks/useBrazilianStates';

    const CompanyBasicInfo = () => {

        const [states, setStates] = React.useState<BrazilianState[]>();
        const { getStatesList } = useBrazilianStates();

        React.useEffect(() => {
            const fetchStates = async () => {
                const statesList = await getStatesList();
                setStates(statesList);
            };

            fetchStates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const handlePrev = () => {

        }

        const handleNext = () => {
            // Handle the next step in the registration process
        }

        return (
            <div className="flex flex-row items-center justify-center bg-muted">
                <form onSubmit={handleNext} className='flex flex-col space-y-4 p-6 bg-white rounded shadow-md'>
                    <div className='flex flex-row mb-4 justify-between'>
                        <label htmlFor="razao-social" className='mr-3'>Razão social:</label>
                        <input type="text" id="razao-social" name="razao-social" required />
                    </div>

                    <div className='flex flex-row mb-4 justify-between'>
                        <label htmlFor="nome-fantasia" className='mr-3'>Nome fantasia:</label>
                        <input type="text" id="nome-fantasia" name="nome-fantasia" />
                    </div>

                    <div className='flex flex-row mb-4 justify-between'>
                        <label htmlFor="cnpj" className='mr-3'>CNPJ:</label>
                        <input type="text" id="cnpj" name="cnpj" required pattern='[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}'/>
                    </div>

                    <div className='flex flex-row mb-4 justify-between'>
                        <select name="estado" id="estado" className='w-full p-2 border border-gray-300 rounded-lg' required>
                            <option value="">Selecione o estado</option>
                            {states.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handlePrev}>Anterior</button>
                    <button type="submit">Próximo</button>
                </form>
            </div>
        )
    }

    export default CompanyBasicInfo;