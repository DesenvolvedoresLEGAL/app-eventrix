import supabase from "@/utils/supabase/client";
import { BrazilianState } from "../types/types";

const useBrazilianStates = () => {

    const getStatesList = async (): Promise<BrazilianState[]> => {
        try {
            const response = await supabase
                .from('brazilian_states')
                .select('*');
            if (response.error || !response.data) {
                throw new Error('Failed to fetch states');
            }

            const mappedStates = response.data.map((state) => ({
                code: state.code,
                name: state.name,
                region: state.region,
                capital: state.capital,
            }));

            return mappedStates;
        } catch (error) {
            return [];
        }

    }

    return {
        getStatesList
    };
}

export default useBrazilianStates;
