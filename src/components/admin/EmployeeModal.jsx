import React, { useState, useEffect } from 'react';
import { X, Save, User, MapPin, Briefcase, Lock, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_STATE = {
    idCard: '', firstName: '', middleName: '', lastName: '', secondLastName: '',
    mobilePhone: '', address: '', email: '', birthDate: '',
    genderId: 1, maritalStatusId: 1, branchId: 1,
    title: '', salary: 460.00, password: '', roleId: 2, isActive: true
};

export default function EmployeeModal({ isOpen, onClose, onSave, employeeToEdit }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (employeeToEdit) {
        setFormData({
            ...INITIAL_STATE, 
            ...employeeToEdit, 
            password: ''
        });
        } else {
        setFormData(INITIAL_STATE);
        }
    }, [employeeToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Manejo inteligente de tipos
        let finalValue = value;
        if (['genderId', 'maritalStatusId', 'branchId', 'roleId', 'salary', 'serial'].includes(name)) {
            finalValue = Number(value);
        }
        if (type === 'checkbox') finalValue = checked;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSave(formData);
        setLoading(false);
    };

    if (!isOpen) return null;

    const isEditMode = !!employeeToEdit;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
            {/* Header Dinámico */}
            <div className={`flex justify-between items-center p-6 border-b border-gray-100 text-white ${isEditMode ? 'bg-[#D4AF37]' : 'bg-[#1a3c1d]'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
                {isEditMode ? <Edit size={24} /> : <User size={24} />}
                {isEditMode ? 'Editar Colaborador' : 'Nuevo Colaborador'}
            </h2>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={20} />
            </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* ... (Tus inputs de Información Personal igual que antes) ... */}
            <div>
                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-100 pb-2">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Agregamos value={formData.xxx} a todos */}
                <InputGroup label="Cédula" name="idCard" val={formData.idCard} onChange={handleChange} required disabled={isEditMode} /> {/* Cédula no editable */}
                <InputGroup label="Primer Nombre" name="firstName" val={formData.firstName} onChange={handleChange} required />
                <InputGroup label="Segundo Nombre" name="middleName" val={formData.middleName} onChange={handleChange} />
                <InputGroup label="Primer Apellido" name="lastName" val={formData.lastName} onChange={handleChange} required />
                <InputGroup label="Segundo Apellido" name="secondLastName" val={formData.secondLastName} onChange={handleChange} />
                {/* Formatear fecha para el input date (YYYY-MM-DD) */}
                <InputGroup label="Fecha Nacimiento" name="birthDate" type="date" val={formData.birthDate?.split('T')[0]} onChange={handleChange} required />
                </div>
            </div>

            {/* ... (Sección Contacto igual) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-100 pb-2">Contacto</h3>
                    <div className="space-y-4">
                        <InputGroup label="Email Corporativo" name="email" type="email" val={formData.email} onChange={handleChange} icon={Briefcase} />
                        <InputGroup label="Celular" name="mobilePhone" val={formData.mobilePhone} onChange={handleChange} required />
                        <InputGroup label="Dirección" name="address" val={formData.address} onChange={handleChange} icon={MapPin} />
                    </div>
                </div>
                <div>
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-100 pb-2">Detalles</h3>
                    <div className="space-y-4">
                        <SelectGroup label="Género" name="genderId" val={formData.genderId} onChange={handleChange} options={[{id:1, label:'Masculino'}, {id:2, label:'Femenino'}]} />
                        <SelectGroup label="Estado Civil" name="maritalStatusId" val={formData.maritalStatusId} onChange={handleChange} options={[{id:1, label:'Soltero'}, {id:2, label:'Casado'}, {id:3, label:'Divorciado'}]} />
                        
                        {/* Checkbox Activo (Solo visible en edición) */}
                        {isEditMode && (
                            <div className="flex items-center gap-2 mt-6">
                                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 text-[#2E5C31] rounded focus:ring-[#2E5C31]" />
                                <label className="text-sm font-bold text-gray-700">Empleado Activo</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sección 3: Contrato y Acceso */}
            <div>
                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-100 pb-2">Contrato y Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <SelectGroup label="Sucursal" name="branchId" val={formData.branchId} onChange={handleChange} options={[{id:1, label:'Matriz Ambato'}]} />
                    <SelectGroup label="Rol de Sistema" name="roleId" val={formData.roleId} onChange={handleChange} options={[{id:1, label:'Administrador'}, {id:2, label:'Cajero'}]} />
                    <InputGroup label="Cargo / Título" name="title" val={formData.title} onChange={handleChange} />
                    <InputGroup label="Salario ($)" name="salary" type="number" val={formData.salary} onChange={handleChange} />
                    
                    {/* Contraseña: En edición es opcional */}
                    {!isEditMode && (
                        <div className="md:col-span-2">
                            <InputGroup label="Contraseña Inicial" name="password" type="password" val={formData.password} onChange={handleChange} required icon={Lock} />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors font-medium">Cancelar</button>
                <button type="submit" disabled={loading} className={`px-6 py-2 rounded-lg text-white transition-colors font-bold flex items-center gap-2 shadow-lg ${isEditMode ? 'bg-[#D4AF37] hover:bg-[#b8962e]' : 'bg-[#2E5C31] hover:bg-[#1a3c1d]'}`}>
                    {loading ? 'Procesando...' : <><Save size={18} /> {isEditMode ? 'Actualizar' : 'Guardar'}</>}
                </button>
            </div>

            </form>
        </motion.div>
        </div>
    );
}

// Helpers (Mantenlos igual que antes)
const InputGroup = ({ label, name, type = "text", val, onChange, required, disabled, icon: Icon, placeholder }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600 uppercase">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={16} />}
            <input 
                type={type} name={name} value={val} onChange={onChange} required={required} disabled={disabled} placeholder={placeholder}
                className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white disabled:bg-gray-200 disabled:text-gray-500`}
            />
        </div>
    </div>
);

const SelectGroup = ({ label, name, val, onChange, options }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600 uppercase">{label}</label>
        <select name={name} value={val} onChange={onChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] outline-none transition-all bg-white cursor-pointer">
            {options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
        </select>
    </div>
);