import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useGetSessionStatusQuery } from "../../lib/redux/quary";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

/**
 * PaymentCompletePage Component
 * Purpose: Acts as the "Thank You" or "Failure" landing page after a Stripe transaction.
 * Logic: Polls our backend to verify the Stripe transaction state using the session_id.
 */
const PaymentCompletePage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Fetch the final status of this Stripe session from our backend
  const { data, isLoading, error } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-white">Verifying Payment...</h2>
        <p className="text-gray-400 mt-2">Please wait while we confirm your transaction with Stripe.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <XCircle className="w-20 h-20 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
        <p className="text-gray-400 mt-2">We couldn't verify your payment session. Please contact support.</p>
        <Link to="/dashboard/invoices" className="mt-8 text-blue-500 hover:text-blue-400 font-bold flex items-center gap-2">
           Return to Invoices <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isSuccess = data.paymentStatus === "paid";

  return (
    <div className="max-w-xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className={`absolute -top-24 -left-24 w-64 h-64 blur-[100px] rounded-full opacity-20 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`} />

        {isSuccess ? (
          <>
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse" />
              <CheckCircle2 className="w-24 h-24 text-green-500 relative" />
            </div>
            
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Payment Received!</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Thank you for your payment. Your solar monitoring services are fully active.
            </p>

            <div className="bg-slate-800/30 rounded-2xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction Status</span>
                <span className="text-green-500 font-bold uppercase tracking-wider">Completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="text-white font-bold">${(data.amountTotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link 
                to="/dashboard/invoices" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center gap-2 text-gray-500 hover:text-white py-3 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Download Receipt (PDF)
              </button>
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-8" />
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Payment Failed</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Your transaction was not completed. This could be due to a card decline or session timeout.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/dashboard/invoices" 
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                Try Again
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-widest">SanSolar Secure Billing Engine</span>
      </div>
    </div>
  );
};

export default PaymentCompletePage;
