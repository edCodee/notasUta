import React, { useState, useEffect } from 'react';
import { X, Save, Package, Tag, DollarSign, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_STATE = {
    id: 0,
    code: '', name: '', description: '',
    unitPrice: 0, stockQuantity: 0,
    categoryId: 1, taxId: 2, 
    isDeductible: false, deductibleType: ''
};

const CATEGORIES = [
    { id: 1, name: 'Bebidas' },
    { id: 2, name: 'Snacks' }, 
    { id: 3, name: 'Carnes' }, 
    { id: 4, name: 'Panadería' }
];

const TAXES = [
    { id: 1, name: 'IVA 0%', rate: 0 },
    { id: 2, name: 'IVA 15%', rate: 15 }
];

const DEDUCTIBLES = ['Alimentacion', 'Salud', 'Vivienda', 'Vestimenta', 'Educacion'];

export default function ProductModal({ isOpen, onClose, onSave, productToEdit }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (productToEdit) {
            const foundCategory = CATEGORIES.find(c => c.name === productToEdit.category);
            
            const foundTax = TAXES.find(t => t.rate === productToEdit.taxRate);

            setFormData({
                ...INITIAL_STATE, 
                ...productToEdit,
                
                id: productToEdit.id, 
                stockQuantity: productToEdit.stock, 
                categoryId: foundCategory ? foundCategory.id : 1, 
                taxId: foundTax ? foundTax.id : 2, 
                
                description: productToEdit.description || '',
                deductibleType: productToEdit.deductibleType || ''
            });
        } else {
            setFormData(INITIAL_STATE);
        }
    }, [productToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = value;

        if (['unitPrice', 'stockQuantity', 'categoryId', 'taxId'].includes(name)) {
            finalValue = Number(value);
        }
        if (type === 'checkbox') finalValue = checked;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const payload = { 
            ...formData, 
            deductibleType: formData.isDeductible ? formData.deductibleType : null 
        };
        
        await onSave(payload);
        setLoading(false);
    };

    if (!isOpen) return null;
    const isEdit = !!productToEdit;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
            <div className={`flex justify-between items-center p-6 border-b border-gray-100 text-white ${isEdit ? 'bg-[#D4AF37]' : 'bg-[#1a3c1d]'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
                {isEdit ? <Tag size={24} /> : <Package size={24} />}
                {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Código" name="code" val={formData.code} onChange={handleChange} required icon={Tag} placeholder="Ej: KO-2L" />
                    <InputGroup label="Nombre" name="name" val={formData.name} onChange={handleChange} required icon={Package} />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Descripción</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] outline-none bg-gray-50 focus:bg-white resize-none" placeholder="Detalles..." />
                </div>

                <div>
                    <h3 className="text-[#D4AF37] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-100 pb-2">Inventario</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Precio ($)" name="unitPrice" type="number" val={formData.unitPrice} onChange={handleChange} required icon={DollarSign} />
                        <InputGroup label="Stock" name="stockQuantity" type="number" val={formData.stockQuantity} onChange={handleChange} required icon={Layers} />
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-600 uppercase">Categoría</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] outline-none bg-white">
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600 uppercase">Impuesto (IVA)</label>
                        <select name="taxId" value={formData.taxId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] outline-none bg-white">
                            {TAXES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" name="isDeductible" checked={formData.isDeductible} onChange={handleChange} className="w-5 h-5 text-[#2E5C31] rounded focus:ring-[#2E5C31]" />
                            <label className="text-sm font-bold text-gray-700">Deducible (SRI)</label>
                        </div>
                        {formData.isDeductible && (
                            <select name="deductibleType" value={formData.deductibleType} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm">
                                <option value="">Tipo...</option>
                                {DEDUCTIBLES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium">Cancelar</button>
                    <button type="submit" disabled={loading} className={`px-6 py-2 rounded-lg text-white font-bold flex items-center gap-2 shadow-lg ${isEdit ? 'bg-[#D4AF37] hover:bg-[#b8962e]' : 'bg-[#2E5C31] hover:bg-[#1a3c1d]'}`}>
                        {loading ? 'Guardando...' : <><Save size={18} /> {isEdit ? 'Actualizar' : 'Guardar'}</>}
                    </button>
                </div>
            </form>
        </motion.div>
        </div>
    );
}

const InputGroup = ({ label, name, type = "text", val, onChange, required, icon: Icon, placeholder }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600 uppercase">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={16} />}
            <input type={type} name={name} value={val} onChange={onChange} required={required} placeholder={placeholder} className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5C31] outline-none transition-all bg-gray-50 focus:bg-white`} />
        </div>
    </div>
);