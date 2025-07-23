ALTER TABLE "public"."event_organizers" DISABLE ROW LEVEL SECURITY; 
ALTER TABLE "public"."event_team" DISABLE ROW LEVEL SECURITY;       
ALTER TABLE "public"."events" DISABLE ROW LEVEL SECURITY;           
ALTER TABLE "public"."profiles" DISABLE ROW LEVEL SECURITY;         

DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON "public"."event_organizers";   
DROP POLICY IF EXISTS "Enable create access for all authenticated users" ON "public"."event_organizers"; 
DROP POLICY IF EXISTS "Enable all access for admin users" ON "public"."event_organizers";                
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."event_team";               
DROP POLICY IF EXISTS "Enable create access for all authenticated users" ON "public"."event_team";       
DROP POLICY IF EXISTS "Enable all access for admin users" ON "public"."event_team";                      
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."events";                   
DROP POLICY IF EXISTS "Enable users to update their own data only" ON "public"."events";                 
DROP POLICY IF EXISTS "Enable create access for all authenticated users" ON "public"."events";           
DROP POLICY IF EXISTS "Enable all access for admin users" ON "public"."events";                          
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."profiles";                 
DROP POLICY IF EXISTS "Enable create access for all users" ON "public"."profiles";                       
DROP POLICY IF EXISTS "Enable all access for admin users" ON "public"."profiles";                        

DROP TRIGGER IF EXISTS "update_event_organizers_updated_at" ON "public"."event_organizers";
DROP TRIGGER IF EXISTS "update_event_team_updated_at" ON "public"."event_team";            
DROP TRIGGER IF EXISTS "update_events_updated_at" ON "public"."events";                    

DROP FUNCTION IF EXISTS "public"."is_organizer"();            
DROP FUNCTION IF EXISTS "public"."update_updated_at_column"();
DROP FUNCTION IF EXISTS "public"."is_admin"();                

DROP TABLE IF EXISTS "public"."event_organizers" CASCADE;
DROP TABLE IF EXISTS "public"."event_team" CASCADE;      
DROP TABLE IF EXISTS "public"."events" CASCADE;          
DROP TABLE IF EXISTS "public"."profiles" CASCADE;    