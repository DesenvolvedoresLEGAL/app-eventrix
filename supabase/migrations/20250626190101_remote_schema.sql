SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
COMMENT ON SCHEMA "public" IS 'standard public schema';
CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
CREATE TYPE "public"."event_category_enum" AS ENUM (
    'conferencia',
    'workshop',
    'seminario',
    'feira/exposicao',
    'festival',
    'congresso',
    'treinamento',
    'lancamento de produto',
    'networking',
    'webinar',
    'outro'
);
ALTER TYPE "public"."event_category_enum" OWNER TO "postgres";
CREATE TYPE "public"."event_status_enum" AS ENUM (
    'upcoming',
    'in_progress',
    'completed'
);
ALTER TYPE "public"."event_status_enum" OWNER TO "postgres";
CREATE TYPE "public"."font_style_enum" AS ENUM (
    'sans-serif',
    'roboto',
    'montserrat',
    'open_sans',
    'lato',
    'nunito',
    'serif',
    'script',
    'monospace'
);
ALTER TYPE "public"."font_style_enum" OWNER TO "postgres";
CREATE TYPE "public"."staff_status_enum" AS ENUM (
    'Ativo',
    'Inativo',
    'Suspenso'
);
ALTER TYPE "public"."staff_status_enum" OWNER TO "postgres";
CREATE TYPE "public"."user_role" AS ENUM (
    'admin',
    'organizer',
    'exhibitors',
    'staff'
);
ALTER TYPE "public"."user_role" OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  result boolean;
BEGIN
  SET search_path = 'public';
  SELECT user_role = 'admin'
    INTO result
    FROM public.profiles
    WHERE auth_user_id = auth.uid();

  RETURN COALESCE(result, false);
END;
$$;
ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "public"."is_organizer"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  result boolean;
BEGIN
  SET search_path = 'public';
  SELECT user_role = 'organizer'
    INTO result
    FROM public.profiles
    WHERE auth_user_id = auth.uid();

  RETURN COALESCE(result, false);
END;
$$;
ALTER FUNCTION "public"."is_organizer"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";
SET default_tablespace = '';
SET default_table_access_method = "heap";
CREATE TABLE IF NOT EXISTS "public"."event_organizers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" "text" NOT NULL,
    "main_email" "text" NOT NULL,
    "phone_whatsapp" "text",
    "company" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "tenant_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);
ALTER TABLE "public"."event_organizers" OWNER TO "postgres";
CREATE TABLE IF NOT EXISTS "public"."event_team" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "role" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "department" "text",
    "phone" "text",
    "permissions" "text"[] DEFAULT '{}'::"text"[],
    "status" "public"."staff_status_enum" DEFAULT 'Ativo'::"public"."staff_status_enum",
    "tenant_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);
ALTER TABLE "public"."event_team" OWNER TO "postgres";
COMMENT ON COLUMN "public"."event_team"."department" IS 'Departamento do membro da equipe';
COMMENT ON COLUMN "public"."event_team"."phone" IS 'Telefone de contato do membro da equipe';
COMMENT ON COLUMN "public"."event_team"."permissions" IS 'Array de permissões do membro da equipe';
COMMENT ON COLUMN "public"."event_team"."status" IS 'Status atual do membro da equipe';
CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "start_date" "date",
    "end_date" "date",
    "start_time" time without time zone,
    "end_time" time without time zone,
    "official_website" "text",
    "full_address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "venue_name" "text",
    "total_area" numeric,
    "estimated_capacity" integer,
    "has_accessibility" boolean DEFAULT false,
    "logo_url" "text",
    "banner_url" "text",
    "primary_color" character varying(7),
    "secondary_color" character varying(7),
    "font_style" "public"."font_style_enum",
    "location" "text",
    "status" "public"."event_status_enum" DEFAULT 'upcoming'::"public"."event_status_enum",
    "exhibitors_count" integer DEFAULT 0,
    "short_description" "text",
    "is_public_registration" boolean DEFAULT true,
    "has_online_broadcast" boolean DEFAULT false,
    "broadcast_platform" "text",
    "notes" "text",
    "accepted_privacy_policy" boolean DEFAULT false,
    "accepted_lgpd" boolean DEFAULT false NOT NULL,
    "accepted_eventrix_terms" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "organizer_id" "uuid" NOT NULL,
    "category" "public"."event_category_enum" DEFAULT 'outro'::"public"."event_category_enum" NOT NULL,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "broadcast_platform_required" CHECK ((("has_online_broadcast" = false) OR (("has_online_broadcast" = true) AND ("broadcast_platform" IS NOT NULL) AND ("broadcast_platform" <> ''::"text")))),
    CONSTRAINT "events_estimated_capacity_check" CHECK (("estimated_capacity" > 0)),
    CONSTRAINT "events_exhibitors_count_check" CHECK (("exhibitors_count" >= 0)),
    CONSTRAINT "events_primary_color_check" CHECK ((("primary_color")::"text" ~ '^#[0-9A-Fa-f]{6}$'::"text")),
    CONSTRAINT "events_secondary_color_check" CHECK ((("secondary_color")::"text" ~ '^#[0-9A-Fa-f]{6}$'::"text")),
    CONSTRAINT "events_total_area_check" CHECK (("total_area" > (0)::numeric)),
    CONSTRAINT "valid_date_range" CHECK ((("end_date" IS NULL) OR ("start_date" IS NULL) OR ("end_date" >= "start_date")))
);
ALTER TABLE "public"."events" OWNER TO "postgres";
COMMENT ON COLUMN "public"."events"."category" IS 'Categoria do evento';
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "uuid" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "auth_user_id" "uuid" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "position" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_role" "public"."user_role"
);
ALTER TABLE "public"."profiles" OWNER TO "postgres";
COMMENT ON COLUMN "public"."profiles"."user_role" IS 'Cargo do usuário';
ALTER TABLE ONLY "public"."event_organizers"
    ADD CONSTRAINT "event_organizers_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."event_team"
    ADD CONSTRAINT "event_team_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_auth_user_id_key" UNIQUE ("auth_user_id");
ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");
ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("uuid");
CREATE INDEX "idx_event_organizers_email" ON "public"."event_organizers" USING "btree" ("main_email");
CREATE INDEX "idx_event_team_department" ON "public"."event_team" USING "btree" ("department");
CREATE INDEX "idx_event_team_email" ON "public"."event_team" USING "btree" ("email");
CREATE INDEX "idx_event_team_event_id" ON "public"."event_team" USING "btree" ("event_id");
CREATE INDEX "idx_event_team_status" ON "public"."event_team" USING "btree" ("status");
CREATE INDEX "idx_events_city_state" ON "public"."events" USING "btree" ("city", "state");
CREATE INDEX "idx_events_date_range" ON "public"."events" USING "btree" ("start_date", "end_date");
CREATE INDEX "idx_events_deleted_at" ON "public"."events" USING "btree" ("deleted_at");
CREATE INDEX "idx_events_end_date" ON "public"."events" USING "btree" ("end_date");
CREATE INDEX "idx_events_start_date" ON "public"."events" USING "btree" ("start_date");
CREATE INDEX "idx_events_status" ON "public"."events" USING "btree" ("status");
CREATE INDEX "idx_events_tenant_id" ON "public"."events" USING "btree" ("tenant_id");
CREATE INDEX "idx_events_tenant_not_deleted" ON "public"."events" USING "btree" ("tenant_id", "deleted_at") WHERE ("deleted_at" IS NULL);
CREATE OR REPLACE TRIGGER "update_event_organizers_updated_at" BEFORE UPDATE ON "public"."event_organizers" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();
CREATE OR REPLACE TRIGGER "update_event_team_updated_at" BEFORE UPDATE ON "public"."event_team" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();
CREATE OR REPLACE TRIGGER "update_events_updated_at" BEFORE UPDATE ON "public"."events" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();
ALTER TABLE ONLY "public"."event_team"
    ADD CONSTRAINT "event_team_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "fk_events_organizer_id" FOREIGN KEY ("organizer_id") REFERENCES "public"."event_organizers"("id") ON DELETE RESTRICT;
CREATE POLICY "Enable all access for admin users" ON "public"."event_organizers" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());
CREATE POLICY "Enable all access for admin users" ON "public"."event_team" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());
CREATE POLICY "Enable all access for admin users" ON "public"."events" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());
CREATE POLICY "Enable all access for admin users" ON "public"."profiles" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());
CREATE POLICY "Enable create access for all authenticated users" ON "public"."event_organizers" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable create access for all authenticated users" ON "public"."event_team" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable create access for all authenticated users" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable create access for all users" ON "public"."profiles" FOR INSERT TO "authenticated", "anon" WITH CHECK (true);
CREATE POLICY "Enable read access for all authenticated users" ON "public"."event_organizers" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "Enable users to update their own data only" ON "public"."events" FOR UPDATE TO "authenticated" USING (("public"."is_admin"() OR (( SELECT "auth"."uid"() AS "uid") = "tenant_id")));
CREATE POLICY "Enable users to view their own data only" ON "public"."event_team" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "e"."tenant_id"
   FROM "public"."events" "e"
  WHERE ("e"."id" = "event_team"."event_id"))));
CREATE POLICY "Enable users to view their own data only" ON "public"."events" FOR SELECT TO "authenticated" USING (("public"."is_admin"() OR (( SELECT "auth"."uid"() AS "uid") = "tenant_id")));
CREATE POLICY "Enable users to view their own data only" ON "public"."profiles" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "auth_user_id"));
ALTER TABLE "public"."event_organizers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."event_team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";
GRANT ALL ON FUNCTION "public"."is_organizer"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_organizer"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_organizer"() TO "service_role";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";
GRANT ALL ON TABLE "public"."event_organizers" TO "anon";
GRANT ALL ON TABLE "public"."event_organizers" TO "authenticated";
GRANT ALL ON TABLE "public"."event_organizers" TO "service_role";
GRANT ALL ON TABLE "public"."event_team" TO "anon";
GRANT ALL ON TABLE "public"."event_team" TO "authenticated";
GRANT ALL ON TABLE "public"."event_team" TO "service_role";
GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";
GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";
RESET ALL;
