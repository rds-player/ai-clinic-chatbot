'use client';

import { useState } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import { getClinicData } from '@/lib/knowledge-base';

interface BookingFlowProps {
  language: 'pt' | 'en';
  onComplete: () => void;
  onCancel: () => void;
}

export function BookingFlow({ language, onComplete, onCancel }: BookingFlowProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: '',
  });
  const [error, setError] = useState('');

  const clinic = getClinicData();
  const t = language === 'pt' ? {
    title: 'Marcar Consulta',
    name: 'Nome Completo',
    email: 'Email',
    phone: 'Telefone',
    service: 'Serviço',
    selectService: 'Selecione um serviço',
    preferredDate: 'Data Preferencial (opcional)',
    message: 'Mensagem adicional (opcional)',
    submit: 'Enviar Marcação',
    cancel: 'Cancelar',
    submitting: 'A enviar...',
  } : {
    title: 'Book Appointment',
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    service: 'Service',
    selectService: 'Select a service',
    preferredDate: 'Preferred Date (optional)',
    message: 'Additional message (optional)',
    submit: 'Submit Booking',
    cancel: 'Cancel',
    submitting: 'Submitting...',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setError(language === 'pt' ? 'Por favor preencha todos os campos obrigatórios' : 'Please fill all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(language === 'pt' ? 'Por favor insira um email válido' : 'Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      onComplete();
    } catch (err: any) {
      setError(err.message || (language === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error submitting. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary-600" />
        <h3 className="font-bold text-lg text-gray-800">{t.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.name} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="João Silva"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.email} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={language === 'pt' ? 'seuemail@exemplo.com' : 'youremail@example.com'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.phone} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="+351 912 345 678"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.service} *
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">{t.selectService}</option>
            {clinic.services.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name} - {service.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.preferredDate}
          </label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.message}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            placeholder={language === 'pt' ? 'Informações adicionais...' : 'Additional information...'}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
