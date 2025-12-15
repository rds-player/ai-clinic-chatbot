'use client';

import { useState } from 'react';
import { Bot, Calendar, Clock, Shield, Globe, Check } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const t = language === 'pt' ? {
    hero: {
      title: 'Chatbot AI para Clínicas',
      subtitle: 'Automatize marcações e suporte ao paciente 24/7',
      cta: 'Ver Demo Abaixo',
    },
    features: {
      title: 'Funcionalidades',
      items: [
        { icon: Bot, title: 'IA Avançada', desc: 'Respostas inteligentes com Groq AI (gratuito)' },
        { icon: Calendar, title: 'Marcações Automáticas', desc: 'Sistema completo de agendamento' },
        { icon: Clock, title: 'Disponível 24/7', desc: 'Sempre disponível para os seus pacientes' },
        { icon: Shield, title: 'Segurança Médica', desc: 'Nunca diagnostica, apenas informa' },
      ],
    },
  } : {
    hero: {
      title: 'AI Chatbot for Clinics',
      subtitle: 'Automate appointments and patient support 24/7',
      cta: 'See Demo Below',
    },
    features: {
      title: 'Features',
      items: [
        { icon: Bot, title: 'Advanced AI', desc: 'Smart responses with Groq AI (free)' },
        { icon: Calendar, title: 'Auto Booking', desc: 'Complete scheduling system' },
        { icon: Clock, title: 'Available 24/7', desc: 'Always available for your patients' },
        { icon: Shield, title: 'Medical Safety', desc: 'Never diagnoses, only informs' },
      ],
    },
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary-600" />
            <span className="font-bold text-xl">HealthCare Clinic AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'pt' ? 'PT' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/chat" className="btn-primary">
              {language === 'pt' ? 'Experimentar Agora' : 'Try It Now'}
            </Link>
            <button
              onClick={() => {
                const demoSection = document.getElementById('demo');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="btn-secondary"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.features.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - What the AI Does */}
      <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {language === 'pt' ? 'Como Funciona o Chatbot AI?' : 'How Does the AI Chatbot Work?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Veja em detalhe o que o nosso assistente virtual pode fazer pela sua clínica'
                : 'See in detail what our virtual assistant can do for your clinic'}
            </p>
          </div>

          {/* Use Cases */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Use Case 1: Answer Questions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {language === 'pt' ? '1. Responde Perguntas' : '1. Answers Questions'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'pt'
                  ? 'O chatbot conhece todos os serviços, preços e horários da clínica'
                  : 'The chatbot knows all clinic services, prices and opening hours'}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-sm text-gray-700 italic">
                  {language === 'pt'
                    ? '"Qual o preço de uma consulta de dermatologia?"'
                    : '"What is the price for a dermatology consultation?"'}
                </p>
                <p className="text-sm text-primary-600 mt-2 font-medium">
                  → {language === 'pt'
                    ? 'Resposta instantânea com preço e duração'
                    : 'Instant reply with price and duration'}
                </p>
              </div>
            </div>

            {/* Use Case 2: Book Appointments */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-primary-200">
              <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {language === 'pt' ? '2. Marca Consultas' : '2. Books Appointments'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'pt'
                  ? 'Recolhe dados do paciente e cria marcação automática'
                  : 'Collects patient data and creates automatic booking'}
              </p>
              <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-500">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  {language === 'pt' ? 'Recolhe:' : 'Collects:'}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ {language === 'pt' ? 'Nome completo' : 'Full name'}</li>
                  <li>✓ {language === 'pt' ? 'Email' : 'Email'}</li>
                  <li>✓ {language === 'pt' ? 'Telefone' : 'Phone'}</li>
                  <li>✓ {language === 'pt' ? 'Serviço desejado' : 'Desired service'}</li>
                  <li>✓ {language === 'pt' ? 'Data preferencial' : 'Preferred date'}</li>
                </ul>
              </div>
            </div>

            {/* Use Case 3: Email Notifications */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {language === 'pt' ? '3. Envia Confirmações' : '3. Sends Confirmations'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'pt'
                  ? 'Emails automáticos para paciente e clínica'
                  : 'Automatic emails to patient and clinic'}
              </p>
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  {language === 'pt' ? 'Emails enviados:' : 'Emails sent:'}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>📧 {language === 'pt' ? 'Confirmação ao paciente' : 'Confirmation to patient'}</li>
                  <li>📧 {language === 'pt' ? 'Notificação à clínica' : 'Notification to clinic'}</li>
                  <li>📧 {language === 'pt' ? 'Lembrete de marcação' : 'Booking reminder'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conversation Flow Example */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              {language === 'pt' ? 'Exemplo de Conversa Real' : 'Real Conversation Example'}
            </h3>

            <div className="max-w-3xl mx-auto space-y-4">
              {/* User Message 1 */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl px-5 py-3 max-w-[80%] shadow-md">
                  <p className="text-sm">
                    {language === 'pt' ? 'Olá, quais são os vossos horários?' : 'Hello, what are your opening hours?'}
                  </p>
                </div>
              </div>

              {/* Bot Response 1 */}
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl px-5 py-3 max-w-[85%] shadow-md border border-gray-200">
                  <p className="text-sm">
                    {language === 'pt'
                      ? 'Olá! Os nossos horários são: Segunda-Sexta: 9h-18h, Sábado: 9h-13h. Como posso ajudar?'
                      : 'Hello! Our hours are: Mon-Fri: 9am-6pm, Saturday: 9am-1pm. How can I help you?'}
                  </p>
                </div>
              </div>

              {/* User Message 2 */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl px-5 py-3 max-w-[80%] shadow-md">
                  <p className="text-sm">
                    {language === 'pt' ? 'Gostaria de marcar uma consulta de dermatologia' : 'I would like to book a dermatology appointment'}
                  </p>
                </div>
              </div>

              {/* Bot Response 2 */}
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl px-5 py-3 max-w-[85%] shadow-md border border-gray-200">
                  <p className="text-sm mb-3">
                    {language === 'pt'
                      ? 'Perfeito! Vou ajudá-lo a marcar uma consulta de dermatologia. Por favor clique no botão abaixo para preencher os seus dados.'
                      : 'Perfect! I will help you book a dermatology appointment. Please click the button below to fill in your details.'}
                  </p>
                  <div className="bg-primary-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium">
                    {language === 'pt' ? '📅 Marcar Consulta' : '📅 Book Appointment'}
                  </div>
                </div>
              </div>

              {/* Success indicator */}
              <div className="flex justify-center">
                <div className="bg-green-50 border-2 border-green-500 text-green-700 rounded-xl px-6 py-3 text-center">
                  <Check className="w-5 h-5 inline mr-2" />
                  <span className="font-semibold text-sm">
                    {language === 'pt'
                      ? 'Marcação criada! Email enviado ao paciente e clínica'
                      : 'Booking created! Email sent to patient and clinic'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              {language === 'pt'
                ? 'Experimente agora! Converse com o nosso assistente virtual'
                : 'Try it now! Chat with our virtual assistant'}
            </p>
            <Link
              href="/chat"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Bot className="w-5 h-5" />
              {language === 'pt' ? 'Abrir Chat' : 'Open Chat'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bot className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <p className="text-gray-400">
            {language === 'pt'
              ? '© 2025 HealthCare Clinic. Todos os direitos reservados.'
              : '© 2025 HealthCare Clinic. All rights reserved.'}
          </p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <Link
        href="/chat"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </Link>
    </main>
  );
}
