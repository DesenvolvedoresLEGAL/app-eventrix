import supabase from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface TenantRegistryData {
    slug: string;
    cnpj: string;
    razao_social: string;
    nome_fantasia: string;
    contact_email: string;
    contact_phone: string;
    organizer_type_code: number;
    segment_code: number;
    state_code: string;
    plan_code: "start";
}

export default function TenantRegisterExample({ onSuccess }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [form, setForm] = useState({} as TenantRegistryData);
    const [registeredSlugs, setRegisteredSlugs] = useState<string[]>([]);
    const [organizerTypes, setOrganizerTypes] = useState([]);
    const [segments, setSegments] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchTenantData() {
        const { data, error } = await supabase
            .from("tenants")
            .select("slug");
        if (error) {
            if (import.meta.env.DEV) console.error("Error fetching registered slugs:", error);
            return;
        }
        setRegisteredSlugs(data.map((tenant) => tenant.slug));
    }

    // Carregar selects dinâmicos do banco
    useEffect(() => {
        async function fetchOptions() {
            const [org, seg, st] = await Promise.all([
                supabase.from("organizer_types").select("code, name").eq("is_active", true).order("sort_order"),
                supabase.from("business_segments").select("code, name").eq("is_active", true).order("sort_order"),
                supabase.from("brazilian_states").select("code, name").eq("is_active", true).order("name"),
            ]);
            setOrganizerTypes(org.data ?? []);
            setSegments(seg.data ?? []);
            setStates(st.data ?? []);
        }
        fetchOptions();
    }, []);

    // Handler de mudança
    function handleChange(e) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    // Submit handler
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // RPC para função SQL
        const { data, error: rpcError } = await supabase.rpc("create_new_tenant", {
            p_slug: genSlug(form.razao_social),
            p_cnpj: form.cnpj,
            p_razao_social: form.razao_social,
            p_nome_fantasia: form.nome_fantasia,
            p_contact_email: form.contact_email,
            p_organizer_type_code: form.organizer_type_code,
            p_segment_code: form.segment_code,
            p_state_code: form.state_code,
            p_plan_code: form.plan_code,
        });

        setLoading(false);

        if (rpcError) {
            setError(rpcError.message || "Erro ao criar tenant.");
            return;
        }
        if (onSuccess) onSuccess(data);
        // Pode redirecionar para próxima etapa ou mostrar feedback
        alert("Empresa criada com sucesso!");
    }

    function genSlug(razaoSocial) {
        return razaoSocial
            .toLowerCase()
            .normalize('NFD')                      // Remove acentos
            .replace(/[\u0300-\u036f]/g, '')       // Remove diacríticos
            .replace(/[^a-z0-9\s-]/g, '')          // Remove tudo exceto letras, números, espaço e hífen
            .trim()
            .replace(/[\s_-]+/g, '-')              // Troca espaços, underscores e múltiplos hífens por um hífen só
            .replace(/^-+|-+$/g, '');              // Remove hífens no início/fim
    }

    function nextStep() {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    }

    function prevStep() {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    }

    function handleLoadTennants() {
        fetchTenantData();
    }

    function renderStep() {
        switch (currentStep) {
            case 1:
                return (
                    <form className="flex w-full flex-col gap-5 max-w-lg mx-auto p-6 bg-white rounded-2xl shadow" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Cadastro da Empresa</h2>
                        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">CNPJ</label>
                            <input name="cnpj" required maxLength={18} value={form.cnpj}
                                onChange={handleChange} className="input w-full border-b-2 border-b-gray-500" placeholder="00.000.000/0000-00" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Razão Social</label>
                            <input name="razao_social" required maxLength={200} value={form.razao_social}
                                onChange={handleChange} className="input w-full border-b-2 border-b-gray-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Nome Fantasia</label>
                            <input name="nome_fantasia" required maxLength={100} value={form.nome_fantasia}
                                onChange={handleChange} className="input w-full border-b-2 border-b-gray-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">E-mail de contato</label>
                            <input type="email" name="contact_email" required maxLength={255} value={form.contact_email}
                                onChange={handleChange} className="input w-full border-b-2 border-b-gray-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Tipo de Organizador</label>
                            <select name="organizer_type_code" required value={form.organizer_type_code} onChange={handleChange} className="input w-full border-b-2 border-b-gray-500">
                                <option value="">Selecione</option>
                                {organizerTypes.map((t) => (
                                    <option key={t.code} value={t.code}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Segmento de Atuação</label>
                            <select name="segment_code" required value={form.segment_code} onChange={handleChange} className="input w-full border-b-2 border-b-gray-500">
                                <option value="">Selecione</option>
                                {segments.map((s) => (
                                    <option key={s.code} value={s.code}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Estado</label>
                            <select name="state_code" required value={form.state_code} onChange={handleChange} className="input w-full border-b-2 border-b-gray-500">
                                <option value="">Selecione</option>
                                {states.map((st) => (
                                    <option key={st.code} value={st.code}>{st.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Plano fixo no MVP, pode ser escondido */}
                        <input type="hidden" name="plan_code" value="start" />

                                
                    <button
                        onClick={() => nextStep()}
                        disabled={loading}
                        className="w-full bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    >
                        Próximo
                    </button>
                    </form>
                );
                break;
            case 2:
                return (
                    <div className="flex flex-row gap-4 items-center justify-between h-screen max-w-full">
                    <button
                        onClick={() => prevStep()}
                        disabled={loading}
                        className="bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => nextStep()}
                        disabled={loading}
                        className="bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    >
                        Próximo
                    </button>
                    </div>
                );
                break;

            case 3:
                return (
                    
                    <div className="flex flex-row gap-4 items-center justify-between h-screen max-w-full">
                    <button
                        onClick={() => prevStep()}
                        disabled={loading}
                        className="bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    >
                        Anterior
                    </button>
                    <button

                        disabled={loading}
                        className="bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    >
                        {loading ? "Cadastrando..." : "Criar Empresa"}
                    </button>
                    </div>
                );
                break;

            default:
                break;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
            <div className="w-full m-4 flex-col text-center items-center justify-center">
                <h1>Tenant Registration Example</h1>
                <p>This is an example page for tenant registration.</p>
            </div>
            {renderStep()}
            <div
                className="w-full mt-2 gap-3 flex flex-col-reverse justify-center items-center"
            >
                <button
                    disabled={loading}
                    className="w-sm m-2 bg-[#4D2BFB] hover:bg-[#020CBC] text-white font-bold py-2 px-4 rounded-2xl transition"
                    onClick={handleLoadTennants}
                >
                    Carregar Tennants Registrados
                </button>
                <ul>
                    {registeredSlugs.map((slug) => (
                        <li key={slug}>
                            <a
                                className="text-blue-500 hover:underline"
                                href={`https://${slug}.eventrix.com/`}
                                target="_blank"
                            >
                                https://{slug}.eventrix.com/
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}