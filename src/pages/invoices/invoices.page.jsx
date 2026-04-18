
import React, { useState } from "react";
import { useGetInvoicesQuery } from "../../lib/redux/quary";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { generateInvoicePDF } from "../../utils/pdf-generator";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  ChevronRight,
  Download,
  CreditCard
} from "lucide-react";

/**
 * InvoicesPage Component
 * Purpose: Provides a comprehensive dashboard for users to view, filter, and pay their solar service invoices.
 */
const InvoicesPage = () => {
  const { data: invoices, isLoading, error } = useGetInvoicesQuery();
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Filtering logic for the UI
  const filteredInvoices = invoices?.filter(invoice => 
    statusFilter === "ALL" ? true : invoice.paymentStatus === statusFilter
  );

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading your billing history...</div>;
  if (error) return <div className="p-8 text-center text-red-400">Error loading invoices. Please try again later.</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Billing & Invoices</h1>
          <p className="text-gray-400 mt-1">Manage your solar platform service payments and history.</p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          {["ALL", "PENDING", "PAID", "FAILED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === status 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices?.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
            <div className="bg-slate-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">No invoices found</h3>
            <p className="text-gray-400 mt-2">You don't have any invoices matching the selected filter.</p>
          </div>
        ) : (
          filteredInvoices?.map((invoice) => (
            <div 
              key={invoice._id}
              className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 md:p-6 transition-all group overflow-hidden relative"
            >
              {/* Subtle background glow for pending items */}
              {invoice.paymentStatus === "PENDING" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: Invoice Info */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-slate-800/50 ${
                    invoice.paymentStatus === "PAID" ? "text-green-500" : 
                    invoice.paymentStatus === "PENDING" ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {invoice.paymentStatus === "PAID" ? <CheckCircle className="w-6 h-6" /> : 
                     invoice.paymentStatus === "PENDING" ? <Clock className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">Invoice #{invoice._id.slice(-6).toUpperCase()}</span>
                      {invoice.paymentStatus === "PENDING" && (
                        <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-500/20 uppercase tracking-wider animate-pulse">
                          Due Soon
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {invoice.solarUnitId?.serialNumber || "Solar Unit"}
                      </span>
                      <span>•</span>
                      <span>{format(new Date(invoice.billingPeriodStart), "MMM d")} - {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>

                {/* Center: Usage Stats */}
                <div className="hidden lg:flex flex-col items-center">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">monitored production</span>
                  <span className="text-white font-medium text-lg mt-1">{invoice.totalEnergyGenerated.toFixed(2)} kWh</span>
                </div>

                {/* Right: Amount and Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block">Estimated Cost</span>
                    <span className="text-2xl font-black text-white">
                      {/* Note: In a real app we'd fetch the exact cost from Stripe, 
                          but for this UI we simulate the expected cost per Guide ($0.05/unit) */}
                      ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
                    </span>
                  </div>

                  {invoice.paymentStatus === "PENDING" ? (
                    <Link 
                      to={`/dashboard/invoices/${invoice._id}/pay`}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 group"
                    >
                      <CreditCard className="w-4 h-4 group-hover:animate-bounce" />
                      Pay Now
                    </Link>
                  ) : (
                    <button 
                      onClick={() => generateInvoicePDF(invoice)}
                      className="p-3 bg-slate-800/50 text-gray-400 hover:text-white rounded-xl transition-colors border border-transparent hover:border-slate-700 active:scale-90"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl gap-4">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Payments are processed securely via Stripe. Invoicing occurs every 30 days from your installation date.</span>
        </div>
        <Link to="/support" className="text-blue-500 hover:text-blue-400 text-sm font-medium">Need billing support?</Link>
      </div>
    </div>
  );
};

export default InvoicesPage;
