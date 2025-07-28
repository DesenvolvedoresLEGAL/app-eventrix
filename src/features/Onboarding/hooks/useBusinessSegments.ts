import supabase from "@/utils/supabase/client";
import { BusinessSegment } from "../types/types";

const useBusinessSegments = () => {

    const getBusinessSegments  = async (): Promise<BusinessSegment[]> => {
        try {
            const response = await supabase
            .from('business_segments')
            .select('*');
    
            if (response.error || !response.data) {
                throw new Error('Failed to fetch business segments');
            }

            const mappedSegments = response.data.map(bs => ({
                    code: bs.code,
                    name: bs.name,
                    descriptions: bs.description
            }));

            return mappedSegments;
        } catch (error) {
            return [];
        }
    }

    return { getBusinessSegments };

}

export default useBusinessSegments;