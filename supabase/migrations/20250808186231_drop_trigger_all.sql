BEGIN;

DROP TRIGGER trigger_brazilian_states_updated_at ON public.brazilian_states;     
DROP TRIGGER trigger_business_segments_updated_at ON public.business_segments;   
DROP TRIGGER trigger_organizer_types_updated_at ON public.organizer_types;       
DROP TRIGGER trigger_profiles_updated_at ON public.profiles;                     
DROP TRIGGER trigger_subscription_plans_updated_at ON public.subscription_plans; 
DROP TRIGGER trigger_audit_tenant_documents ON public.tenant_documents;          
DROP TRIGGER trigger_tenant_documents_updated_at ON public.tenant_documents;     
DROP TRIGGER trigger_audit_tenant_settings ON public.tenant_settings;            
DROP TRIGGER trigger_tenant_settings_updated_at ON public.tenant_settings;       
DROP TRIGGER trigger_tenant_statuses_updated_at ON public.tenant_statuses;       
DROP TRIGGER trg_set_owner ON public.tenants;                                    
DROP TRIGGER trigger_audit_tenants ON public.tenants;                            
DROP TRIGGER trigger_put_tenant_id_in_user_by_created_by ON public.tenants;      
DROP TRIGGER trigger_tenants_plan_cache_update ON public.tenants;                
DROP TRIGGER trigger_tenants_updated_at ON public.tenants;                       

COMMIT;