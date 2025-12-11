import React, { useState, useEffect } from 'react';
import { X, Save, User, MapPin, Phone, Mail, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_STATE = {
    IdCard: "", FirstName: "", MiddleName: null, LastName: "",
    SecondLastName: null, MobilePhone: "", Address: "",
    Email: null, BirthDate: null, GenderId: null, MaritalStatusId: null,
    Ruc: null, CompanyName: null, CreditLimit: null, DiscountRate: null
};

export default function CreateClientModal({ isOpen, onClose, onSave, initialId }) {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [showExtras, setShowExtras] = useState(false);

    useEffect(() => {
        if (isOpen && initialId) {
            setFormData(prev => ({ ...prev, IdCard: initialId }));
        }
    }, [isOpen, initialId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === "" ? null : value // si está vacío → null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSave(formData);
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 bg-[#1a3c1d] text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <User size={20} className="text-[#D4AF37]" /> Registro Rápido de Cliente
                    </h2>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* 📌 SECCIÓN A: LO ESENCIAL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <InputGroup label="Cédula / ID" name="IdCard" val={formData.IdCard} required disabled icon={User} onChange={handleChange} />

                        <InputGroup label="Celular" name="MobilePhone" val={formData.MobilePhone} required icon={Phone} onChange={handleChange} />

                        <InputGroup label="Primer Nombre" name="FirstName" val={formData.FirstName} required onChange={handleChange} />

                        <InputGroup label="Primer Apellido" name="LastName" val={formData.LastName} required onChange={handleChange} />

                        <div className="md:col-span-2">
                            <InputGroup label="Dirección" name="Address" val={formData.Address} required icon={MapPin} onChange={handleChange} />
                        </div>

                        <div className="md:col-span-2">
                            <InputGroup label="Email (Factura electrónica)" name="Email" type="email" val={formData.Email || ""} icon={Mail} onChange={handleChange} />
                        </div>

                    </div>

                    {/* 🔽 BOTÓN PARA MOSTRAR EXTRAS */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold"
                        onClick={() => setShowExtras(!showExtras)}
                    >
                        Agregar RUC / Datos Extra
                        {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* 📌 SECCIÓN B: OPCIONALES */}
                    {showExtras && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">

                            <InputGroup label="Segundo Nombre" name="MiddleName" val={formData.MiddleName || ""} onChange={handleChange} />

                            <InputGroup label="Segundo Apellido" name="SecondLastName" val={formData.SecondLastName || ""} onChange={handleChange} />

                            <InputGroup label="RUC" name="Ruc" val={formData.Ruc || ""} icon={Building} onChange={handleChange} />

                            <InputGroup label="Razón Social" name="CompanyName" val={formData.CompanyName || ""} onChange={handleChange} />

                        </div>
                    )}

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 font-medium">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="px-6 py-2.5 rounded-xl bg-[#2E5C31] hover:bg-[#1a3c1d] text-white font-bold shadow-lg flex items-center gap-2"
                        >
                            {loading ? 'Guardando...' : <><Save size={18} /> Registrar y Usar</>}
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
}

const InputGroup = ({ label, name, type = "text", val, onChange, required, disabled, icon: Icon }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={16} />}
            <input
                type={type}
                name={name}
                value={val ?? ""}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full ${Icon ? 'pl-9' : 'px-3'} py-2.5 rounded-lg border border-gray-300 
                            bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#2E5C31] outline-none text-sm`}
            />
        </div>
    </div>
);
