import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetInvoiceByIdQuery } from '../../lib/redux/quary';
import CheckoutForm from './components/CheckoutForm';
import { ChevronLeft, ShieldCheck, Zap } from 'lucide-react';
import { format } from "date-fns";

/**
 * PaymentPage Component
 * Provides a dedicated shell for the Stripe checkout interaction.
 */
const PaymentPage = () => {
  const { id } = useParams();
  const { data: invoice, isLoading } = useGetInvoiceByIdQuery(id);

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading invoice details...</div>;
  if (!invoice) return <div className="p-8 text-center text-red-500 font-bold">Error: Invoice not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Back Button */}
      <Link 
        to="/dashboard/invoices" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Invoices
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Payment Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Invoice ID</span>
                <span className="text-gray-300 font-mono">#{invoice._id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Period</span>
                <span className="text-gray-300">{format(new Date(invoice.billingPeriodStart), "MMM d")} - {format(new Date(invoice.billingPeriodEnd), "MMM d")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Generation</span>
                <span className="text-gray-300">{invoice.totalEnergyGenerated.toFixed(1)} kWh</span>
              </div>
              <div className="h-px bg-slate-800 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-gray-300 font-bold">Total Due</span>
                <span className="text-3xl font-black text-white">${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-3">
            <ShieldCheck className="text-blue-500 w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-blue-100">PCI Compliant Payment</p>
              <p className="text-xs text-blue-100/60 mt-1">Your payment information is handled securely by Stripe. SanSolar never stores your card details.</p>
            </div>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex items-start gap-3">
            <Zap className="text-yellow-500 w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Instant Activation</p>
              <p className="text-xs text-gray-500 mt-1">Once paid, your monitoring services will remain active without interruption.</p>
            </div>
          </div>
        </div>

        {/* Right: Stripe Component */}
        <div className="lg:col-span-2">
          <CheckoutForm invoiceId={id} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
